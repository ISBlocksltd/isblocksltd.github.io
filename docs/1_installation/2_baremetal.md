---
sidebar_position: 3
---

# Operating System Installation

This section provides a complete, step-by-step guide for installing and configuring the **IS Blocks KMS** system on an **Ubuntu 24.04 / 26.04 LTS** server (bare metal physical machine or virtual machine).

---

## Prerequisites & System Requirements

Before beginning the installation, ensure the server meets the following minimum specifications:

* **Operating System:** Ubuntu 24.04 LTS or 26.04 LTS (64-bit x86_64 / ARM64)
* **Hardware Requirements:**
  * CPU: 4+ Cores (8+ Cores recommended for production signing workloads)
  * RAM: 8 GB minimum (16 GB recommended)
  * Storage: 50 GB+ SSD storage
* **Network & DNS:** A fully qualified domain name (FQDN, e.g., `kms.example.com`) resolving to the server's IP address with inbound access on ports `80` (HTTP) and `443` (HTTPS).
* **Privileges:** `sudo` / root administrative access.

Update system packages and install essential utilities:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl wget git gnupg lsb-release build-essential jq unzip software-properties-common
```

---

## Install JDK

IS Blocks KMS and Keycloak require Java 21 LTS (or Java 25 LTS).

1. Install OpenJDK 21:
   ```bash
   sudo apt install -y openjdk-21-jdk
   ```

2. Verify the Java installation:
   ```bash
   java -version
   ```

3. Configure the `JAVA_HOME` environment variable:
   ```bash
   echo "JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64" | sudo tee -a /etc/environment
   source /etc/environment
   ```

---

## Install PostgreSQL

PostgreSQL serves as the relational database backend for Keycloak Identity and Access Management.

1. Install PostgreSQL and contrib packages:
   ```bash
   sudo apt install -y postgresql postgresql-contrib
   sudo systemctl enable --now postgresql
   ```

2. Create the Keycloak database, user, and permissions:
   ```bash
   sudo -u postgres psql <<EOF
   CREATE DATABASE keycloak WITH ENCODING 'UTF8';
   CREATE USER keycloak WITH ENCRYPTED PASSWORD 'StrongKeycloakDBPass123!';
   GRANT ALL PRIVILEGES ON DATABASE keycloak TO keycloak;
   ALTER DATABASE keycloak OWNER TO keycloak;
   \q
   EOF
   ```

---

## Install MongoDB / FerretDB

IS Blocks KMS uses a document database to store keys metadata, certificates, constraints, rings, and audit trails. You can install **MongoDB Community Edition** or **FerretDB** (running on PostgreSQL).

### Installing MongoDB Community Edition:

1. Import the MongoDB public GPG key and add the repository:
   ```bash
   curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor
   echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
   ```

2. Install and start MongoDB:
   ```bash
   sudo apt update
   sudo apt install -y mongodb-org
   sudo systemctl enable --now mongod
   ```

3. Verify MongoDB is active and listening on `127.0.0.1:27017`:
   ```bash
   mongosh --eval "db.adminCommand('ping')"
   ```

---

## Install Keycloak

1. Download and extract Keycloak:
   ```bash
   KEYCLOAK_VERSION="24.0.5"
   cd /opt
   sudo wget https://github.com/keycloak/keycloak/releases/download/${KEYCLOAK_VERSION}/keycloak-${KEYCLOAK_VERSION}.tar.gz
   sudo tar -xzf keycloak-${KEYCLOAK_VERSION}.tar.gz
   sudo mv keycloak-${KEYCLOAK_VERSION} /opt/keycloak
   sudo rm keycloak-${KEYCLOAK_VERSION}.tar.gz
   ```

2. Create a dedicated system user:
   ```bash
   sudo useradd -r -d /opt/keycloak -s /bin/false keycloak
   sudo chown -R keycloak:keycloak /opt/keycloak
   ```

3. Configure `/opt/keycloak/conf/keycloak.conf`:
   ```properties
   # Database configuration
   db=postgres
   db-username=keycloak
   db-password=StrongKeycloakDBPass123!
   db-url=jdbc:postgresql://localhost:5432/keycloak

   # HTTP & Proxy Settings (Behind NGINX)
   proxy=edge
   http-enabled=true
   http-port=8080
   http-relative-path=/auth
   hostname=kms.example.com
   ```

4. Build Keycloak configuration:
   ```bash
   sudo -u keycloak /opt/keycloak/bin/kc.sh build
   ```

5. Create a systemd service file `/etc/systemd/system/keycloak.service`:
   ```ini
   [Unit]
   Description=Keycloak Identity & Access Management
   After=network.target postgresql.service
   Wants=postgresql.service

   [Service]
   Type=exec
   User=keycloak
   Group=keycloak
   Environment="KEYCLOAK_ADMIN=admin"
   Environment="KEYCLOAK_ADMIN_PASSWORD=AdminSecurePassword123!"
   ExecStart=/opt/keycloak/bin/kc.sh start --optimized
   Restart=on-failure
   RestartSec=10

   [Install]
   WantedBy=multi-user.target
   ```

6. Enable and start Keycloak:
   ```bash
   sudo systemctl daemon-reload
   sudo systemctl enable --now keycloak
   ```

---

## Create TLS Certificates

Generate valid TLS certificates for HTTPS termination. For production servers with public DNS, use Let's Encrypt Certbot:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot certonly --standalone -d kms.example.com --non-interactive --agree-tos -m admin@example.com
```

