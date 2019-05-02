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

26.15) Suppose two programs use TCP to establish a connection, communicate, terminate the connection, and then open a new connection. Further suppose a FIN message sent to shut down the first connection is duplicated and delayed until the second connection has been established. If a copy of the old FIN is delivered, will TCP terminate the new connection? Why or why not?
- No. TCP requires each end of a new connection to generate a random 32-bit sequence number that becomes the initial sequence for data sent. When the programs reconnect, they generate a new random 32-bit sequence number for the new connection. When the FIN is received, it will have the sequence number from the first connection and not match the sequence of the current connection. Knowing that the sequences do not match, the receiver rejects the old FIN and does not terminate the new connection.

27.2) What two entries are needed in the forwarding table of a typical host?
- The address of the directly connected network for the host and a default route that directs all other traffic to another specific router.

30.8) List and describe the eight basic security techniques.
- TODO

30.11) Read about the Data Encryption Standard (DES). What size key should be used for data that is extremely important?
- TODO

30.14) How can two parties use public key encryption to sign a contract that is then sent to a third party?
- TODO

30.17) Many commercial firewall products allow a manager to specify packets to deny as well as packets to accept. What is the disadvantage of a configuration that allows denial?
- TODO

30.21) Consider a DPI system that searches for a string of K bytes in each packet. If a packet contains 1486 bytes of payload, what is the worst case number of comparisons that must be made to examine the packet assuming a straightforward matching algorithm?
- TODO