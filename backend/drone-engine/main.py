import drone_helpers
import argparse
import json
import threading
import socket
import requests
import cv2
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
headers = {'content-type': 'application/json'}


def initializeSocket() -> socket:
    try:
        request = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        request.bind(('localhost', port + 1))
        request.listen()
        conn, addr = request.accept()
        return conn
    except:
        request = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        request.bind(('localhost', port + 2))
        request.listen()
        conn, addr = request.accept()
        return conn


def postData(path:str, data:str) -> requests.Response:
    res = requests.post(
        url = f'http://localhost:{port}/{path}',
        data = json.dumps({
            'frame' if path == 'videoFrame' else 'stats' : data
        }),
        headers = headers
    )
    return res


def dataSender():
    while True:
        postData(
            'videoFrame',
            drone_helpers.get_video_frame(frame)
        )


def drone_controller_interface():
    connection = initializeSocket()
    with connection as conn:
        while True:
            try:
                data = int(conn.recv(1).decode('utf-8'))
                if not data:
                    # Controller.land()
                    break
                else:
                    if data == 1:
                        Controller.takeoff()
                    elif data == 2:
                        Controller.forward()
                    elif data == 3:
                        Controller.left()
                    elif data == 4:
                        Controller.right()
                    elif data == 5:
                        Controller.back()
                    elif data == 6:
                        Controller.up()
                    elif data == 7:
                        Controller.down()
                    elif data == 8:
                        Controller.land()
                    continue
            except:
                # Controller.land()
                # Controller.end()
                break

# drone_controller_interface()


t1 = threading.Thread(target=drone_controller_interface)
t2 = threading.Thread(target=dataSender)
t3 = threading.Thread(target=drone_controller_interface)


t1.start()
t2.start()
t3.start()