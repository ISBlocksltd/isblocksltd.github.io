---
sidebar_position: 4
---

# ISO & Appliance Installation

This section provides comprehensive instructions for installing the **IS Blocks KMS** turnkey appliance using the custom **ISO image** across physical bare-metal hardware and enterprise hypervisors / virtualization platforms:

* **Physical Servers** (Dell iDRAC, HPE iLO, Lenovo XClarity, Supermicro IPMI, USB boot)
* **VMware vSphere / ESXi**
* **Nutanix AHV (Prism)**
* **Red Hat OpenShift (OpenShift Virtualization / KubeVirt)**

The ISO image contains an optimized, hardened Linux runtime pre-packaged with OpenJDK, Keycloak, MongoDB, NGINX, and the IS Blocks KMS service. It is designed for rapid deployment in high-security enclaves and **air-gapped / offline Root CAs**.

---

## 1. Download & Verify the ISO Image

1. Obtain the official installation image `isblocks-kms-appliance-<version>-x86_64.iso` from the IS Blocks release portal.
2. Verify the SHA-256 checksum against the published hash:
   ```bash
   sha256sum isblocks-kms-appliance-*-x86_64.iso
   ```
3. *(Optional)* Verify the GPG signature using the IS Blocks release signing key:
   ```bash
   gpg --verify isblocks-kms-appliance-*.iso.sig isblocks-kms-appliance-*.iso
   ```

---

## 2. Installing on a Physical Server (Bare Metal)

Physical deployments are recommended for high-throughput signing operations and Root CAs utilizing internal PCIe Hardware Security Modules (e.g., Utimaco, Thales Luna, Thales ProtectServer).

### Method A: Virtual Media via Server Management (iDRAC / iLO / IPMI)
1. Open your browser and log into the server's Baseboard Management Controller (Dell iDRAC, HPE iLO, or Supermicro IPMI).
2. Launch the **Virtual Console / HTML5 Remote Console**.
3. Under **Virtual Media**, select **Map CD/DVD** or **Virtual Media Manager**.
4. Browse and attach the `isblocks-kms-appliance-x86_64.iso` file.
5. Set the next boot device to **Virtual CD/DVD / ISO** and power on (or reboot) the server.

### Method B: Bootable USB Drive
1. Flash the ISO to a USB flash drive (minimum 8 GB) using `dd` on Linux/macOS or tools like Rufus / BalenaEtcher on Windows:
   ```bash
   sudo dd if=isblocks-kms-appliance-x86_64.iso of=/dev/sdX bs=4M status=progress conv=fdatasync
   ```
2. Insert the USB drive into the physical server.
3. Access the BIOS/UEFI boot menu (typically `F11` or `F12` during POST) and select the UEFI USB drive.

### Physical Server BIOS/UEFI Recommendations:
* **Boot Mode:** UEFI only (Legacy BIOS disabled).
* **Secure Boot:** Enabled (appliance kernel is signed).
* **TPM 2.0:** Enabled.
* **PCIe Device Detection:** Verify that internal PCIe HSM cards are recognized in the system inventory.

---

## 3. Installing on VMware vSphere / ESXi

1. Log in to the **VMware vSphere Client** (vCenter or standalone ESXi host).
2. **Upload ISO to Datastore:**
   * Navigate to **Storage** $\rightarrow$ Select your Datastore $\rightarrow$ **Files** $\rightarrow$ **Upload Files**.
   * Upload `isblocks-kms-appliance-x86_64.iso`.
3. **Create a New Virtual Machine:**
   * Right-click the cluster/host $\rightarrow$ **New Virtual Machine** $\rightarrow$ **Create a new virtual machine**.
   * **Name and Folder:** `isblocks-kms-prod-01`.
   * **Compute / Storage:** Select target host and Datastore.
   * **Compatibility:** ESXi 7.0 or later (VM version 19+).
   * **Guest OS:** `Linux` $\rightarrow$ `Ubuntu Linux (64-bit)` or `Other Linux (64-bit)`.
4. **Hardware Configuration:**
   * **CPU:** 4 to 8 vCPUs (reserve CPU for latency-sensitive signing).
   * **Memory:** 16 GB RAM (Enable *Reserve all guest memory* if using PCI passthrough).
   * **Hard Disk:** 100 GB+ (Thin or Thick Provision Eager Zeroed).
   * **Network Adapter:** `VMXNET3` connected to the appropriate port group/VLAN.
   * **CD/DVD Drive:** Select **Datastore ISO file**, select the uploaded ISO, and check **Connect at power on**.
5. **(Optional) HSM DirectPath I/O (PCI Passthrough):**
   * If passing through a dedicated physical PCIe HSM card to the VM, add a **PCI Device** under VM settings and select the HSM controller.
6. **Boot & Install:**
   * Power on the VM, open the Web Console, and proceed through the appliance installer.

---

## 4. Installing on Nutanix AHV (Prism)

1. Log in to **Nutanix Prism Central** or **Prism Element**.
2. **Upload the ISO to Image Configuration:**
   * Navigate to **Settings** (gear icon) $\rightarrow$ **Image Configuration**.
   * Click **Upload Image**.
   * Name: `isblocks-kms-iso`.
   * Image Type: **ISO**.
   * Storage Container: Select your target container and upload the `.iso` file.
