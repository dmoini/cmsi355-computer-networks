import socketserver
# from datetime import datetime
import random

class RandomNumberHandler(socketserver.StreamRequestHandler):
    def handle(self):
        random_int = str(random.randint(1, 101))
        self.wfile.write(random_int.encode('utf-8'))

if __name__ == '__main__':
    with socketserver.TCPServer(('', 53211), RandomNumberHandler) as server:
        print('The random number server is running')
        server.serve_forever()