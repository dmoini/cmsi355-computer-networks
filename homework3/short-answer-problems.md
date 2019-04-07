6.20) If the maximum frequency audible to a human ear is 20,000 Hz, at what rate must the analog signal from a microphone be sampled when converting it to digital?  
- 2 * *f<sub>max</sub>* = 2 * 20,000 Hz = 40,000 Hz

7.2) What are the three energy types used when classifying physical media according to energy used?
- Electrical, light, and electromagnetic.

7.8) Explain why light does not leave an optical fiber when the fiber is bent into an arc.
- Since an arced fiber cable has a critical angle greater than 90°, light within the cable reflects as if the boundaries were a mirror. This keeps the light within the cable rather than allowing it to pass through the cable.

7.23) If a system has an average power level of 100, an average noise level of 33.33, and a bandwidth of 100 MHz, what is the effective limit on channel capacity?
- B * log<sub>2</sub>(1 + S/N) = 100 * 10<sup>6</sup> * log<sub>2</sub>(1 + (100 / 33.33)) = 10<sup>8</sup> * 2.00010819807069 = 200,010,819.81 bits/sec <!-- TODO: check on Chegg -->

13.8) What are the four basic LAN topologies?
- Bus: a single cable to which computers attach.
- Ring: arranges computers to be connected in a closed loop.
- Star: all computers attach to a central point.
- Mesh: provides a direct connection between each pair of computers.

13.11) Given an IEEE MAC address, how can one tell if the address refers to unicast?
- In a 48-bit IEEE MAC address, the value of the 8th bit determines whether the address refers to unicast (0) or multicast (1).

18.12) What are the two basic approaches used to perform a distributed route computation, and how does each work?
- Link State Routing: each packet switch broadcasts status messages to all switches in the network. Each switch collects incoming status messages and uses them to build a graph of the network. Each switch then uses a modified version of Dijkstra's algorithm to build a forwarding table, and chooses itself as the source.
- Distance-vector routing (DVR): each packet switch sends DVR messages, which contain distances to other switches, to its neighbors. These DVR messages are used to update the receiving switch's forwarding table.

21.4) Write a computer program that accepts a dotted decimal address as input and displays a string of 32 bits.
- View [dotted_decimal_to_thirty_two_bits.py](dotted_decimal_to_thirty_two_bits.py)

21.5) Write a computer program that reads an IP address in dotted decimal form and determines whether the address is a multicast address.
- View [is_multicast_address.py](is_multicast_address.py)

21.6) Write a computer program that translates between CIDR slash notation and an equivalent dotted decimal value.
- View [cidr_to_dotted_decimal.py](cidr_to_dotted_decimal.py)

21.7) If an ISP assigned you a / 28 address block, how many computers could you assign an address?
- TODO

21.8) If an ISP offers a / 17 address block for N dollars per month and a / 16 address block for 1.5 N dollars per month, which has the cheapest cost per computer?
- TODO

21.9) Is the CIDR prefix 1.2.3.4 / 29 valid? Why or why not?
- TODO

21.10) Suppose you are an ISP with a / 24 address block. Explain whether you accommodate a request from a customer who needs addresses for 255 computers. (Hint: consider the special addresses.)
- TODO

21.11) Suppose you are an ISP that owns a / 22 address block. Show the CIDR allocation you would use to allocate address blocks to four customers who need addresses for 60 com- puters each.
- TODO

21.12) Suppose you are an ISP that owns a / 22 address block. Can you accommodate requests from six customers who need addresses for 9, 15, 20, 41, 128, and 260 computers, respectively? If so, how? If not, explain why.
- TODO

21.13) Write a computer program that reads an address in CIDR notation and prints the result- ing address and mask in binary.
- TODO

23.2) What term is used to describe the mapping between a protocol address and a hardware address?
- TODO

23.5) How many octets does an ARP message occupy when used with IP and Ethernet addresses?
- TODO

23.22) Many NAT devices choose the 10.0.0.0/8 address block from Figure 23.10 because it provides the most generality. Explain why.
- TODO

24.3) List the major features of IPv6, and give a short description of each.
- TODO

24.9) Write a computer program that reads a 128-bit binary number and prints the number in colon hex notation.
- TODO