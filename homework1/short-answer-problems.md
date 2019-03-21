1. What was the name of the famous 1974 paper by Cerf and Kahn and why was it so influential?
   - The name of the name of the famous 1974 paper by Cerf and Kahn is _A Protocol for Packet Network Intercommunication_.
     It was so influential because it described the TCP Protocol.
     Back in the early 70's, the ARPANET and other data networks could not communicate with each other because of different hardware and software protocols.
     The TCP (Transmission Control Protocol) essentially laid the groundwork for open-architecture networking, as it was a cross-network protocol that allowed computers to freely speak to each other regardless of hardware or software constraints.
     This international network of computer networks became the foundation for the Internet as we know it today.

2. Contrast packet switching and circuit switching in a couple sentences.
   - Circuit switching deals with a singular, dedicated path between the source and destination where all packets use the same path, with a reserved amount of bandwidth for just one session. Packet switching breaks the data into packets and takes whatever path is available between the source and destination, independently routing them with no guarantees on bandwidth quality but also no wasted bandwidth.

3. Who publishes the RFCs?
   - The Internet Engineering Task Force, Internet Research Task Force, Internet Architecture Board, and other independent authors publish RFCs.

4. What command do you use to show your host’s routing table?
   - `netstat -r`

5. What does the transport layer take care of? What does it not need to know?
   - The transport layer takes care of making sure that data sent by an application is correctly & reliably delivered (with the right order if TCP is used) to the application on the other end. 
     It is asked by application layer to break up a stream of data into transport-layer packets (segments) and send them out. 
     The transport layer takes those packets and asks the network layer to deliver it to the host. 
     On the receiving end, it takes the data from the network layer and appends it to a data stream consumed by the application layer. 
     The transport layer does not need to know about how the data is delivered across a single link within the link layer.

6. What was the first message sent on the ARPANET? The second?
   - The first message was 'L' and the second message was 'O'.

7. Contrast TCP and UDP in a couple sentences.
   - TCP (Transmission Control Protocol) and UDP (User Datagram Protocol) are both protocols used to send packets over the Internet.
     TCP emphasizes reliability by tracking packets sent to ensure no data is loss or corrupted during transmission.
     TCP ensures reliability by numbering packets and error-checking packets. TDP error checks packets by having the recipient send the sender a confirmation of receiving the packet.
     If the sender does not receive a correct response, it can resend the packet(s) to to make sure the recipient receives the packet(s) correctly.
     UDP emphasizes speed over reliability by sending packets to the recipient without waiting a reponse from the recipient receiving the packet(s).
     If the recipient does not receive any UDP packets, the sender does not resend them.

8. What is the smallest possible IP packet size?
   - 20 bytes

9. What is the largest possible IP packet size that has zero data bytes?
   - 60 bytes

10. Why don’t Node.js servers need threads?
    - Node.js servers do not need multiple threads because they are event-driven and run processes asynchronously on single thread.
