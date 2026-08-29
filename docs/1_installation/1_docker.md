---
sidebar_position: 2
---

# Docker

This section describes the installation and deployment of the **IS Blocks KMS** system using **Docker** and **Docker Compose**.

This installation method is suitable for standalone Linux servers, development/staging environments, and containerized on-premise deployments.

---

## Prerequisites & Requirements

Before deploying via Docker Compose, ensure the following requirements are met:

* **Operating System:** Linux (Ubuntu 22.04/24.04/26.04 LTS, Debian, RHEL 9+), macOS, or Windows with Docker Desktop.
* **Docker Engine:** Version 24.0 or later installed.
* **Docker Compose:** Compose V2 (`docker compose` CLI plugin) installed.
* **Networking & Ports:** Host machine accessible over ports **80** (HTTP) and **443** (HTTPS).
* **Hostname / FQDN:** A valid domain name or internal DNS entry (e.g., `kms.example.com` or `kms1.isblocks`) resolving to the host.

---

## 1. Verify Docker Installation

Ensure the Docker daemon is active and Compose is available:

### Verify Docker Daemon
```bash
docker --version
docker info
```

### Verify Docker Compose Plugin
```bash
docker compose version
```

---

## 2. Clone the IS Blocks KMS Repository

Clone the repository and enter the `docker` directory:

```bash
git clone https://github.com/ISBlocksltd/isblocks-kms.git
cd isblocks-kms/docker
```

---

## 3. Set the Domain Name

Define your server's domain name or IP address:

```bash
export DOMAIN=kms.example.com
```

---

## 4. Create TLS Certificates

IS Blocks KMS requires TLS certificates for HTTPS termination in the NGINX reverse proxy. Place your certificate files in the `./certs` directory as `tls.crt` and `tls.key`.

```bash
mkdir -p certs
```

### Option 1: Generate Self-Signed Certificates (Development / Internal)
Run the certificate generation script:
```bash
./ca.sh $DOMAIN "IS Blocks Root CA"
cp certs/$DOMAIN.crt certs/tls.crt
cp certs/$DOMAIN.key certs/tls.key
```

### Option 2: Obtain a Public Certificate via ACME / Let's Encrypt
If you have a public domain name, obtain a certificate using Certbot:

```bash
sudo certbot certonly --standalone -d $DOMAIN \
  --agree-tos --non-interactive --email admin@example.com

# Copy the certificates to the docker certs directory
sudo cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem ./certs/tls.crt
sudo cp /etc/letsencrypt/live/$DOMAIN/privkey.pem ./certs/tls.key
sudo chmod 644 ./certs/tls.crt
sudo chmod 600 ./certs/tls.key
```

---

## 5. Review Docker Compose Configuration

The `docker-compose.yml` deploys a cohesive stack of six microservices:

