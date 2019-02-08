import socket

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
    host = input('Enter the IP address of a machine running the random number server: ')
    sock.connect((host, 53211))
    print(sock.recv(1024).decode("utf-8"))