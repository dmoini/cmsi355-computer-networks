import socketserver
import threading

class ThreadedTCPServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    pass

class EchoHandler(socketserver.StreamRequestHandler):
    def handle(self):
        print(f'Handling a client on {threading.currentThread().getName()}')
        while True:
            data = self.rfile.readline().strip()
            # self.wfile.write(data.decode('utf-8').encode('utf-8'))
            self.wfile.write(data)

if __name__ == '__main__':
    server = ThreadedTCPServer(('', 43210), EchoHandler)
    with server:
        print(f'The echo server is running')
        server.serve_forever()