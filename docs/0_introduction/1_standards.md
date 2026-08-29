---
sidebar_position: 2
---

# Standards

This section provides a summary of the standards support provided by the IS Blocks KMS system

# Interoperability and Certifications

The following provides an overview of the IS Blocks KMS system's interoperability, capabilities and support, with relevant standards and external references. 

## Specifications

### Certificate Formats and Standards
IS Blocks KMS supports the following formats and standards for digital certificates.

| Supported Standard | External Reference | Documentation |
| :--- | :--- | :--- |
| **X509 and PKIX** | RFC 5280 | Certificate Authority Overview |
| **Card Verifiable Certificates (CVC)** <br/>Used by EU EAC ePassports and eIDs. | BSI TR-03110 | CVC CA |
| **Qualified Certificate Statement** <br/>For issuing EU/ETSI qualified certificates. | RFC 3739 | Certificate Profile Fields |
| **Certificate Transparency** | RFC 6962 | Certificate Transparency |
| **DNS Certificate Authority Authorization (CAA)** | RFC 6844 | Certificate Field Validators |
| **eIDAS** | Regulation (EU) No 910/2014 <br/> EN 319 411, EN 319 412 | Certificate Profile Fields |
| **PSD2** | ETSI TS 119 495 | ENTERPRISE Certificate Profile Fields |
| **FIPS 201-2 (PIV)** <br/>Compliant certificates including FASC-N subjectAltName. | FIPS 201-2 | ENTERPRISE End Entity Profiles Fields |
| **Matter "Vendor" PAA, PAI and DAC** <br/>Certificate formats. | Matter Specification Version 1.4 | Create CAs for Matter IoT |
| **Matter "Operator" RCA, ICA and NOC** <br/>Certificate formats. | Matter Specification Version 1.4 | ENTERPRISE Create CAs for Matter IoT |
| **PEM** <br/>Textual Encodings of PKIX, PKCS, and CMS Structures. | RFC 7468 | — |
| **PKCS#10** <br/>Certification Request Syntax. | RFC 2986 | — |
| **PKCS#7** <br/>Cryptographic Message Syntax. | RFC 5652 | — |
| **PKCS#12** <br/>Personal Information Exchange Syntax. | RFC 7292 | — |

---

### CRL, OCSP and Certificate Distribution
EJBCA supports the following CRL formats, revocation checking mechanisms, and distribution standards.

| Supported Standard | External Reference | Documentation |
| :--- | :--- | :--- |
| **CRL creation** and URL-based CRL Distribution Points. | RFC 5280 | CRL Generation |
| **Online Certificate Status Protocol (OCSP)** <br/>Including AIA-extension and must-staple extension. | RFC 2560, RFC 6960, RFC 5019, RFC 9654 | OCSP |
| **Certificate Store** <br/>Distribution of CA certificates and CRLs over HTTP. | RFC 4387 | Certificate and CRL Access over HTTP |
| **The German Common PKI SigG CertHash** <br/>OCSP extension. | Common PKI | OCSP |
| **LDAP Certificate Publishing** | RFC 4523 | LDAP Publisher/LDAP Search Publisher |
| **SCP Publishing** | — | SCP Publisher |

---

### Algorithms and Key Types
IS Blocks KMS supports the following algorithm types, key sizes, and elliptic curves. 

:::note
When using an external system for key management, the the supported algorithms depend on the support provided by the KMS system. Check the documentation of your KMS provider for the specific algorithm support. 
:::

