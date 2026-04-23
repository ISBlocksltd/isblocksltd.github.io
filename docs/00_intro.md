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
- High cost


# Is the product open source

The answer to this partially. The product makes use of several open source libraries primarily Bouncy Castle as the core cryptographic engine. We have chose to release several componenets under an open source licence so that those so inclined might be able to build their own software. 

Our open source modules include: 
- Java PKCS#11 Wrapper - JNI wrapper for PKCS#11 3.2 that has been tested against several devices and supports the latest post quantum algorithms
- Java CSCA Master List Processor - Module for processing certificats from CSCA Master Lists these are extracted from the master list and can be further analysed, placed in a database or used to perform certificate validation
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

The product delivers public key infrastructure by allowing the attachment of meta data to public keys. The product delivers life cycle managmenet of the following certificae formats: 
- SSH Certificates
- X.509 Certificates 
- CVCA Certificates

## Key Manageent Use Cases Supported 

As a platform the intention is that a user can deploy the product in one of the following deployment modes.

Let's discover **Docusaurus in less than 5 minutes**.

## Getting Started

Get started by **creating a new site**.

Or **try Docusaurus immediately** with **[docusaurus.new](https://docusaurus.new)**.

### What you'll need

- [Node.js](https://nodejs.org/en/download/) version 16.14 or above:
  - When installing Node.js, you are recommended to check all checkboxes related to dependencies.

## Generate a new site

Generate a new Docusaurus site using the **classic template**.

The classic template will automatically be added to your project after you run the command:

```bash
npm init docusaurus@latest my-website classic
```

You can type this command into Command Prompt, Powershell, Terminal, or any other integrated terminal of your code editor.

The command also installs all necessary dependencies you need to run Docusaurus.

## Start your site

Run the development server:

```bash
cd my-website
npm run start
```

The `cd` command changes the directory you're working with. In order to work with your newly created Docusaurus site, you'll need to navigate the terminal there.

The `npm run start` command builds your website locally and serves it through a development server, ready for you to view at http://localhost:3000/.

Open `docs/intro.md` (this page) and edit some lines: the site **reloads automatically** and displays your changes.
