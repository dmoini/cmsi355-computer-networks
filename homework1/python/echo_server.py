import socketserver
import threading

class ThreadedTCPServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    pass

class EchoHandler(socketserver.StreamRequestHandler):
    def handle(self):
        client = f'{self.client_address} on {threading.currentThread().getName()}'
        print(f'Connected: {client}')
        while True:
            data = self.rfile.readline()
            if not data:
                break
           
            self.wfile.write(data.decode('utf-8').encode('utf-8'))
        print(f'Closed: {client}')

if __name__ == '__main__':
    with ThreadedTCPServer(('', 43210), EchoHandler) as server:
        print(f'The echo server is running...')
        server.serve_forever()