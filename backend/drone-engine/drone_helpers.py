from djitellopy import Tello
import cv2
import base64
import json
from time import sleep

def initialize(setSpeed) -> Tello:
    drone = Tello()
    drone.connect()
    drone.set_speed(setSpeed)
    drone.streamon()
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

        stats['speed'] = {
            'x': self.drone.get_speed_x(),
            'y': self.drone.get_speed_y(),
            'z': self.drone.get_speed_z()
        }

        stats['principle_axes'] = {
            'pitch': self.drone.get_pitch(),
            'yaw': self.drone.get_yaw(),
            'roll': self.drone.get_roll(),
        }

        stats['height'] = self.drone.get_height()
        stats['flight_time'] = self.drone.get_flight_time()
        stats['battery'] = self.drone.get_battery()

        stats['drone_temperature'] = self.drone.get_temperature()

        return json.dumps(stats)

        

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
    
    def end(self):
        self.drone.streamoff()
        self.drone.end()

def get_video_frame(frame_read: Tello.background_frame_read) -> str:
    img = frame_read.frame
    _dummy, frame = cv2.imencode('.jpg', img)
    # converting the frame to base 64 string
    b64_str = base64.b64encode(frame)
    b64_str = b64_str.decode()
    
    return b64_str
