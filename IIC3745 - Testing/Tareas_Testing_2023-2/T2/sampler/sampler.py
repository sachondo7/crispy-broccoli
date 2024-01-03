from __future__ import print_function
import threading
from time import sleep
import traceback
from sys import _current_frames

class Sampler:
    def __init__(self, tid) -> None:
        self.tid = tid
        self.t = threading.Thread(target=self.sample, args=())
        self.active = True
        self.execution_tree = {}
        
    def start(self):
        self.active = True
        self.t.start()
    
    def stop(self):
        self.active = False
        self.printReport()
        
    def checkTrace(self):
        for thread_id, frames in _current_frames().items():
            if thread_id == self.tid:
                frames = traceback.walk_stack(frames)
                stack = []
                for frame, _ in frames:
                    code = frame.f_code.co_name
                    stack.append((code))  # Store both the function and its unique ID
                stack.reverse()
                return stack
    
    def sample(self):
        while self.active:
            executed = self.checkTrace()
            self.updateExecutionTree(executed)
            sleep(1)

    def updateExecutionTree(self, executed):
        current_node = self.execution_tree
        for func_name in executed:
            if func_name not in current_node:
                current_node[func_name] = {'seconds': 0}  # Create a new node for the function with 'seconds' initialized to 0
            current_node[func_name]['seconds'] += 1  # Increment the 'seconds' attribute
            current_node = current_node[func_name]

    def printReport(self):
        self.printExecutionTree(self.execution_tree)

    def printExecutionTree(self, node, level=0):
        for key, value in node.items():
            if isinstance(value, dict):
                if level == 0:
                    print(f"total ({value['seconds']} seconds)")
                print(f"{'  ' * level}{key} ({value['seconds']} seconds)")
                self.printExecutionTree(value, level + 1)

