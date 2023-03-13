import os
from PyQt5 import uic
from PyQt5.QtCore import QRect, pyqtSignal
from PyQt5.QtGui import QIcon, QPixmap, QFont, QTransform
from PyQt5.QtWidgets import QLabel, QMessageBox, QPushButton
import parametros as p

window_name_main, base_class_main = uic.loadUiType(p.RUTA_MENU_RESUMEN)


# COMPLETAR:
class VentanaResumen(window_name_main, base_class_main):

    senal_siguiente_nivel = pyqtSignal()
    senal_tienda = pyqtSignal()
    senal_ranking =pyqtSignal(dict)
    senal_ventana_ranking = pyqtSignal()

    def __init__(self):
        super().__init__()
        self.setupUi(self)
        self.init_gui()

    def mostrar_ventana(self):
        self.show()

    def actualizar_ventana(self,dict):
        self.casilla_nivel.setText(str(dict['nivel']))
        self.casilla_puntaje.setText(str(dict["puntajetotal"]))
        self.casilla_puntaje_nivel.setText(str(dict['puntajenivel']))
        self.casilla_vidas.setText(str(dict['vidas']))
        self.casilla_monedas.setText(str(dict['monedas']))
        if dict['segundos'] > 0 and dict['vidas'] > 0:
            self.casilla_seguir_jugando.setText("Puedes seguir")
            self.boton_ranking.hide()
        elif dict['segundos'] <= 0:
            self.casilla_seguir_jugando.setText("No puedes seguir, se te acabó el tiempo")
            self.boton_siguiente_nivel.hide()
            self.boton_ranking.show()
            self.mandar_ranking(dict)
        else:
            self.casilla_seguir_jugando.setText("No puedes seguir, se te acabaron las vidas")
            self.boton_siguiente_nivel.hide()
            self.boton_ranking.show()
            self.mandar_ranking(dict)
    
    def mandar_ranking(self, dict):
        self.senal_ranking.emit(dict)

    def init_gui(self):
        self.setWindowTitle("Ventana de Resumen")
        self.boton_salir.clicked.connect(self.salir)
        self.boton_siguiente_nivel.clicked.connect(self.siguiente_nivel)
        self.boton_tienda.clicked.connect(self.tienda)
        self.boton_ranking.clicked.connect(self.ver_ranking)
    
    def salir(self):
        self.close()

    def ver_ranking(self):
        self.senal_ventana_ranking.emit()
    
    def siguiente_nivel(self):
        self.senal_siguiente_nivel.emit()

    def tienda(self):
        self.senal_tienda.emit()