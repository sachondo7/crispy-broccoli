import time
from function_record import *
from abstract_profiler import AbstractProfiler

class Profiler(AbstractProfiler):

    def __init__(self):
        self.records = {}
        self.current_caller = None
        self.callers = []
        self.callers_dict = {}
        self.candidatosCache = {}
        self.candidatosEliminados = []
    
    def get_record(self, functionName):
        if functionName not in self.records:
            self.records[functionName] = FunctionRecord(functionName)
        return self.records[functionName]

    def fun_call_start(self, functionName, args):

        if functionName not in self.candidatosCache and functionName not in self.candidatosEliminados:
            self.candidatosCache[functionName] = {"args": [], "return": []}

        if functionName in self.candidatosCache:
            self.candidatosCache[functionName]["args"].append(args)

            # Make a list with the atribute args of the dict candidatosCache
            argsList = self.candidatosCache[functionName]["args"]

            # Revisar si todas las sublistas de argsList son iguales
            if not all(x == argsList[0] for x in argsList):
                # Si son distintos, se elimina el candidato
                self.candidatosEliminados.append(functionName)
                del self.candidatosCache[functionName]

        record = self.get_record(functionName)
        record.frequency += 1
        record.startRecording()
        
        if self.current_caller != None:
            if functionName not in self.callers_dict:
                self.callers_dict[functionName] = []

            if self.current_caller not in self.callers_dict[functionName]:
                self.callers_dict[functionName].append(self.current_caller)
        
        self.current_caller = functionName
        
        if self.current_caller not in self.callers:
            self.callers.append(functionName)

    def fun_call_end(self, functionName, returnValue):

        if functionName in self.candidatosCache:
            self.candidatosCache[functionName]["return"].append(returnValue)
            returnList = self.candidatosCache[functionName]["return"]
            if not all(x == returnList[0] for x in returnList):
                # Si son distintos, se elimina el candidato
                self.candidatosEliminados.append(functionName)
                del self.candidatosCache[functionName]

        record = self.get_record(functionName)
        record.endRecording()

        if len(self.callers) > 1:
            # Eliminamos la funcion propia de la lista de callers
            _ = self.callers.pop()

            # Si la lista de callers no esta vacia, el caller actual es el ultimo de la lista
            self.current_caller = self.callers[-1]
        else:
            self.current_caller = None
            self.callers = []

            for candidato in self.candidatosCache:
                record = self.get_record(candidato)
                record.cache = 1

        if functionName in self.callers_dict:
            print("callers dict: ", self.callers_dict)
            record.callers = self.callers_dict[functionName]

    # print report
    def print_fun_report(self):
        print("{:<30} {:<10} {:<10} {:<10} {:<10} {:<10} {:<10}".format('fun', 'freq', 'avg', 'max', 'min',
                                                                        'cache', 'callers'))
        for record in self.records.values():
            record.print_report()
