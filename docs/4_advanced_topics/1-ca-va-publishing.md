---
sidebar_position: 1
---

# CA to VA Publishing Using Kafka

Add **Markdown or React** files to `src/pages` to create a **standalone page**:

- `src/pages/index.js` → `localhost:3000/`
- `src/pages/foo.md` → `localhost:3000/foo`
- `src/pages/foo/bar.js` → `localhost:3000/foo/bar`

## Introduction 

Validation Authorities operate by accepting requests based on the RFC 6090 standards and delivering signed responses. The signed responses to requests allow for the near real time validation of certificates within a given architecture. The basic architecture operates by maintaining a table of certificates referred to as the CertificateData table. In addition to other information, this certificate maintains data on the issued certificates and their revocation status (if applicable). Revocation validation is performed by replicating this table to a secondary server whose sole purpose is the validation via the OCSP protocol. 

For this purpose, Apache Kafka is employed to facilitate the publishing from the server to the client. 

In short Kafka is an event streaming platform that collects data from various sources into topics and allows other entities to read and further process this data. 

## General Concepts of Event Streaming

An event records the fact that "something happened" in the world or in your business. It is also called record or message in the documentation. When you read or write data to Kafka, you do this in the form of events. Conceptually, an event has a key, value, timestamp, and optional metadata headers. Here's an example event:

Event key: "Alice"

Event value: "Made a payment of $200 to Bob"

Event timestamp: "Jun. 25, 2020 at 2:06 p.m."

Producers are those client applications that publish (write) events to Kafka, and consumers are those that subscribe to (read and process) these events. In Kafka, producers and consumers are fully decoupled and agnostic of each other, which is a key design element to achieve the high scalability that Kafka is known for. For example, producers never need to wait for consumers. Kafka provides various guarantees such as the ability to process events exactly-once.

Events are organised and durably stored in topics. Very simplified, a topic is similar to a folder in a filesystem, and the events are the files in that folder. An example topic name could be "payments". Topics in Kafka are always multi-producer and multi-subscriber: a topic can have zero, one, or many producers that write events to it, as well as zero, one, or many consumers that subscribe to these events. Events in a topic can be read as often as needed—unlike traditional messaging systems, events are not deleted after consumption. Instead, you define for how long Kafka should retain your events through a per-topic configuration setting, after which old events will be discarded. Kafka's performance is effectively constant with respect to data size, so storing data for a long time is perfectly fine.

Topics are partitioned, meaning a topic is spread over a number of "buckets" located on different Kafka brokers. This distributed placement of your data is very important for scalability because it allows client applications to both read and write the data from/to many brokers at the same time. When a new event is published to a topic, it is actually appended to one of the topic's partitions. Events with the same event key (e.g., a customer or vehicle ID) are written to the same partition, and Kafka guarantees that any consumer of a given topic-partition will always read that partition's events in exactly the same order as they were written.

Figure: This example topic has four partitions P1–P4. Two different producer clients are publishing, independently from each other, new events to the topic by writing events over the network to the topic's partitions. Events with the same key (denoted by their color in the figure) are written to the same partition. Note that both producers can write to the same partition if appropriate.


## Architecture

High Level Architecture



A a high level, the system operates by pulling data from a source system, the certificate authority database in this case and publishing this to a Kafka topic. a topic is a data partition that is able to segregate data from one relevant subject. 



Certification Authority publishing to a Validation Authority



### Kafka Server

Kafka server is run as a cluster of one or more servers that can span multiple data centres or cloud regions. Some of these servers form the storage layer, called the brokers. Other servers run Kafka Connect or sources to continuously import and export data as event streams to integrate Kafka with your existing systems such as relational databases as well as other Kafka clusters. To let you implement mission-critical use cases, a Kafka cluster is highly scalable and fault-tolerant: if any of its servers fails, the other servers will take over their work to ensure continuous operations without any data loss.

### Kafka Connect Data Sink

The data sink pulls data from a Kafka topic and publishes this to the database configured by the sink. The data sink is local to the database ensuring that there is no direct database connections exposed to other servers. The databank in this use cases is the validation authority database. 

