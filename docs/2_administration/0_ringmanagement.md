---
sidebar_position: 2
---

# Ring Management

This sections describes the installation of the IS Blocks KMS system on a Kubernetes cluster. 

This section assumes that you are familiar with the basics of Kuberntes and are able to perform basic troubleshooting actions on the cluster. 

Before you install on a Kubernetes cluster you need to ensure the following: 

- You have an internal of publicly recognised hostname or FQDN assigned to the services
- You have installed Kubernetes on your server or local machine
- Your host machine is able to communicate to your cluster over port 443

## Ring Management



## Creating a Soft Key Ring

1. Login to the KMS
2. Click on the KMS Tile
3. Click on the ADD button
4. Enter the following fields
    - Ring Name: 
    - Type: Select Soft
    - Password: 
    - Repeat Password: 
5. Click the Save button

If the passwords do not match, an error message is displayed saying this



## Creating a PKCS#11 Ring

1. Login to the KMS
2. Click on the KMS Tile
3. Click on the ADD button
4. Enter the following fields
    - Ring Name: Enter a meaningful name
    - Type: Select PKCS#11
    - Slot Number: This is the number of the slot. Use your vendor tools to find out the slot number
    - Library: This is the path of the library on the host OS system 
    - Password: This is the slot or partition password
    - Repeat Password: This is the slot or partition password
5. Click the Save button

If the passwords do not match, an error message is displayed saying this. 

## Editing a Ring

The following attributes can be updated on a ring: 
- Ring Name
- Password (with repitition)
- Library (for PKCS#11 Rings)
- Slot Number (for PKCS#11 Rings)

Note: if you change the slot number or library in your ring, this will render your keys unusable

Passwords are not returned. You can specify a new password and this will update the password for the selected ring. If you have forgotten the password it is not possible to retrieve it. 

## Deleting a Ring