*(For staging/offline environments, generate a self-signed certificate using `openssl req -x509 -nodes -days 365 -newkey rsa:4096 -keyout /etc/ssl/private/kms.key -out /etc/ssl/certs/kms.crt`)*

---

## Install NGINX

NGINX acts as the unified reverse proxy, SSL termination endpoint, and static frontend file server.

1. Install NGINX:
   ```bash
   sudo apt install -y nginx
   ```

2. Create the NGINX site configuration `/etc/nginx/sites-available/isblocks-kms`:
   ```nginx
   server {
       listen 80;
       server_name kms.example.com;
       return 301 https://$host$request_uri;
   }

   server {
       listen 443 ssl http2;
       server_name kms.example.com;

       ssl_certificate /etc/letsencrypt/live/kms.example.com/fullchain.pem;
       ssl_certificate_key /etc/letsencrypt/live/kms.example.com/privkey.pem;
       ssl_protocols TLSv1.2 TLSv1.3;
       ssl_ciphers HIGH:!aNULL:!MD5;

       # Dashboard React SPA Frontend
       location / {
           root /var/www/isblocks-dashboard;
           index index.html;
           try_files $uri $uri/ /index.html;
       }

       # KMS Spring Boot Backend API
       location /api/ {
           proxy_pass http://127.0.0.1:9080/api/;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto https;
       }

       # Spring OpenAPI / Swagger
       location /public/ {
           proxy_pass http://127.0.0.1:9080/public/;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto https;
       }

       # Keycloak Authentication Server
       location /auth/ {
           proxy_pass http://127.0.0.1:8080/auth/;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto https;
           proxy_buffer_size 128k;
           proxy_buffers 4 256k;
           proxy_busy_buffers_size 256k;
       }
   }
   ```

3. Enable the site and test configuration:
   ```bash
   sudo ln -sf /etc/nginx/sites-available/isblocks-kms /etc/nginx/sites-enabled/
   sudo rm -f /etc/nginx/sites-enabled/default
   sudo nginx -t
   sudo systemctl restart nginx
   ```

---

## Setup the Dashboard Service

1. Create the web root directory:
   ```bash
   sudo mkdir -p /var/www/isblocks-dashboard
   ```

2. Build and copy the `isblocks-react-dashboard` production distribution (`dist/*`) into `/var/www/isblocks-dashboard/`:
   ```bash
   sudo cp -r /path/to/isblocks-react-dashboard/dist/* /var/www/isblocks-dashboard/
   sudo chown -R www-data:www-data /var/www/isblocks-dashboard
   sudo chmod -R 755 /var/www/isblocks-dashboard
   ```

---

## Setup the Spring Boot Service

1. Create application directories:
   ```bash
   sudo mkdir -p /opt/isblocks-kms
   sudo useradd -r -s /bin/false isblocks
   ```

2. Place `isblocks-spring-kms.jar` into `/opt/isblocks-kms/`.