### Kafka Connect Data Source

The data source writes data to the Kafka topic. Whenever a new certificate is issued, this is written to the Kafka topic ensuring that


## Installation 

### On the CA 

The installation is distributed as a isblocks-kafka-vx.xx.tar.gz

```bash
cd /opt
sudo tar -xvf /home/isblocks/isblocks-kafka-vx.xx.tar.gz
```

Create the kafka.service file

sudo nano /etc/systemd/system/kafka.service

Add the following text to the file

```bash
[Unit]
Description=Apache Kafka
Requires=zookeeper.service
After=network.target network-online.target remote-fs.target zookeeper.service

[Service]
Type=forking
User=kafka
Group=kafka
Environment="KAFKA_JMX_OPTS=-Dcom.sun.management.jmxremote -Dcom.sun.management.jmxremote.port=10030 -Dcom.sun.management.jmxremote.local.only=true -Dcom.sun.management.jmxremote.authenticate=false"
Environment="LOG_DIR=/var/log/kafka"
# Uncomment the following line to enable authentication for the broker
# Environment="KAFKA_OPTS=-Djava.security.auth.login.config=/etc/kafka/kafka-jaas.conf -Djava.security.krb5.conf=/etc/krb5.conf"
ExecStart=/opt/isblocks-kafka/bin/kafka-server-start -daemon /opt/isblocks-kafka/config/server.properties
ExecStop=/opt/isblocks-kafka/bin/kafka-server-stop
SuccessExitStatus=143

[Install]
WantedBy=multi-user.target
```

Create the zookeeper service file

```bash
sudo nano /etc/systemd/system/zookeeper.service
```

Add the following text to the file

```bash
[Unit]
Description=Bootstrapped Zookeeper
After=syslog.target network.target
[Service]
Type=simple
User=<user>
Group=<group>
ExecStart=/opt/isblocks-kafka/bin/zookeeper-server-start.sh /opt/kafka/config/zookeeper.properties
ExecStop=/opt/isblocks-kafka/bin/zookeeper-server-stop.sh
[Install]
WantedBy=multi-user.target
```

## Security
### Connection Security 

Security in motion


### SSL Certificates

The table below lists the SSL certificates that have to be created for the infrastructure above.

| Certificate       				  |     Reference               |  EKU Attributes       |  Required Extensions |
|---------------------------	------|:---------------------------:|----------------------:|---------------------:|
| Zookeeper Keystore				  | [ZKP_KEYSTORE_FILE] 	        | Server Authentication | SAN - DNS Name	       |
| Kafka Key Store 				  | [KAFKASERVER_KEYSTORE_FILE] | Server Authentication | SAN - DNS Name       |
|                 				  |                             | Client Authentication | 					   |
| CA Connector - Source Key Store | [CA_CONNECTOR_KEYSTORE_FILE]| Server Authentication | SAN - DNS Name       |
|                 				  |                             | Client Authentication |                      |
| VA Connector - Sink Key Store   | [VA_CONNECTOR_KEYSTORE_FILE]| Server Authentication | SAN - DNS Name       |
|                 				  |                             | Client Authentication |                      |
| Trust Store 					  | [TRUSTSTORE_FILE]           | NA                    |   NA                 |


Create a file at `src/pages/my-react-page.js`:

```jsx title="src/pages/my-react-page.js"
import React from 'react';
import Layout from '@theme/Layout';

export default function MyReactPage() {
  return (
    <Layout>
      <h1>My React page</h1>
      <p>This is a React page</p>
    </Layout>
  );
}
```

A new page is now available at [http://localhost:3000/my-react-page](http://localhost:3000/my-react-page).

## Create your first Markdown Page

Create a file at `src/pages/my-markdown-page.md`:

```mdx title="src/pages/my-markdown-page.md"
# My Markdown page

This is a Markdown page
```

A new page is now available at [http://localhost:3000/my-markdown-page](http://localhost:3000/my-markdown-page).
