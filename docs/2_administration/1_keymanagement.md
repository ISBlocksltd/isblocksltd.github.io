---
sidebar_position: 2
---

# Key Management

This section describes the key life cycle management using the IS Blocks KMS system

## Creating a key

This version of the KMS supports the following key algorithms and key lengths:
| Algorithm            | Key Lengths | 
| :---------------- | :------: | 
| RSA        |   2048,4096   | 
| ECDSA SECP           |   256, 384,512   | 
| ML DSA    |   44, 65, 87,  |
| AES|  256, 512   | 

1. Login to the KMS
2. Click on the KMS Tile
3. In the left hand menu click on the Keys menu option
4. In the drop down on the top, select the ring for which you would like to add a key
5. Click on the Add button
6. Enter the following fields
    - Name: This is a meaningful name used internally by the KMS
    - Label: This is the label of the key. This maps to CKA_LABEL in PKCS#11 systems 
    - Subject DN: This is the Subject DN assigned. When creating assymetric keys, a CSR is automatically created. The signing algorithms is automatically selected based on the key algorithm
    - Algorithm: The algorithm of the key to be used

| **Note** |
|---|
|  If you are already on the rings list, you can navigate to the keys using the three dot menu on the left and selecting the Keys option |

## Editing a Key

The edit key option allows you to do the following: 
- Copy the ring identifier and key identifier for use in the API
- Change the subject DN and create a new CSR
- Add a new certificate that matches the CSR. This could be for PDF signing, Time Stamping or any other PKI use case

To Edit a key: 

1. Login to the KMS
2. Click on the KMS Tile
3. Select Keys
4. Select the ring for which you would like to update the key in the drop down
5. Click on the three dot menu and select Edit 
6. Click on the Save button

## Archiving a Key

1. Login to the KMS
2. Click on the KMS Tile
3. Select Keys
4. Select the ring for which you would like to update the key in the drop down
5. Click on the three dot menu and select Edit 
6. Click on the Archive button
