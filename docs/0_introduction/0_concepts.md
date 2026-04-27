---
sidebar_position: 1
---

# Concepts

This sections describes the underlying concepts of the IS Blocks KMS System. Understanding these concepts is essential to operating and administring a system. 

## Keys

A key is a basic unit of the KMS system. A key is a cryptograpic piece of information that is used to encrypt of decrypt data. The following key types are supported by the system. 

| Algorithm            | Key Lengths | 
| :---------------- | :------: | 
| RSA        |   2048,4096   | 
| ECDSA SECP           |   256, 384,512   | 
| ML DSA    |   44, 65, 87,  |
| AES|  256, 512   | 

## Rings

A ring is a logical grouping of keys. A ring is protected by specific authentication information and stores keys in the same logical area. A ring could be soft, PKCS#11, Azure, Aliyu, AWS or Google. A description of the various ring types is provided in the table below: 

## Keys on Rings



## Certfificate

A certificate is a public key cryptograpicaly bound to a set of meta data. The process of binding is often referred to a digitally signing. 

The following certificate formats are supported by the IS Blocks KMS system. 

| Format            | Description | 
| :---------------- | :------: | 
| X.509             | Description |
| SSH             | Description |
| CVCA            | Description |

## Constraint

A constraint is a set of meta data that governs the creation of certificates in a public key crypto system. A constraint provides the specified values for a specific system. For example a TLS certificate in a X.509 crypto system always has key attributes TLS Client or TLS Server. These can be specified as a constraint along with other values specific to a TLS certificate like the subject alternative name. 

When requesting certificate, the requestor thus only needs to provide the Constraint Identifier, and public key. 

The following constraint types are supported by the IS Blocks KMS system: 

| Format            | Description | 
| :---------------- | :------: | 
| X.509             | Description |
| SSH             | Description |
| CVCA            | Description |

## Certification Authority

A certification authority is an entity that issues digital certificates. 

Depending on the issuing entity, format, the location of the private key, the following types of certification authorites are supported by the IS Blocks KMS system: 


| Format            | Description | 
| :---------------- | :------: | 
| X.509             | Description |
| SSH             | Description |
| CVCA            | Description |

Depending on the location of the private key, the following types of CAs can be created:

| Private Key           | Description | 
| :---------------- | :------: | 
| Self            | Self Signed CA |
| Imported            | Imported CA certificate, no private key is present |
| External            | CA with private key signed by an external CA |

## Certification Authority Object Model

Now that the various elements are known, the object model can be presented. This helps understand how the various objects fit together. 

The first object created is usually a key. A key is identified by a label and name and internally by an identifier. 

The API provides methods to use a key for encryption, decryption, signing and verification but for more complex use cases like PKI, time stamping and PDF signing, it needs to be associated with a constraint in order to provide the necessary meta data required for this kind of function. 

A constraint is identified by a identifier and name and usually has a key associated with it. 

The constraint tells the system: 
- Which key is to be used
- The meta data associated with the key usage 

For example, in order to create a self signed certificate, one would: 
- First create the key
- Create a constraint with meta data saying that it is a self signed certificate, the key to be used as well as the other meta data used to create a certificate like the Subject DN, key attributes and so on

Once the constraint is created, a CA object can then be created. A CA object is identified by an identifier and associated with a constraint. Using the meta data specfied in the constraint, the system can create a CA object. 

For example if the system specifies that the certificate will be self signed of format X.509 the key with identifier shall be used to create a CSR based on the meta data in the constrait, sign this CSR with it's own key and build the certificate. 