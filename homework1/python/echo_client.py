import sys
import socket

if len(sys.argv) != 2:
    print('Pass the server IP as the sole command line argument')
else:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.connect((sys.argv[1], 43210))
        print('Enter lines of text then Ctrl+D or Ctrl+C to quit')
        while True:
            line = sys.stdin.readline()
            if not line:
                break
            sock.sendall(f'{line}'.encode('utf-8'))
            while True:
                data = sock.recv(128)
                print("Server echoes: " + data.decode("utf-8"), end='')
                if len(data) < 128:
                    break