| Algorithm | Key Size / Curve | External Reference | Documentation |
| :--- | :--- | :--- | :--- |
| **RSA** | Keys up to and including 8192 bits. | — | Supported Algorithms |
| **ECDSA** | Curves including named curves from NIST, SEC, Teletrust, and X9.62.<br/>*Recommendation: Use P-256/P-384/P-521 for long term stability.* | View curves... | Supported Algorithms |
| **EdDSA** | Ed25519, Ed448 | RFC 8032, RFC 8410 | Supported Algorithms |
| **ML-DSA** *(Post-Quantum)* | ML-DSA-44, ML-DSA-65, ML-DSA-87 | FIPS 204, RFC 9881, RFC 9882 | Supported Algorithms |
| **ML-KEM** *(Post-Quantum)* | ML-KEM-512, ML-KEM-768, ML-KEM-1024 <br/>*(Supported for Enterprise certificate creation only)* | FIPS 203 | Supported Algorithms |
| **SLH-DSA** *(Post-Quantum)* | SHA2 & SHAKE variants (-128F, -128S, -192F, -192S, -256F, -256S) | FIPS 205 | Supported Algorithms |
| **Composite algorithms** | Combinations of ML-DSA with RSA, ECDSA, and Ed25519/Ed448 | Composite ML-DSA for X.509 PKI | Supported Algorithms |

---

### Certificate Enrollment Protocols
For specific features supported in each protocol, see the detailed documentation fields.

| Protocol / Interface | External Reference | Documentation |
| :--- | :--- | :--- |
| **REST API** | — | REST Interface |

{/* 
| **EJBCA Management REST API** | — | ENTERPRISE EJBCA REST Interface |
| **Simple Certificate Enrollment Protocol (SCEP)** | SCEP draft 23, RFC 8894 | SCEP |
| **X509 PKI Certificate Management Protocol (CMP)** | RFC 4210, RFC 6712, RFC 9480 *(limitations apply)* | CMP |
| **3GPP PKI (LTE/4G compatible)** <br/>Using CMPv2 with multiple Vendor CAs and vendor cert auth. | ETSI-3GPP | ENTERPRISE CMP |
| **X.509 PKI Certificate Request Message Format (CRMF)** | RFC 4211, RFC 9045 | — |
| **Enrollment over Secure Transport (EST)** | RFC 7030 | ENTERPRISE EST |
| **Automatic Certificate Management Environment (ACME)** | RFC 8555 | ENTERPRISE ACME |
| **ACME IP Identifier Validation Extension** | RFC 8738 | ENTERPRISE ACME |
| **CAA Record Extensions for Account URI & ACME Binding** | RFC 8657 | ENTERPRISE ACME |
| **ACME Device Attestation** <br/>Version 08 of first draft, with Apple Managed Device Attestation support. | draft-acme-device-attest-08 | ENTERPRISE ACME Device Attestation |
| **ACME Renewal Information (ARI)** | RFC 9773 | ENTERPRISE ACME |
| **ACME TLS ALPN Challenge Extension** | RFC 8737 | ENTERPRISE ACME |
| **ACME DNS Labeled With ACME Account ID Challenge** | draft-ietf-acme-dns-account-label-03 | ENTERPRISE ACME |
| **Microsoft Auto-enrollment Integration** | — | ENTERPRISE Auto-enrollment |
| **Legacy Native auto-enrollment** <br/>In Windows environment with add-on proxy module. | — | ENTERPRISE Auto-enrollment (legacy) |

---





## Certifications

EJBCA undergoes rigorous external evaluations to meet global security standards.

| Type / Compliance Standard | Version | External Reference | Documentation |
| :--- | :--- | :--- | :--- |
| **Common Criteria**: Issuing and Management Components (CIMC) Version 1.0, EAL4+ | EJBCA 5.0.4 | Certification | ENTERPRISE Common Criteria |
| **Common Criteria**: Protection Profile for Certification Authorities Version 2.1 | EJBCA 7.4.1.1 | Certification | ENTERPRISE Common Criteria |
| **Common Criteria**: Protection Profile for Certification Authorities Version 2.1 | EJBCA 9.3.3 | Certification | ENTERPRISE Common Criteria |
*/}

## Signing Formats
For specific features supported in each formats, see the detailed documentation fields.

| Format | External Reference | Documentation |
| :--- | :--- | :--- |
| **Time Stamping** | — | RFC 3161 |
| **JWT Signing** | — | RFC 7515, RFC 7519 |
| **Cryptographic Message Syntax (CMS)** | — | RFC 5652 |
| **COSE** | — | RFC 9053 |
| **PDF Signatures** | — | ISO 32000-1 |