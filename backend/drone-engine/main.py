import drone_helpers
from time import sleep
import json
import threading
import socket
import requests
import sys

args = {}

args['speed'] = int(sys.argv[1])
args['movement_sensitivity'] = int(sys.argv[2])
args['turn_sensitivity'] = int(sys.argv[3])
args['port'] = int(sys.argv[4])


drone, frame = drone_helpers.initialize(args['speed'])
Stats = drone_helpers.DroneStatistics(drone)
Controller = drone_helpers.DroneController(drone, args['movement_sensitivity'], args['turn_sensitivity'])
port = args['port']
headers = {'content-type': 'application/json'}


def initializeSocket() -> socket:
    request = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    request.bind(('localhost', port + 1))
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


def videoFrameSender():
    while True:
        postData(
            'videoFrame',
            drone_helpers.get_video_frame(frame)
        )

def statsDataSender():
    while True:
        data = Stats.getStats()
        postData(
            'stats',
            data
        )
        sleep(0.5)

sys.stdout.write('init')
sys.stdout.flush()

connection = initializeSocket()


def drone_controller_interface():
    with connection as conn:
        while True:
            try:
                data = conn.recv(1).decode('utf-8')
                if not data:
                    break
                else:
                    if data == '1':
                        Controller.takeoff()
                    elif data == '2':
                        Controller.forward()
                    elif data == '3':
                        Controller.left()
                    elif data == '4':
                        Controller.right()
                    elif data == '5':
                        Controller.back()
                    elif data == '6':
                        Controller.up()
                    elif data == '7':
                        Controller.down()
                    elif data == '8':
                        Controller.turn_clockwise()
                    elif data == '9':
                        Controller.turn_counter_clockwise()
                    elif data == '#':
                        Controller.land()
                    continue
            except:
                break

# drone_controller_interface()


t1 = threading.Thread(target=drone_controller_interface)
t2 = threading.Thread(target=videoFrameSender)
t3 = threading.Thread(target=statsDataSender)


t1.start()
t2.start()
t3.start()