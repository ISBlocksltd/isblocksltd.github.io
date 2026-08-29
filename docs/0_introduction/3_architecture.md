---
sidebar_position: 2
---

# Architecture 

This section describes the architecture of the IS Blocks KMS System. 

## Internal Architecture

The figure below illustrates the internal architecture and layered components of the IS Blocks KMS system:

<div style={{ textAlign: 'center' }}>
  <img src="/img/internal_architecture.png" alt="IS Blocks KMS Internal Architecture" style={{ width: '60%', maxWidth: '650px' }} />
</div>

### Architectural Components

The IS Blocks KMS deployment consists of five primary layers:

#### 1. Ingress & Gateway Layer
* **NGINX GW (Reverse Proxy / Gateway):** Acts as the unified entry point for all incoming client traffic, REST API requests, and web management consoles. It handles TLS termination, request routing, reverse proxying, and load balancing across internal services.

#### 2. Service & Application Layer
* **Keycloak (Identity & Access Management):** Provides centralized authentication, authorization, Role-Based Access Control (RBAC), Single Sign-On (SSO), and token management for both human administrators and API clients/applications.
* **IS Blocks KMS (Key Management and Use Cases):** The core application engine responsible for cryptographic key lifecycle management (generation, rotation, destruction), certificate authorities (CAs), constraint enforcement, rings, and cryptographic use cases (signing, encryption, SSH CA, code signing, and time-stamping).

#### 3. Data Persistence Layer
* **PostgreSQL (Relational Database):** Serves as the persistence store for Keycloak, managing realms, users, credentials, roles, and session states.
* **MongoDB (Document Database):** Stores IS Blocks KMS application data, including key metadata, certificate records, ring profiles, constraint definitions, and system audit logs.

#### 4. Operating System Layer
* **Ubuntu OS (Linux Operating System):** The enterprise Linux operating system layer that hosts the services, runtime dependencies, container engines, and network interfaces.

#### 5. Infrastructure & Key Protection Layer
* **Hardware (Physical Servers & Infrastructure):** The physical server compute, memory, storage, and networking hardware powering the environment.
* **HSM (Hardware Security Module — Optional / Recommended):** A dedicated, tamper-resistant cryptographic hardware device connected via PKCS#11 interfaces. While optional, utilizing an HSM is recommended for high-assurance environments to securely protect root/master keys and perform hardware-isolated cryptographic operations.