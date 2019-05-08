25.4) Calculate the size of the largest possible UDP message. (Hint: the entire UDP message must fit in an IP datagram.)
- An IP data gram is 65535 bytes. This includes 20 bytes for the IP header and 8 bytes for the UDP header, so the largest possible UDP message is <img src="https://latex.codecogs.com/gif.latex?65535-20-8=65507" title="65535-20-8=65507" /> bytes.

26.4) What are the main problems a transport protocol must solve to achieve reliable transfer?
- Unreliable connection: messages sent across the Internet can be lost, duplicated, corrupted, delayed, or delivered out of order.
- End system reboot: if either of the two ends of a connection crash or reboot, there must be no confusion between sessions since some computers can reboot faster than a packet crossing the Internet.
- Heterogeneous end systems: a system can generate data faster than a slow receiver can receive it, thus overrunning it.
- Congestion in the internet: if data is over-transmitted by many computers, the Internet "highway" can become congested.

26.6) When using a sliding window of size N, how many packets can be sent without requiring a single ACK to be received?
- N

26.12) How does TCP compute a timeout for retransmission?
- TCP estimates round-trip delay for each active connection by measuring the time needed to receive a response. TCP then computes a weighted average from a sequence of these round-trip estimates. TCP also keeps an estimate of the variance, and uses both the weighted average and variance to compute a timeout for retransmission.

26.15) Suppose two programs use TCP to establish a connection, communicate, terminate the connection, and then open a new connection. Further suppose a FIN message sent to shut down the first connection is duplicated and delayed until the second connection has been established. If a copy of the old FIN is delivered, will TCP terminate the new connection? Why or why not?S
- No. TCP requires each end of a new connection to generate a random 32-bit sequence number that becomes the initial sequence for data sent. When the programs reconnect, they generate a new random 32-bit sequence number for the new connection. When the FIN is received, it will have the sequence number from the first connection and not match the sequence of the current connection. Knowing that the sequences do not match, the receiver rejects the old FIN and does not terminate the new connection.

27.2) What two entries are needed in the forwarding table of a typical host?
- The address of the directly connected network for the host and a default route that directs all other traffic to another specific router.

30.8) List and describe the eight basic security techniques.
1. **Hashing:** Typical encoding schemes use cryptographic hashing methods. One hashing scheme relies on a secret key known only to the sender and receiver. The sender takes a message as input, uses the key to compute a hash, H, and transmits H along with the message. H is a short string of bits, and the length of H is independent of the message size. The receiver uses the key to compute a hash of the message, and compares the hash to H. If the two agree, the message has arrived intact. An attacker, who does not have the secret key, will be unable to modify the message without intro- ducing an error. Thus, H provides message authentication because a receiver knows that a message that arrives with a valid hash is authentic.

2. **Encryption:** Encryption can guarantee data confidentiality (privacy), message authenticity, data integrity and can prevent replay attacks. A sender applies encryption to scramble the bits of the message in a way that only the intended recipient can unscramble them. Many encryption technologies exist and can divided into two types depending on how the keys are used: private key encryption and public key encryption. Private key systems are when each pair of communication entites share a single key that is both the encryption and decryption key. A public system system assigns each entity a pair of keys, in which one case might be a single user. That user would have a secret private key and a public key published alongside the user's name. 

3. **Digital Signatures:** To authenticate the sender of a message, a technique known as a digital signature is used. To sign a message, the sender encrypts it with a key known only to the sender. The recipient will use the inverse function to decrypt the message.

4. **Digital Certificates:** A digital certificate is essentially a certificate that is issued by an automated key authority system that validates public keys. While there are many variations, the general principle is the same: by knowing one key (the public key of a key authority), it is possible to obtain other public keys in a secure manner.
5. **Firewalls:** An internet firewall helps protect an organization's computers and networks from unwatned internet traffic. This firewall is placed between an organization and the rest of the internet, and all packets entering or leaving the organization must pass through the firewall. The firewall will then implement security policies and drops any packets that do not adhere to the policy, and it itself is immune to any security attacks.
6. **Intrusion Detection Systems**: An *Intrusion Detection System (IDS)* monitors all packets arriving at a site and notifies the site administrator if a security violation is detected. An IDS provides an extra layer of security awareness — even if a firewall prevents an attack, an IDS can notify the site administrator that a problem is occurring. The main difference between an IDS and a firewall is that an IDS includes state information. Unlike a firewall that applies rules to a single packet at a time, an IDS can keep a history of packets.
7. **Deep Packet Inspection & Content Scanning**: Preventing problems like malware and virus installation relies on a technique known as *content analysis*: There are two types: File scanning and Deep Packet Inspection (DPI).
      1. File scanning: A file scanner takes a file as input and looks for patterns of bytes that indicate a problem. An example of this would be that virus scanners look for strings of bytes known as *fingerprints*, and then tries to match the fingerprints with existing items known to potentially be viruses.
      2. Deep Packet Inspection (DPI): DPI works on packets instead of files. Instead of just examining the headers in packets that pass into the site, a DPI mechanism will also examine the data in the packet payload. An example of DPI, would an attack where a slight misspelling of a domain name is used to trick a user into trusting a site, and the DPI will search that site if it matches for any listed blacklist sites.
8. **Virtual Private Networks (VPNs):** VPNs use encryption to provide secure access to an organization's intranet from remote sites. The advantage of using this creates a resulting network that is completely *private.* A VPN uses the internet to transfer data among sites and ensure that data cannot be accessed by outsiders. 

30.11) Read about the Data Encryption Standard (DES). What size key should be used for data that is extremely important?
- DES traditionally uses a 64-bit key for encryption, of which 8 bits are used for parity checks, limiting it to about 56 bits. For data that is extremely important, since 56 bits are considered weak, Triple DES (3DES) was introduced which essentially increased the size block by three times for a total of 192 bits. Thus, a 192-bit key (which would effectively be a 168-bit key with parity checks) size should be used for extremely important data.

30.14) How can two parties use public key encryption to sign a contract that is then sent to a third party?
- Using a public key encryption system, the two parties can sign that contract with their own private keys. The third party would then verify the signature by looking up the senders' public keys and using those keys to decrypt the message. Because each sender knows his/her private key, only the senders can encrypt a message that can be decoded with the public key.
  
30.17) Many commercial firewall products allow a manager to specify packets to deny as well as packets to accept. What is the disadvantage of a configuration that allows denial?
- The disadvantage of this configuration is that it is more secure to specify which packets are allowed and using denial could possible mean that some useful packets are denied. Since this is manually configured, user error could occur from denying the wrong packets.

30.21) Consider a DPI system that searches for a string of K bytes in each packet. If a packet contains 1486 bytes of payload, what is the worst case number of comparisons that must be made to examine the packet assuming a straightforward matching algorithm?
- K * (1486 + 20)