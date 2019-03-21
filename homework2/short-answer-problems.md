1. What are the two basic communication paradigms used in the Internet?
    - Stream (client-server) and message (P2P).
2. Give six characteristics of Internet stream communication.
    - Internet stream communication is connection-oriented, has 1-to-1 communication, transfers a sequence of individual bytes, has an arbitrary length transfer, is used by most applications, and is built on TCP protocol.
3. Give six characteristics of Internet message communication.
    - Internet message communication is connectionless, has many-to-many communication, transfers a sequence of individual messages, each message limited to 64 kilobytes, is used for multimedia applications, and is built on UDP protocol.
4. If a sender uses the stream paradigm and always sends 1024 bytes at a time, what size blocks can the Internet deliver to a receiver?
    - Any size blocks that total up to 1024 bytes.
5. If a sender wants to have copies of each data block being sent to three recipients, which paradigm should the sender choose?
    - The message paradigm since it provides 1-to-many communication the ability to multicast to some of the devices on a network.
6. What are the three surprising aspects of the Internet’s message delivery semantics?
    - It permits messages to be lost, duplicated, and delivered out of order.
7. Give the general algorithm that a connection-oriented system uses.
    - First, a pair of applications requests a connection. Then the pair uses the connection to exchange data until the pair requests that the connection be terminated.

9. Compare and contrast a client and server application by summarizing characteristics of each.
    - A server starts first, does not need to know which client will contact it, waits passively and arbitrarily long for contact from a client, and stays running after servicing one client, and waits for another.
    On the other hand, a client starts second, must know which server to contact, initiates a contact whenever communication is needed, and may terminate after interacting with a server.
    Both, however, communicate with each other by sending and receiving data.
10. What is the difference between a server and a server-class computer?
    - A server refers to a program that waits passively for communication while a server-class computer is dedicated to running one or more server programs.
11. Can data flow from a client to a server? Explain.
12. List the possible combinations of clients and servers a given computer can run.
13. Can all computers run multiple services effectively? Why or why not?
14. What two identifiers are used to specify a particular server?
15. List the steps a client uses to contact a server after a user specifies a domain name for the server.
16. What basic operating system feature does a concurrent server use to handle requests from multiple clients simultaneously?
17. What performance problem motivates peer-to-peer communication?
18. Name two operating systems that offer the socket API.
19. Once a socket is created, how does an application reference the socket?
20. What are the main functions in the socket API?
21. Give the typical sequence of socket calls used by a client and by a server.
22. To what socket functions do read and write correspond?
23. Does a client ever use bind? Explain.