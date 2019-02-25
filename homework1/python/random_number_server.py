import socketserver
import random

class RandomNumberHandler(socketserver.StreamRequestHandler):
    def handle(self):
        random_int = str(random.randint(1, 100))
        self.wfile.write(random_int.encode('utf-8'))

with socketserver.TCPServer(('', 53211), RandomNumberHandler) as server:
    print('The random number server is running...')
    server.serve_forever()