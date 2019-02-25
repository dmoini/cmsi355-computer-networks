import sys
import socket

if len(sys.argv) != 2:
    print('Pass the server IP as the sole command line argument')
else:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.connect((sys.argv[1], 53211))
        print(sock.recv(1024).decode('utf-8'))