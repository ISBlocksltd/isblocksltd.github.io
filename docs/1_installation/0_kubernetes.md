---
sidebar_position: 1
---

# Kubernetes

This sections describes the installation of the IS Blocks KMS system on a Kubernetes cluster. 

This section assumes that you are familiar with the basics of Kuberntes and are able to perform basic troubleshooting actions on the cluster. 

Before you install on a Kubernetes cluster you need to ensure the following: 

- You have an internal of publicly recognised hostname or FQDN assigned to the services
- You have installed Kubernetes on your server or local machine
- Your host machine is able to communicate to your cluster over port 443

## Verify that you cluster is running

Before you start installing the service, verify that the cluster is operational. Some simple commands are listed for this purpose but you are advised to consult the Kubernetes documentation on advice on how t osetup the cluster and troubleshoot. 


### Verify Kubernetes Connectivity  
```bash
kubectl cluster-info
```

### Verify Cluster Health
```bash
kubectl get nodes
```

### Verify Cluster Version
```bash
kubectl version --short
```

### Verify Core Services 
```bash
kubectl get pods -A
```

## Clone the IS Blocks KMS Repository 
```bash
git clone https://github.com/ISBlocksltd/isblocks-kms.git
```

## Set the hostname or FQDN of the IS Blocks KMS Service
```bash
export DOMAIN=<your domain name>
```

## Create the TLS certificates
### Option 1: If using self signed certficates

#### Run the script to generate a self signed certificate pair
```bash
cd isblocks-kms
./ca.sh <DOMAIN> <CA NAME>
```

### Option 2: If using ACME to obtain a domain certifiate
This section assumes that you already have a domain name associated with this server. You can then use the ACME certbot to request a public certificate for this installation using the certbot client. 

Replace the following values in the command below


```bash
sudo certbot certonly --standalone -d example.com \
--agree-tos --non-interactive --email you@example.com \
--deploy-hook "cp /etc/letsencrypt/live/example.com/privkey.pem /opt/isblocks/cert/tls.key && cp /etc/letsencrypt/live/example.com/fullchain.pem /opt/isblocks/cert/tls.crt && chmod 600 /opt/isblocks/cert/tls.key && chmod 644 /opt/isblocks/cert/tls.crt"
```

## Create the TLS secret for the application 
```bash
kubectl create secret tls keycloak-tls   -n keycloak   --cert=/opt/isblocks/cert/tls.crt   --key=/opt/isblocks/cert/tls.key
```

## Create the namespace
```bash
kubectl create namespace keycloak
```

## Create the PVC
```bash
git clone https://github.com/ISBlocksltd/isblocks-kms.git
```

## Apply the kubernetes manifest
```bash
cd isblocks-kms/
kubectl -f kubernetes/. -n keycloak
```
## Check that the service is running
```bash
kubectl get svc -n keycloak
```
## Examine the pod
```bash
kubectl describe pod -l app=keycloak -n keycloak
```

Add **Markdown or React** files to `src/pages` to create a **standalone page**:

- `src/pages/index.js` → `localhost:3000/`
- `src/pages/foo.md` → `localhost:3000/foo`
- `src/pages/foo/bar.js` → `localhost:3000/foo/bar`

## Create your first React Page

Create a file at `src/pages/my-react-page.js`:

```jsx title="src/pages/my-react-page.js"
import React from 'react';
import Layout from '@theme/Layout';

export default function MyReactPage() {
  return (
    <Layout>
      <h1>My React page</h1>
      <p>This is a React page</p>
    </Layout>
  );
}
```

A new page is now available at [http://localhost:3000/my-react-page](http://localhost:3000/my-react-page).

## Create your first Markdown Page

Create a file at `src/pages/my-markdown-page.md`:

```mdx title="src/pages/my-markdown-page.md"
# My Markdown page

This is a Markdown page
```

A new page is now available at [http://localhost:3000/my-markdown-page](http://localhost:3000/my-markdown-page).
