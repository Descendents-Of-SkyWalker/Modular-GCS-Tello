from time import sleep
import sys

print(sys.argv)

for i in range(5):
    print("Hello There")
    sleep(1)
    sys.stdout.flush()