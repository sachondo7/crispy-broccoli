from PyQt5.QtCore import QObject, pyqtSignal
from PyQt5 import QtMultimedia

import parametros as p


class LogicaInicio(QObject):

    senal_respuesta_validacion = pyqtSignal(tuple)
    senal_abrir_juego = pyqtSignal(str)
    senal_abrir_ranking = pyqtSignal(str)
    senal_usuario = pyqtSignal(str)

    def __init__(self, ruta_cancion):
        super().__init__()
        self.musica = Music(ruta_cancion)
        self.start()
    #comprueba que el usuario sea alfanumerico y cumpla con los caractres minimos y maximos
    def comprobar_usuario(self, tupla):
        boton = tupla[0]
        usuario = tupla[1]
        resulto = False
        alpha = usuario.isalnum()
        if boton == 1:
            if alpha and p.MIN_CARACTERES <= len(usuario) <= p.MAX_CARACTERES:
                resulto = True
                self.senal_abrir_juego.emit(usuario)
        elif boton == 2:
            self.senal_abrir_ranking.emit(usuario)
        self.senal_respuesta_validacion.emit((usuario,resulto))
        if resulto:
            self.senal_usuario.emit(usuario)

    #parte la musica    
    def start(self):
        self.musica.comenzar()

class Music(QObject):

    def __init__(self, cancion):
        super().__init__()
        self.rutacancion = cancion

    def comenzar(self):
            self.cancion = QtMultimedia.QSound(self.rutacancion)
            self.cancion.Loop()
            self.cancion.play()
            pass



