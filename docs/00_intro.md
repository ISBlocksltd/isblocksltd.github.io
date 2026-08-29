---
sidebar_position: 1
---

# Introduction

The IS Blocks Key Management System (KMS) is a freeware application for managing and performing lifecycle operations on cryptographic material in addition to providing several out of the box end user use cases for cryptographic operations.

## Yet another key manager? 

Well the answer to this is yes and no! 

The market has several key managers available that provide various degrees of security, flexibility. Our team has extensive experience in the area and has been able to realise the short commnings of existing products in order to provide an offering that is well placed to serve the market. 

Some of the shortcomings that we have observed are: 
- Long development life cycles 
- Closed source products 
- Products are unable to keep up with security standards
- Built on old  technology
- High cost for development
- Steep learning curve  


# Is the product open source

The answer to this partially. The product makes use of several open source libraries primarily Bouncy Castle as the core cryptographic engine. We have chose to release several componenets under an open source licence so that those so inclined might be able to build their own software. 

Our open source modules include: 
- Java PKCS#11 Wrapper - JNI wrapper for PKCS#11 3.2 that has been tested against several devices and supports the latest post quantum algorithms
- Java CSCA Master List Processor - Module for processing certificats from CSCA Master Lists these are extracted from the master list and can be further analysed, placed in a database or used to perform certificate validation
- Java CVCA Library - Library for creating CVCA certificates
- Java COSE Library - Library for signing and encrypting CBOR objects using the COSE standard 
- Java MRTD Reader API - Library for performing basic access control (BAC), PACE and accessing data on a passport chip via a mobile phone NFC device. This can be use to build your own application that reads electronic passports and identity cards


## Features 

The IS Blocks KMS System primarily supports the lifecycle of cryptographic keys. This normally includes creation, commision, activation, deactivation and decomissioning. In addition to the lifecycle management of keys, the system also supports several real time use cases for key usage including symmetric encryption, public key infrastructure, time stamping and codde signing. 

### Deployment Models
The product can be installed on the following platforms: 
- Docker
- Kubernetes
- Bare metal hardware
- Virtual machine environments (vSphere)

### HSM Support
As universally recognised, the most secure manner of handling keys is the use of harware as root of trust. 

The product has been tested against the following HSMs
- Utimaco uTrust
- Thales Luna HSM 
- Thales Protect Server HSM

### Cloud Key Support

The product is able to manage keys in the following cloud key stores
- Azure Key Vault
- Amazon Key Management System
- Google Key Management System

### Certificate Support

The product delivers public key infrastructure by allowing the attachment of meta data to public keys. The product delivers life cycle managmenet of the following certificate formats: 
- SSH Certificates
- X.509 Certificates 
- CVCA Certificates

## Key Management Use Cases Supported 

|Use Case  | Description           |
|---------|-----------------------|
| Key Life Cycle Management    | Generation, Archival of keys  |
| X.509 Certificate Management | Actions for managing X.509 Certificates |
| OCSP Signing | Creation of OCSP Responses |
| SSH Certificate Management | Actions for managing SSH Certificates |
| X.509 Certificate Management | Actions for managing X.509 Certificates |

