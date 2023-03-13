from PyQt5.QtCore import QObject, pyqtSignal

import parametros as p

class LogicaResumen(QObject):

    senal_volver = pyqtSignal()

    def __init__(self):
        super().__init__()
    
    def volver(self):
        self.senal_volver.emit()