---
sidebar_position: 2
---

# Form Configuration Guide: SSHCA Constraint

This guide provides the necessary structure and field descriptions to fill out the **Edit Constraint: SSHCA** form. Use this as documentation or a template for configuring SSH Certificate Authority constraints.

---

## Header Configuration

| Field | Description | Input Type |
| :--- | :--- | :--- |
| **Constraint Name** | A unique identifier for this configuration. | Text Input (e.g., `SSHCA`) |
| **Type** | The protocol type for the constraint. | Dropdown (Select `SSH`) |

---

## 1. General Information

### CA and Security Settings
- **constraint-ca-id-label**: Select the Certificate Authority identifier label. 
  - *Example:* `Self-Signed`
- **Algorithm**: Select the cryptographic signing algorithm.
  - *Example:* `SHA256WithRSA`

### Validity Period
Define the lifespan of the certificate. Note that units and separators are fixed; edit numeric values only.
- **Format**: `[y] y ; [mo] mo ; [d] d ; [h] h ; [mi] mi ; [s] s ; [ms] ms`
- **Default shown**: `0y 0mo 0d 0h 0mi 30s 0ms` (30 seconds)

### Private Key Usage
- **Private Key Usage Period**: Toggle this switch **ON** if you need to restrict the timeframe in which the private key can be used for signing.

---

## SSH Options

### Principals
Input the entities allowed to use this certificate.
- **Users**: Enter allowed usernames.
- **Hosts**: Enter domain names or IP addresses.
- *Input Format*: Comma-separated list or single entry.

---

## Critical Options
> **Note:** The server must refuse login if these options are not recognized by the SSH implementation.

### Force Command
- **Description**: Restricts the user to a specific command.
- **Action**: Enter the specific command string that must be executed regardless of what the user requests.

### Source Address
- **Description**: Restricts where the certificate can be used from.
- **Input**: Enter specific **IP addresses** or **CIDR blocks** (e.g., `192.168.1.0/24`).

---

## Actions
- **Save**: Click the **SAVE** button to commit changes.
- **Cancel**: Click the **X** in the top right to exit without saving.