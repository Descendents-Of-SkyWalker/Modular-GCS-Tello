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
    return drone

class DroneController:
    def __init__(self, droneObject:Tello, sensitivity:int):
        self.drone = droneObject
        self.sensitivity = sensitivity

    def takeoff(self):
        self.drone.takeoff()

    def land(self):
        self.drone.land()

    def forward(self):
        self.drone.move_forward(self.sensitivity * 24)

    def back(self):
        self.drone.move_back(self.sensitivity * 24)

    def left(self):
        self.drone.move_left(self.sensitivity * 24)
    
    def right(self):
        self.drone.move_right(self.sensitivity * 24)
    
    def up(self):
        self.drone.move_up(self.sensitivity * 24)

    def down(self):
        self.drone.move_down(self.sensitivity * 24)
    
    def curve_clockwise(self):
        self.drone.rotate_clockwise(self.sensitivity * 15)
    
    def curve_counter_clockwise(self):
        self.drone.rotate_counter_clockwise(self.sensitivity * 15)

# def send_video_frame(drone:Tello, port:int):
#     frame_read = drone.get_frame_read()
#     img = frame_read.frame
#     _dummy, frame = cv2.imencode('.jpg', cv2.flip(img, 1))
#     # converting the frame to base 64 string
#     b64_str = base64.b64encode(frame).decode()

#     res = post(f'localhost:')

vid = cv2.VideoCapture(0)
count = 0
while (count != 10):
    ret, frame = vid.read()
    retval, buffer = cv2.imencode('.jpg', cv2.flip(frame, 1))
    b64_str = base64.b64encode(buffer).decode()


    headers = {'content-type': 'application/json'}

    res = post(url = 'http://localhost:3000/videoFrame', data = json.dumps({
        'frame': b64_str
    }), headers = headers);

    print(res)
    count+=1
    cv2.imshow('frame', frame)
