from PyQt5.QtCore import pyqtSignal
from PyQt5.QtGui import QIcon, QPixmap
from PyQt5.QtWidgets import (
    QWidget, QLabel, QLineEdit, QPushButton, QHBoxLayout, QVBoxLayout,
)
from PyQt5 import uic
import parametros as p


window_name_main, base_class_main = uic.loadUiType(p.RUTA_MENU_RANKING)


# COMPLETAR:
class VentanaRanking(window_name_main, base_class_main):

    senal_volver = pyqtSignal()
    senal_ordenar_ranking = pyqtSignal()

    def __init__(self):
        super().__init__()
        self.setupUi(self)
        self.init_gui()
        # COMPLETAR

    def mostrar_ventana(self):
        self.show()
        self.boton_volver.clicked.connect(self.senal_volver.emit)
        self.senal_ordenar_ranking.emit()
    
    def init_gui(self):
        self.setWindowTitle("Ventana Ranking")
        self.boton_volver.clicked.connect(self.senal_volver.emit)
    
    def actualizar_ventana(self, list):    
        self.text_usuario_1.setText(list[0][0])
        self.text_puntaje_1.setText(str(list[0][1]))
        self.text_usuario_2.setText(list[1][0])
        self.text_puntaje_2.setText(str(list[1][1]))
        self.text_usuario_3.setText(list[2][0])
        self.text_puntaje_3.setText(str(list[2][1]))
        self.text_usuario_4.setText(list[3][0])
        self.text_puntaje_4.setText(str(list[3][1]))
        self.text_usuario_5.setText(list[4][0])
        self.text_puntaje_5.setText(str(list[4][1]))

    def ocultar(self):
        self.hide()
