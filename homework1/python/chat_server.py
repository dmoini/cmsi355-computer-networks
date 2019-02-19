import socketserver
import threading


class ThreadedTCPServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    pass


class ChatHandler():
    pass


if __name__ == '__main__':
    server = ThreadedTCPServer(('', 59001), ChatHandler)
    with server:
        print(f'The chat server is running...')
        server.serve_forever()
