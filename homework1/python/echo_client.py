import socket

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
    host = input('Enter the IP address of a machine running the echo server: ')
    sock.connect((host, 43210))
    phrase = input('Enter a string to send to the server: ') + '\n'
    sock.sendall(phrase.encode('utf-8'))
    print(f'Server says: {sock.recv(1024).decode("utf-8")}')