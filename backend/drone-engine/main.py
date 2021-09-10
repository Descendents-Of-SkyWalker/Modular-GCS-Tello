import drone_helpers
import argparse
import json
import threading
import socket
parser = argparse.ArgumentParser()

parser.add_argument('-s','--speed', help = 'set the speed of the drone "range" = [10, 100]', type=int)
parser.add_argument('-ms','--movement_sensitivity', help = 'set the sensitivity of movement of the drone "range" = [1, 24]', type=int)
parser.add_argument('-rs','--turn_sensitivity', help = 'set the sensitivity of rotation of the drone "range" = [1, 16]', type=int)
parser.add_argument('-p','--port', help = 'set the port on which the drone will report its data onto', type = int)

args = vars(parser.parse_args()) # dictionary containing command line args

# print(args)

# def main():
#     drone, frame_end_point = drone_helpers.initialize()

def initializeSocket(port:int) -> socket:
    request = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    request.bind(('localhost', port))
    request.listen()
    conn, addr = request.accept()
    return conn
