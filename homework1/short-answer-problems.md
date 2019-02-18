1. What was the name of the famous 1974 paper by Cerf and Kahn and why was it so influential?
   * The name of the name of the famous 1974 paper by Cerf and Kahn is *A Protocol for Packet Network Intercommunication*.
     It was so influential because it described the TCP Protocol.
     Back in the early 70's, the ARPANET and other data networks could not communicate with each other because of different hardware and software protocols. 
     The TCP (Transmission Control Protocol) essentially laid the groundwork for open-architecture networking, as it was a cross-network protocol that allowed computers to freely speak to each other regardless of hardware or software constraints. 
     This international network of computer networks became the foundation for the Internet as we know it today.

<!-- http://cs.lmu.edu/~ray/notes/packettrans/ -->
<!-- https://apposite-tech.com/blog/packet-switching-vs-circuit-switching/ -->
2. Contrast packet switching and circuit switching in a couple sentences.
   * <!-- TODO:  -->

3. Who publishes the RFCs?
   * The Internet Engineering Task Force, Internet Research Task Force, Internet Architecture Board, and other independent authors publish RFCs.

4. What command do you use to show your host’s routing table?
   * `netstat -r`

5. What does the transport layer take care of? What does it not need to know?
   * <!-- TODO:  -->

6. What was the first message sent on the ARPANET? The second?
   * The first message was 'L' and the second message was 'O'.

<!-- https://www.howtogeek.com/190014/htg-explains-what-is-the-difference-between-tcp-and-udp/ -->
7. Contrast TCP and UDP in a couple sentences.
   * TCP (Transmission Control Protocol) and UDP (User Datagram Protocol) are both protocols used to send packets over the Internet.
     TCP emphasizes reliability by tracking packets sent to ensure no data is loss or corrupted during transmission.
     TCP ensures reliability by numbering packets and error-checking packets. TDP error checks packets by having the recipient send the sender a confirmation of receiving the packet.
     If the sender does not receive a correct response, it can resend the packet(s) to to make sure the recipient receives the packet(s) correctly.
     UDP emphasizes speed over reliability by sending packets to the recipient without waiting a reponse from the recipient receiving the packet(s).
     If the recipient does not receive any UDP packets, the sender does not resend them.
     
8. What is the smallest possible IP packet size?
   * 20 bytes

9. What is the largest possible IP packet size that has zero data bytes?
   * 60 bytes

10. Why don’t Node.js servers need threads?
    * <!-- TODO:  -->