3. Create the production configuration file `/opt/isblocks-kms/application.properties`:
   ```properties
   server.port=9080

   # Keycloak OIDC Configuration
   keycloak.auth-server-url=https://kms.example.com/auth/
   keycloak.realm=isblockskms
   keycloak.resource=kms
   keycloak.principal-attribute=preferred_username

   spring.security.oauth2.client.provider.keycloak.issuer-uri=https://kms.example.com/auth/realms/isblockskms
   spring.security.oauth2.resourceserver.jwt.jwk-set-uri=https://kms.example.com/auth/realms/isblockskms/protocol/openid-connect/certs

   jwt.auth.converter.resourceId=kms
   jwt.auth.converter.resource-id=kms
   jwt.auth.converter.principal-attribute=preferred_username

   # MongoDB Connection
   spring.mongodb.uri=mongodb://127.0.0.1:27017/kms
   spring.mongodb.database=kms

   # SoftHSM & PKCS#11 Library Paths
   isblocks.pkcs11.library.path.1=/usr/lib/softhsm/libsofthsm2.so
   isblocks.pkcs11.library.name.1=SoftHSMv2

   # Swagger / OpenAPI
   springdoc.api-docs.path=/public/api-docs
   springdoc.swagger-ui.path=/public/swagger-ui.html
   ```

4. Create systemd unit `/etc/systemd/system/isblocks-kms.service`:
   ```ini
   [Unit]
   Description=IS Blocks KMS Spring Boot Backend
   After=network.target mongod.service keycloak.service
   Wants=mongod.service

   [Service]
   Type=simple
   User=isblocks
   Group=isblocks
   WorkingDirectory=/opt/isblocks-kms
   ExecStart=/usr/bin/java -Xms1024m -Xmx4096m -jar /opt/isblocks-kms/isblocks-spring-kms.jar --spring.config.location=file:/opt/isblocks-kms/application.properties
   Restart=always
   RestartSec=10

   [Install]
   WantedBy=multi-user.target
   ```

5. Set permissions:
   ```bash
   sudo chown -R isblocks:isblocks /opt/isblocks-kms
   ```

---

## Create the Keycloak Realm, Client and User

1. Open your browser and navigate to `https://kms.example.com/auth/admin` (log in with the admin credentials set in `keycloak.service`).
2. **Create Realm:**
   * Create a new Realm named **`isblockskms`**.
3. **Create Client:**
   * In realm `isblockskms`, navigate to **Clients** $\rightarrow$ **Create client**.
   * Client ID: `kms`
   * Client type: **OpenID Connect**
   * Client Authentication: **Off** (Public Client)
   * Valid Redirect URIs: `https://kms.example.com/*`
   * Valid Post-Logout Redirect URIs: `https://kms.example.com/*`
   * Web Origins: `+` (or `https://kms.example.com`)
4. **Create Roles & Administrator User:**
   * In **Realm Roles**, add roles `admin`, `kms-admin`, and `kms-user`.
   * In **Users**, create a new user (e.g. `kmsadmin`), set password, and assign the `admin` role under **Role Mapping**.

---

## Start the Services

Enable and start all system services:

```bash
sudo systemctl daemon-reload
sudo systemctl enable postgresql mongod keycloak isblocks-kms nginx
sudo systemctl restart postgresql mongod keycloak isblocks-kms nginx
```

Verify service status:

```bash
sudo systemctl status postgresql --no-pager
sudo systemctl status mongod --no-pager
sudo systemctl status keycloak --no-pager
sudo systemctl status isblocks-kms --no-pager
sudo systemctl status nginx --no-pager
```

---

## Test the System

1. **Verify Backend Health & API Documentation:**
   ```bash
   curl -I https://kms.example.com/public/api-docs
   ```

2. **Verify Keycloak OIDC OpenID Configuration:**
   ```bash
   curl -s https://kms.example.com/auth/realms/isblockskms/.well-known/openid-configuration | jq .issuer
   ```

3. **Verify Dashboard Web Access:**
   * Open `https://kms.example.com/` in your web browser.
   * You will be redirected to Keycloak authentication.
   * Log in with your configured `kmsadmin` credentials.
   * Verify access to the **KMS Rings**, **Keys**, and **Constraints** modules.