```yaml title="docker-compose.yml"
services:
  keycloak-postgresql:
    image: ghcr.io/ferretdb/postgres-documentdb:postgres-documentdb:17-0.107.0-ferretdb-2.7.0
    command: ["-c", "shared_preload_libraries=pg_cron,pg_documentdb_core,pg_documentdb", "-c", "cron.database_name=postgres"]
    environment:
      POSTGRES_USER: keycloak
      POSTGRES_PASSWORD: password
      POSTGRES_DB: postgres
    volumes:
      - pg_data:/var/lib/postgresql/data

  ferretdb:
    image: ghcr.io/ferretdb/ferretdb:2.7.0
    environment:
      FERRETDB_POSTGRESQL_URL: "postgresql://keycloak:password@keycloak-postgresql:5432/postgres?sslmode=disable"
      FERRETDB_LISTEN_ADDR: ":27017"
    depends_on:
      - keycloak-postgresql

  keycloak:
    image: quay.io/keycloak/keycloak:26.0
    command: ["start", "--optimized"]
    environment:
      KC_DB: postgres
      KC_DB_URL: "jdbc:postgresql://keycloak-postgresql:5432/postgres"
      KC_DB_USERNAME: keycloak
      KC_DB_PASSWORD: password
      KC_HOSTNAME: kms.example.com
      KC_PROXY_HEADERS: xforwarded
      KC_BOOTSTRAP_ADMIN_USERNAME: admin
      KC_BOOTSTRAP_ADMIN_PASSWORD: AdminSecurePassword123!
      KC_HOSTNAME_PATH: "/auth"
      KC_HTTP_RELATIVE_PATH: "/auth"
      KC_HOSTNAME_STRICT: "true"
    depends_on:
      - keycloak-postgresql

  spring-boot-app:
    image: ghcr.io/isblocksltd/isblocks-spring-kms:latest
    environment:
      - SPRING_CONFIG_LOCATION=file:/app/config/application.properties
    volumes:
      - ./config/application.properties:/app/config/application.properties
    depends_on:
      - ferretdb

  dashboard:
    image: ghcr.io/isblocksltd/isblocks-react-dashboard:latest
    environment:
      - VITE_KEYCLOAK_URL=https://kms.example.com/auth
      - VITE_KEYCLOAK_REALM=isblockskms
      - VITE_KEYCLOAK_CLIENT_ID=react-dash
      - VITE_BASEURL=https://kms.example.com
      - VITE_API_END_POINT=https://kms.example.com/kms/api/v1
      - VITE_API_EP=https://kms.example.com/kms/api/v1

  proxy:
    image: nginx:stable-alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./certs:/etc/nginx/certs:ro
    depends_on:
      - keycloak
      - spring-boot-app
      - dashboard

volumes:
  pg_data:
```

---

## 6. Configure NGINX Reverse Proxy

Ensure `./nginx.conf` matches your domain name (`server_name`):

```nginx title="nginx.conf"
events {}

http {
    server {
        listen 80;
        server_name kms.example.com;
        return 301 https://$host$request_uri;
    }

    server {
        listen 443 ssl;
        server_name kms.example.com;

        ssl_certificate /etc/nginx/certs/tls.crt;
        ssl_certificate_key /etc/nginx/certs/tls.key;

        location /auth {
            proxy_pass http://keycloak:8080;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        location /kms {
            proxy_pass http://spring-boot-app:9080;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        location / {
            proxy_pass http://dashboard:80;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
```

---

## 7. Start the Docker Stack

Start all containers in detached mode:

```bash
docker compose up -d
```

---

## 8. Check that Services are Running

Verify that all six containers are in an `Up` (healthy) state:

```bash
docker compose ps
```

### Stream Container Logs
```bash
# Stream all service logs
docker compose logs -f

# Stream specific service logs (e.g. spring-boot-app or keycloak)
docker compose logs -f spring-boot-app
docker compose logs -f keycloak
```

---

## 9. Initial Keycloak Configuration

1. Open your browser and navigate to `https://<DOMAIN>/auth/admin`.
2. Log in using the admin credentials defined in `KC_BOOTSTRAP_ADMIN_USERNAME` and `KC_BOOTSTRAP_ADMIN_PASSWORD`.
3. Create the **Realm**:
   * Name: `isblockskms`.
4. Create the **Client**:
   * Client ID: `react-dash` (or `kms`).
   * Client Authentication: **Off** (Public Client).
   * Valid Redirect URIs: `https://<DOMAIN>/*`.
   * Web Origins: `+` (or `https://<DOMAIN>`).
5. Create Realm Roles (`admin`, `kms-admin`, `kms-user`) and create your administrator user.

---

## 10. Test and Verify the System

1. **Verify Web Dashboard Access:**
   * Open `https://<DOMAIN>/` in your browser.
   * You will be redirected to the Keycloak login screen.
   * Enter your credentials to access the **KMS Dashboard**.

2. **Verify Backend Health & API:**
   ```bash
   curl -k -I https://$DOMAIN/kms/public/api-docs
   ```

---

## 11. Managing the Stack

* **Stop the Stack:**
  ```bash
  docker compose down
  ```
* **Restart a Service:**
  ```bash
  docker compose restart spring-boot-app
  ```
* **Upgrade / Pull Latest Images:**
  ```bash
  docker compose pull
  docker compose up -d
  ```
