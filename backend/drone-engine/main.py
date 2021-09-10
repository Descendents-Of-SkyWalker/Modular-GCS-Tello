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


drone, frame = drone_helpers.initialize(args['speed'])
Stats = drone_helpers.DroneStatistics(drone)
Controller = drone_helpers.DroneController(drone, args['movement_sensitivity'], args['turn_sensitivity'])
port = args['port']


def initializeSocket() -> socket:
    request = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    request.bind(('localhost', port))
    request.listen()
    conn, addr = request.accept()
    return conn



def drone_controller_interface():
    connection = initializeSocket()
    with connection as conn:
        while True:
            try:
                data = int(conn.recv(1).decode('utf-8'))
                if not data:
                    Controller.land()
                    break
                else:
                    print(data)
                    if data == 1:
                        Controller.takeoff()
                    elif data == 3:
                        print(Stats.getStats())
                    elif data == 5:
                        Controller.land()
                    continue
            except:
                Controller.land()
                break

drone_controller_interface()