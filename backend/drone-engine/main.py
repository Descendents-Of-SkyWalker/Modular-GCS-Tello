import drone_helpers
import argparse

parser = argparse.ArgumentParser()

parser.add_argument('-s','--speed', help = 'set the speed of the drone', type=int)
parser.add_argument('-ms','--movement_sensitivity', help = 'set the sensitivity of movement of the drone', type=int)
parser.add_argument('-rs','--turn_sensitivity', help = 'set the sensitivity of rotation of the drone', type=int)
parser.add_argument('--port', help = 'set the port on which the drone will report its data onto', type = int)

args = parser.parse_args()

print(args)

# def main():
#     drone, frame_end_point = drone_helpers.initialize()