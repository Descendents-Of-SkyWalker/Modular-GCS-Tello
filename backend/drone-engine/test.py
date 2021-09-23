import socket
from time import sleep

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

sock.connect(('localhost', 3001))

ls = ['1','2', '3', '4', '5']

for i in ls:
    if i != '2' or i != '3':
        sleep(2)
    sock.sendall(i.encode())