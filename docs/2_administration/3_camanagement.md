---
sidebar_position: 4
---

# Certification Authorities

This section describes the creation of certification authorities as trusted entities for issuing certificates. 

The system supports the creation of the following kinds of certification authorities: 
- X.509 Certification Authorities
- Country Verifiable Certification Authorities
- SSH Certification Authorities

In addition the system also supports specialised setup of certification authorities for example: 
- Country Signer Certification Authorities
- Mobile Driving Licence Root Certification Authorities
- National Root Certification Authorities
- Enterprise Root Certification Authorities

## Create a self signed certification authoritiy

## Import an externally signed certification authority

## Create a subordinate certification authority

The IS Blocks PKI system supports three primary types of Certification Authorities depending on how the CA is signed and where its private key resides:

| CA Type | Description | State upon Creation |
| :--- | :--- | :--- |
| **Self-Signed Root CA** | Both private key and self-signed certificate are generated internally. | `active` |
| **Subordinate CA (Internal Parent)** | The private key is generated internally and signed by an existing internal Root/Parent CA. | `active` |
| **Subordinate CA (External Parent)** | The private key and CSR are generated internally, but the certificate must be signed by an external third-party/parent CA. | `await` (waiting for signed certificate) |
| **Imported CA** | External CA certificate imported into the system without a local private key. | `imported` |

---

## Creating a Subordinate CA with an External CA

When creating a Subordinate CA (Sub CA) whose certificate will be issued by an external Root or Parent CA, the workflow operates in two phases:
1. **Request Phase (`status: await`)**: Generate the key pair, configure the Sub CA constraint with `caId: "external"`, and create the CA object. The CA object is initialized with status `await` and contains the generated Certificate Signing Request (CSR).
2. **Activation Phase (`status: active`)**: Download the CSR, submit it to the external CA for signing, and import the resulting signed certificate back into the CA object.

### Step 1: Create the Signing Key

First, generate the asymmetric key pair and its corresponding CSR in KMS.

1. Log in to the IS Blocks Dashboard.
2. Click on the **KMS** tile (`/kms/rings`).
3. In the left navigation menu, click on **Keys** (`/kms/keys`).
4. In the **Key Ring** dropdown at the top, select the target Key Ring (Soft or PKCS#11/HSM) where the Sub CA key should reside.
5. Click on the **Add** button.
6. Fill in the key details:
   - **Name**: Enter an internal reference name (e.g. `subca-signing-key`).
   - **Label**: Enter the PKCS#11 key label (maps to `CKA_LABEL`).
   - **Subject DN**: Enter the Subject Distinguished Name for the Sub CA (e.g. `CN=ISBlocks Intermediate CA, O=ISBlocks, C=US`).
   - **Algorithm**: Select the cryptographic algorithm (e.g. `ECDSA SECP 256`, `ECDSA SECP 384`, or `RSA 2048` / `RSA 4096`).
7. Click **Save**. The KMS generates the key pair and automatically produces an initial CSR.

---

### Step 2: Create the Sub CA Constraint

Next, create an X.509 constraint that defines the rules, extensions, and issuing authority for the Sub CA.

1. Navigate to the **PKI** tile from the main dashboard (or click **PKI** / **Constraints** in the sidebar).
2. In the left navigation menu under PKI, select **Constraints** (`/constraints`).
3. Click on the **Add Constraint** button.
4. Fill in the constraint attributes:
   - **Name**: Enter a descriptive constraint name (e.g. `Constraint_SubCA_External`).
   - **Type**: Select `Constraint_X509`.
   - **Issuing CA (`caId`)**: Select **`External`** (or enter `"external"`). This instructs the system that the Sub CA will be signed by an external entity rather than an internal CA.
   - **Is CA (`basicConstraints_isCA`)**: Enable / set to `true`.
   - **Path Length (`basicConstraints_pathLen`)**: Set to `0` (or the desired subordinate depth limit).
   - **Key Usage (`basicKeyUsage`)**: Check `Key Cert Sign` (`keyCertSign`) and `CRL Sign` (`crlSign`).
   - **Algorithm**: Select the signature algorithm matching the key (e.g. `SHA256WithECDSA` or `SHA256WithRSA`).
   - **Subject DN**: Enter the Subject DN (e.g. `CN=ISBlocks Intermediate CA, O=ISBlocks, C=US`).
   - **Issuer DN**: Enter the Subject DN of the external Root/Parent CA that will sign this certificate.
   - **Validity**: Specify the validity period (e.g. `2y;0mo;0d;0h;0min;0ms;0sec`).
5. Click **Save** to persist the constraint.

---

### Step 3: Create the Certificate Authority (CA) Object

Now bind the key and constraint together to create the CA object.

1. In the left navigation menu under PKI, click on **Certification Authority** (`/constraints/certification-authority`).
2. Click on the **Add** / **Create CA** button.
3. In **1. Basic Information**:
   - **CA Name**: Enter a name for the CA (e.g. `SubCA_External`).
   - **Type**: Select `X509` (`CA_X509`).
   - **Constraint**: Select the constraint created in Step 2 (`Constraint_SubCA_External`).
   - **Key Ring**: Select the Key Ring where the signing key is stored.
   - **Signing Key**: Select the key created in Step 1 (`subca-signing-key`).
4. Click **Create CA** (or **Save**).
5. The CA is created with **`status: await`** and the CSR from the key is attached to the CA.

---

### Step 4: Download the CSR

1. In the **Certification Authority** table (`/constraints/certification-authority`), locate your new Sub CA.
2. Click on the CA to open the **Edit CA** screen.
3. In the third column (**3. Network & Revocation**), locate the **CSR Management** section.
4. Click the **Download Request (CSR)** button.
5. A `.csr` file containing the PEM-encoded PKCS#10 Certificate Signing Request (e.g. `SubCA_External.csr`) will be downloaded to your computer.

---

### Step 5: Sign the CSR Externally and Import the Certificate

1. Submit the downloaded `.csr` file to your external Root CA or enterprise PKI team to be signed.
2. Once the external CA issues the signed X.509 certificate (and full certificate chain), copy the PEM-encoded text or save it as a `.pem` / `.crt` file.
3. Return to the IS Blocks Dashboard and navigate to **PKI -> Certification Authority**.
4. Open the Sub CA in **Edit** mode.
5. In the second column (**2. CA Certificate**):
   - **Paste Text**: Paste the PEM certificate block (starting with `-----BEGIN CERTIFICATE-----` and ending with `-----END CERTIFICATE-----`), **OR**
   - **Upload File**: Select the **Upload File** tab and upload your `.pem`, `.crt`, or `.cer` file.
6. (Optional) Configure **CRL Validity** (in days) and **OCSP Configuration** (Key Ring and OCSP Key) if needed.
7. Click **Save** (and confirm in the dialog).

The CA certificate is now bound to the Sub CA, its status transitions to **`active`**, and it is ready to issue end-entity certificates or subordinate certificates.
