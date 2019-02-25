import socketserver
import threading

class ThreadedTCPServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    pass

names = set()
writers = set()
    
class ChatHandler(socketserver.StreamRequestHandler):
    def handle(self):
        client = f'{self.client_address} on {threading.currentThread().getName()}'
        print(f'Connected: {client}')
        try:
            while True:
                self.wfile.write(f'SUBMITNAME\n'.encode('utf-8'))
                name = self.rfile.readline().decode('utf-8').strip()
                print(f'NAME: {name}')
                if name == "":
                    return
                with threading.Lock():
                    if name != "" and name not in names:
                        names.add(name)
                        break  

            self.wfile.write(f'NAMEACCEPTED: {name}\n'.encode('utf-8'))
            for w in writers:
                w.write(f'MESSAGE {name} has joined\n'.encode('utf-8'))
            writers.add(self.wfile)

            while True:
                message = self.rfile.readline().decode('utf-8')
                if message.lower().startswith('/quit'):
                    return
                for w in writers:
                    w.write(f'MESSAGE {name}: {message}\n'.encode('utf-8'))
        except Exception as e:
            print(e)
        finally:
            if self.wfile is not None:
                writers.remove(self.wfile)
            if name is not None:
                print(f'{name} is leaving')
                names.remove(name)
                for w in writers:
                    w.write(f'MESSAGE {name} has left\n'.encode('utf-8'))

if __name__ == '__main__':
    with ThreadedTCPServer(('', 59001), ChatHandler) as server:
        print(f'The chat server is running...')
        server.serve_forever()
