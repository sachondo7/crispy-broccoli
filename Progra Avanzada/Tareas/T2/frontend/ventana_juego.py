import os
import sys
from PyQt5.QtWidgets import QApplication

from PyQt5 import uic
from PyQt5.QtCore import QObject, pyqtSignal, QTimer, QRect
from PyQt5.QtGui import QIcon, QPixmap, QFont, QTransform
from PyQt5.QtWidgets import QLabel, QMessageBox, QPushButton
from backend.logica_juego import Obstaculos
import parametros as p
import random


window_name_main, base_class_main = uic.loadUiType(p.RUTA_MENU_JUEGO)


# COMPLETAR:
class VentanaJuego(window_name_main, base_class_main):

    senal_iniciar_juego = pyqtSignal()
    senal_tecla = pyqtSignal(str)
    senal_volver = pyqtSignal()
    senal_pasar_menu_resumen = pyqtSignal(dict)
    senal_colisiones = pyqtSignal(list)
    senal_perder = pyqtSignal()
    senal_reiniciar_rana = pyqtSignal(int,int)

    def __init__(self):
        super().__init__()
        self.setupUi(self)
        self.puntaje_obtenido = 0 
        self.init_gui()
        self.combinacion_teclas = set()

    #fija los parámetros iniciales
    def init_gui(self):
        self.setWindowTitle("Ventana de Juego")
        self.boton_salir.clicked.connect(self.senal_volver.emit)
        self.lista_instancia_autos = []
        self.lista_instancia_troncos = []
        self.frame_objeto = ''
        self.tiempo_actual = p.DURACION_RONDA_INICIAL
        self.velocidad_actual_autos = p.VELOCIDAD_AUTOS
        self.velocidad_actual_troncos = p.VELOCIDAD_TRONCOS
        self.nivel_actual = 1
        self.puntaje_total = 0
        self.puntaje_obtenido = 0 
        self.vidas = p.VIDAS_INICIO
        self.monedas = p.CANTIDAD_MONEDAS
        self.timer1 = QTimer()
        self.timer1.timeout.connect(self.actualizar_tiempo)
        self.timer1.start(1000)
        self.objeto_label = QLabel("", self)
        self.crear_obstaculos()

    #crea los troncos y los autos
    def crear_obstaculos(self):
        for i in range(6): 
            direccion = random.randint(1,2)
            self.lista_instancia_autos.append(Obstaculos(self.iniciar_autos(direccion),
            direccion, self.velocidad_actual_autos))
        x,y = (0 , 110)
        cont = 0
        for i in self.lista_instancia_autos:
            if i.direc == 2:
                i.label.move(p.MAX_X,y)
            else:
                i.label.move(x,y)
            y += 40
            cont += 1
            if cont ==3 :
                y += 40 
        for i in self.lista_instancia_autos:
            self.senal_iniciar_juego.connect(i.iniciar_auto)
            i.senal_actualizar_auto.connect(self.actualizar_auto)
        y += 40
        direccion_tronco1 = random.randint(1,2)
        if direccion_tronco1 == 1:
            a = self.iniciar_tronco(1)
            self.lista_instancia_troncos.append(Obstaculos(a,
            1, self.velocidad_actual_troncos))
            b = self.iniciar_tronco(2)
            c = self.iniciar_tronco(1)
            self.lista_instancia_troncos.append(Obstaculos(b,
            2, self.velocidad_actual_troncos))
            self.lista_instancia_troncos.append(Obstaculos(c,
            1, self.velocidad_actual_troncos))
        else:
            a =self.iniciar_tronco(2)
            b =self.iniciar_tronco(1)
            c = self.iniciar_tronco(2)
            self.lista_instancia_troncos.append(Obstaculos(a,
            2, self.velocidad_actual_troncos))
            self.lista_instancia_troncos.append(Obstaculos(b,
            1, self.velocidad_actual_troncos))
            self.lista_instancia_troncos.append(Obstaculos(c,
            2, self.velocidad_actual_troncos))
        for i in self.lista_instancia_troncos:
            i.label.move(x,y)
            y += 40
            self.senal_iniciar_juego.connect(i.iniciar_auto)
            i.senal_actualizar_auto.connect(self.actualizar_tronco)
        self.iniciar_rana()
    
    #va actualizando el tiempo restante
    def actualizar_tiempo(self):
        if 1 <= self.tiempo_actual <= 60:
            self.tiempo_actual -= 1
            self.casilla_tiempo.setText(str(self.tiempo_actual))
        if self.tiempo_actual == 0:
            self.senal_perder.emit()
            self.actualizar_menu_resumen()

    #actualiza los objetos con sus frames y posiciones
    def actualizar_objetos(self, parametros):
        if parametros[0] == 1:
            self.pixeles_objeto = QPixmap(p.RUTA_CALAVERA)
            self.frame_objeto = "calavera"
        elif parametros[0] == 2:
            self.pixeles_objeto = QPixmap(p.RUTA_CORAZON)
            self.frame_objeto = "corazon"
        elif parametros[0] == 3:
            self.pixeles_objeto = QPixmap(p.RUTA_MONEDA)
            self.frame_objeto = "moneda"
        else:
            self.pixeles_objeto = QPixmap(p.RUTA_RELOJ)
            self.frame_objeto = 'reloj'
        self.objeto_label.setPixmap(self.pixeles_objeto)
        self.objeto_label.setScaledContents(True)
        self.objeto_label.resize(p.WIDTH_OBJETO, p.HEIGHT_OBJETO)
        self.objeto_label.move(parametros[1],parametros[2])

    #muestra la ventana
    def mostrar_ventana(self):
        self.show()
        self.actualizar_atributos()
        self.boton_salir.clicked.connect(self.senal_volver.emit)
        self.senal_iniciar_juego.emit()

    #actualiza los labels de la ventana
    def actualizar_atributos(self):
        self.casilla_vidas.setText(str(self.vidas))
        self.casilla_tiempo.setText(str(self.tiempo_actual))
        self.casilla_monedas.setText(str(self.monedas))
        self.casilla_nivel.setText(str(int(self.nivel_actual)))
        self.casilla_puntaje.setText(str(self.puntaje_total))

    #emite la tecla presionada
    def keyPressEvent(self, event):
        if event.text() == p.TECLA_ARRIBA:
            self.senal_tecla.emit("U")
        elif event.text() == p.TECLA_IZQUIERDA:
            self.senal_tecla.emit("L")
        elif event.text() == p.TECLA_ABAJO:
            self.senal_tecla.emit("D")
        elif event.text() == p.TECLA_DERECHA:
            self.senal_tecla.emit("R")
        self.colision_objeto()
    #crea una rana
    def iniciar_rana(self):
        self.rana_label = QLabel("", self)
        self.pixeles_rana = QPixmap(p.RUTA_ARRIBA)
        self.rana_label.setPixmap(self.pixeles_rana)
        self.rana_label.setScaledContents(True)
        self.rana_label.resize(p.WIDTH_RANA, p.HEIGHT_RANA)
        self.direccion = {"R": 180, "L": 0, "U": 90, "D": 270}
        self.rana_label.move(*p.POS_INICIAL_RANA)
    #inicia los autos y su movimiento
    def iniciar_autos(self, dir):
        self.auto_label = QLabel("", self)
        if dir == 1:
            self.auto_frame = 1
            self.pixeles_auto = QPixmap(p.RUTA_AUTO_LEFT)
        else: 
            self.auto_frame = 2
            self.pixeles_auto = QPixmap(p.RUTA_AUTO_RIGHT)
        self.auto_label.setPixmap(self.pixeles_auto)
        self.auto_label.setScaledContents(True)
        self.auto_label.resize(p.WIDTH_ELEMENTO, p.HEIGHT_ELEMENTO)
        return self.auto_label
    #inicia los troncos y su movimiento
    def iniciar_tronco(self, dir):
        self.tronco_label = QLabel("", self)
        self.pixeles_tronco = QPixmap(p.RUTA_TRONCO)
        self.tronco_label.setPixmap(self.pixeles_tronco)
        self.tronco_label.setScaledContents(True)
        self.tronco_label.resize(p.WIDTH_ELEMENTO, p.HEIGHT_ELEMENTO)
        return self.tronco_label
    #oculta la ventana
    def ocultar(self):
        self.hide()
    #actualiza la ventana y a la rana
    def actualizar_ventana(self, dic):
        self.frame = dic["frame"]
        self.casilla_vidas.setText(str(self.vidas))
        self.casilla_tiempo.setText(str(self.tiempo_actual))
        self.casilla_monedas.setText(str(self.monedas))
        self.casilla_nivel.setText(str(int(self.nivel_actual)))
        self.casilla_puntaje.setText(str(self.puntaje_obtenido))
        if self.frame == 1:
            self.pixeles_rana = QPixmap(p.RUTA_ARRIBA)
        elif self.frame ==2:
            self.pixeles_rana = QPixmap(p.RUTA_ABAJO)
        elif self.frame == 3:
            self.pixeles_rana = QPixmap(p.RUTA_RIGHT)
        else:
            self.pixeles_rana = QPixmap(p.RUTA_LEFT)
        self.rana_label.setPixmap(self.pixeles_rana)
        self.rana_label.setScaledContents(True)
        self.rana_label.resize(p.WIDTH_RANA, p.HEIGHT_RANA)
        self.rana_label.move(dic['x'],dic['y'])
        if dic['y'] == 70: 
            self.rana_label.move(*p.POS_INICIAL_RANA)
            self.nivel_actual += 0.5 
            for i in self.lista_instancia_troncos:
                i.label.hide()
            for i in self.lista_instancia_autos:
                i.label.hide()
            self.rana_label.hide()
            self.lista_instancia_autos = []
            self.lista_instancia_troncos = []
            self.velocidad_actual_troncos = self.velocidad_actual_troncos * (p.PONDERADOR_DIFICULTAD+1)/2
            self.velocidad_actual_autos = self.velocidad_actual_autos * (p.PONDERADOR_DIFICULTAD+1)/2
            self.actualizar_puntajes()
            self.crear_obstaculos()
            self.actualizar_menu_resumen()
    #va actualizando los puntajes
    def actualizar_puntajes(self): 
        self.puntaje_obtenido = int((self.vidas * 100 + self.tiempo_actual * 50) * self.nivel_actual)
        self.puntaje_total += int(self.puntaje_obtenido)

    #emite la señal con la info a poner en el menú resumen
    def actualizar_menu_resumen(self):
        info = {'nivel' : int(self.nivel_actual),
		'puntajetotal' : self.puntaje_total,
		'puntajenivel' : self.puntaje_obtenido,
        'vidas' : self.vidas,
		'monedas' : self.monedas,
        'segundos' : self.tiempo_actual}
        self.senal_pasar_menu_resumen.emit(info)

    #mueve el auto 
    def actualizar_auto(self):
        for i in self.lista_instancia_autos:
            i.label.move(i.x, i.label.y())
            self.colision_auto(i.x, i.label.y())

    #mueve el tronco
    def actualizar_tronco(self):
        for i in self.lista_instancia_troncos:
            i.label.move(i.x, i.label.y())
    #revisa las colisiones con los autos
    def colision_auto(self, x, y):
        if x <= self.rana_label.x() <= x + 70 and y == self.rana_label.y():
            self.vidas -= 1
            if self.vidas < 1:
                self.senal_perder.emit()
                self.actualizar_menu_resumen()
            self.actualizar_atributos()
            if self.rana_label.y() > 70:
                self.rana_label.move(300,390)
            else:
                self.rana_label.move(*p.POS_INICIAL_RANA)
            self.senal_reiniciar_rana.emit(self.rana_label.x(),self.rana_label.y())
    #revisa colisiones con los objetos     
    def colision_objeto(self):
        if self.objeto_label.x() <= self.rana_label.x() <= self.objeto_label.x() + 40 and self.objeto_label.y() <= self.rana_label.y() <= self.objeto_label.y() + 40:
            print("chocaste con un objeto")
            if self.frame_objeto == 'moneda':
                self.monedas += 1 
            elif self.frame_objeto == "calavera":
                self.velocidad_actual_troncos = self.velocidad_actual_troncos*1.05  
            elif self.frame_objeto == 'reloj':
                self.tiempo_actual += int(10 * ((self.tiempo_actual)/ p.DURACION_RONDA_INICIAL))
            else:
                self.vidas += 1 
            self.actualizar_atributos()
        
        

