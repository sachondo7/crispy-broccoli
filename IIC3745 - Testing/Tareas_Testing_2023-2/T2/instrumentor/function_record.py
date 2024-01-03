import time
class FunctionRecord:
    def __init__(self, funName):
        self.functionName = funName
        self.frequency = 0
        self.maxTime = 0
        self.minTime = 0
        self.avgTime = 0
        self.cache = 0
        self.callers = []
        self.times = []
        self.startTimes = []

    def print_report(self):
        print("{:<30} {:<10} {:<10} {:<10} {:<10} {:<10} {:<10}".format(self.functionName, self.frequency,
                                                                         self.avgTime, self.maxTime, self.minTime,
                                                                         self.cache, str(self.callers)))
    def startRecording(self):
        self.startTimes.append(time.time())

    def endRecording(self):
        endTime = time.time()
        startTime = self.startTimes.pop()
        self.times.append(endTime - startTime)
        self.avgTime = round(sum(self.times) / len(self.times),3)
        self.maxTime = round(max(self.times), 3)
        self.minTime = round(min(self.times), 3)