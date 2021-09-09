from djitellopy import Tello
from requests import post
import cv2
import base64
import json

def initialize(setSpeed) -> Tello:
    drone = Tello()
    drone.connect()
    drone.streamon()
    drone.set_speed(setSpeed)
    return drone, drone.get_frame_read()

class DroneStatistics:
    def __init__(self, droneObject: Tello):
        self.drone = droneObject

    def getStats(self) -> dict:
        stats = {}
        stats['acceleration'] = {
            'x': self.drone.get_acceleration_x(),
            'y': self.drone.get_acceleration_y(),
            'z': self.drone.get_acceleration_z()
        }

        

class DroneController:
    def __init__(self, droneObject: Tello, movement_sensitivity: int, turn_sensitivity: int):
        self.drone = droneObject
        self.movement_sensitivity = movement_sensitivity
        self.turn_sensitivity = turn_sensitivity

    def takeoff(self):
        self.drone.takeoff()

    def land(self):
        self.drone.land()

    def forward(self):
        self.drone.move_forward(self.movement_sensitivity * 24)

    def back(self):
        self.drone.move_back(self.movement_sensitivity * 24)

    def left(self):
        self.drone.move_left(self.movement_sensitivity * 24)

    def right(self):
        self.drone.move_right(self.movement_sensitivity * 24)

    def up(self):
        self.drone.move_up(self.movement_sensitivity * 24)

    def down(self):
        self.drone.move_down(self.movement_sensitivity * 24)

    def turn_clockwise(self):
        self.drone.rotate_clockwise(self.turn_sensitivity * 15)

    def turn_counter_clockwise(self):
        self.drone.rotate_counter_clockwise(self.turn_sensitivity * 15)


def send_video_frame(frame_read: Tello.background_frame_read, port: int) -> str:
    img = frame_read.frame
    _dummy, frame = cv2.imencode('.jpg', cv2.flip(img, 1))
    # converting the frame to base 64 string
    b64_str = base64.b64encode(frame).decode()

    return b64_str
    # headers = {'content-type': 'application/json'}

    # res = post(url=f'http://localhost:{port}/videoFrame', data=json.dumps({
    #     'frame': b64_str
    # }),
    #     headers=headers
    # )
