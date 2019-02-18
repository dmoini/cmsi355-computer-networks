import socketserver
import threading


class ThreadedTCPServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    pass


if __name__ == '__main__':
    server = ThreadedTCPServer(('', 59001), )
