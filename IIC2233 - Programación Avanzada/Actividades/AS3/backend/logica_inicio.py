from PyQt5.QtCore import QObject, pyqtSignal

import parametros as p


class LogicaInicio(QObject):

    senal_respuesta_validacion = pyqtSignal(tuple)
    senal_abrir_juego = pyqtSignal(str)

    def __init__(self):
        super().__init__()

    def comprobar_contrasena(self, credenciales):
        resulto = False
        usuario = credenciales[0]
        clave = credenciales[1]
        password = clave.lower()
        clavearevisar = p.CONTRASENA.lower()

        if password == clavearevisar:
            self.senal_abrir_juego.emit(usuario)
            resulto = True
        self.senal_respuesta_validacion.emit((usuario,resulto))