3. **Create Virtual Machine:**
   * Navigate to **VM** view and click **+ Create VM**.
   * Name: `isblocks-kms-ahv`.
   * Compute: 4 vCPUs (2 Sockets, 2 Cores), 16 GB Memory.
4. **Configure Disks & CD-ROM:**
   * **Boot Disk:** Click **+ Add New Disk** $\rightarrow$ Type: `DISK`, Bus: `SCSI`, Size: `100 GB`.
   * **ISO CD-ROM:** Click the pencil icon on the default CD-ROM device $\rightarrow$ Type: `CD-ROM`, Operation: `Clone from Image Service`, select `isblocks-kms-iso`.
5. **Configure Network:**
   * Click **+ Add New NIC** and select the appropriate AHV Virtual Network / VLAN.
6. **Set Boot Priority:**
   * Under **Set Boot Priority**, choose **CD-ROM** as the first boot device.
7. **Power On & Install:**
   * Click **Save**, power on the VM, open the **Launch Console** window, and follow the on-screen installation prompts.
   * After installation completes, edit VM settings to unmount the CD-ROM and set the Boot Device back to **Disk**.

---

## 5. Installing on Red Hat OpenShift (OpenShift Virtualization)

OpenShift Virtualization allows running virtual machines natively on OpenShift clusters using KubeVirt and the Containerized Data Importer (CDI).

### Step 1: Upload the ISO to a DataVolume

Create a DataVolume to import the ISO image into your cluster storage:

```yaml
apiVersion: cdi.kubevirt.io/v1beta1
kind: DataVolume
metadata:
  name: isblocks-kms-iso-dv
  namespace: isblocks-kms
spec:
  source:
    http:
      url: "https://repository.internal.example.com/iso/isblocks-kms-appliance-x86_64.iso"
  pvc:
    accessModes:
      - ReadWriteOnce
    resources:
      requests:
        storage: 10Gi
    storageClassName: ocs-storagecluster-ceph-rbd
```

Apply the DataVolume:
```bash
oc apply -f isblocks-iso-dv.yaml
```

*(Alternatively, use `virtctl image-upload dv isblocks-kms-iso-dv --size=10Gi --image-path=isblocks-kms-appliance-x86_64.iso -n isblocks-kms`)*

### Step 2: Deploy the VirtualMachine Custom Resource

```yaml
apiVersion: kubevirt.io/v1
kind: VirtualMachine
metadata:
  name: isblocks-kms-node
  namespace: isblocks-kms
spec:
  running: true
  template:
    metadata:
      labels:
        kubevirt.io/vm: isblocks-kms-node
    spec:
      domain:
        devices:
          disks:
            # Installation Target Hard Disk
            - name: rootdisk
              disk:
                bus: virtio
            # Bootable Installer ISO
            - name: cdromiso
              cdrom:
                bus: sata
                bootOrder: 1
          interfaces:
            - name: default
              masquerade: {}
        resources:
          requests:
            memory: 16Gi
            cpu: "4"
          limits:
            memory: 16Gi
            cpu: "4"
      networks:
        - name: default
          pod: {}
      volumes:
        - name: rootdisk
          dataVolume:
            name: isblocks-kms-root-pvc
        - name: cdromiso
          dataVolume:
            name: isblocks-kms-iso-dv
  dataVolumeTemplates:
    - metadata:
        name: isblocks-kms-root-pvc
      spec:
        accessModes:
          - ReadWriteOnce
        resources:
          requests:
            storage: 100Gi
        storageClassName: ocs-storagecluster-ceph-rbd
```

### Step 3: Access Console & Complete Installation
1. Apply the manifest:
   ```bash
   oc apply -f isblocks-kms-vm.yaml
   ```
2. Open the OpenShift Web Console:
   * Navigate to **Virtualization** $\rightarrow$ **VirtualMachines** $\rightarrow$ `isblocks-kms-node` $\rightarrow$ **Console**.
   * Or connect via CLI using `virtctl vnc isblocks-kms-node -n isblocks-kms`.
3. Complete the interactive installation steps.

---

## 6. Appliance Setup & First Boot

During the initial installation walkthrough, configure the basic appliance networking and security parameters:

1. **Storage Partitioning:** Select the destination disk (e.g., `/dev/sda` or `/dev/vda`). The installer configures encrypted LVM partitions for the database, application binaries, and audit logs.
2. **Network Configuration:**
   * **Hostname / FQDN:** Set the fully qualified domain name (e.g., `kms.internal.example.com`).
   * **IP Assignment:** Static IP (recommended) or DHCP. Provide IPv4 Address, Subnet Mask, Gateway, and DNS servers.
3. **Administrator Credentials:** Set the root password and create the initial system administrator account.
4. **Installation Completion:**
   * Unmount the ISO media / virtual CD-ROM.
   * Select **Reboot System**.

---

## 7. Verifying Appliance Services

Once the appliance finishes rebooting:

1. **Console Login:** Log in via local console or SSH with the administrator account.
2. **Service Status Check:**
   ```bash
   sudo systemctl status isblocks-kms keycloak mongod nginx --no-pager
   ```
3. **Web Dashboard Access:**
   * Open your web browser and navigate to:
     ```
     https://<appliance-ip-or-fqdn>/
     ```
   * Log into the **IS Blocks KMS Dashboard** using the initial administrator credentials to begin Key Ring, HSM, and PKI initialization.
