import socket
from time import sleep

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

sock.connect(('localhost', 15002))

while 1:
    i = input()
    sock.sendall(i.encode())
    if i == 5:
        break