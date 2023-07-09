from PyQt5.QtCore import pyqtSignal
from PyQt5.QtGui import QIcon, QPixmap
from PyQt5.QtWidgets import (
    QWidget, QLabel, QLineEdit, QPushButton, QHBoxLayout, QVBoxLayout,
)

import parametros as p


class VentanaInicio(QWidget):

    senal_enviar_login = pyqtSignal(tuple)


    def __init__(self, tamano_ventana):
        super().__init__()
        self.init_gui(tamano_ventana)

    def init_gui(self, tamano_ventana):
        self.setWindowTitle("Ventana inicio")
        self.setGeometry(tamano_ventana)

        #usuario
        self.usuario = QLabel("Ingrese usuario")
        self.usuario_form = QLineEdit("",self)

        #imagen 
        self.imagen = QLabel(self)
        self.imagen.setPixmap(QPixmap(p.RUTA_VENTANA_JUEGO))
        self.imagen.setMaximumSize(400,400)
        self.imagen.setScaledContents(True)

        #botoniniciar 
        self.ingresar_button = QPushButton("&Iniciar Partida", self)
        self.ingresar_button.clicked.connect(self.enviar_login)

        #botonranking
        self.ranking_button = QPushButton("&Ver Ranking", self)
        self.ranking_button.clicked.connect(self.enviar_ranking)

        #forma 
        hbox = QHBoxLayout()
        hbox.addWidget(self.usuario)
        hbox.addWidget(self.usuario_form)

        #vbox
        vbox = QVBoxLayout()
        vbox.addWidget(self.imagen)
        vbox.addLayout(hbox)
        vbox.addWidget(self.ingresar_button)
        vbox.addWidget(self.ranking_button)
        self.setLayout(vbox)

        self.agregar_estilo()

    def enviar_login(self):
        self.senal_enviar_login.emit((1,self.usuario_form.text()))
    
    def enviar_ranking(self):
        self.senal_enviar_login.emit((2,self.usuario_form.text()))

    def agregar_estilo(self):
        # Acciones y señales
        self.usuario_form.returnPressed.connect(
            lambda: self.ingresar_button.click()) 
            # Permite usar "ENTER" para iniciar sesión
        # Estilo extra
        self.setStyleSheet("background-color: green ")
        self.usuario_form.setStyleSheet("background-color: #000000;"
                                        "border-radius: 5px;"
                                        "color: white")
        self.ranking_button.setStyleSheet("background-color: #000000;"
                                        "border-radius: 5px;"
                                        "color: white")
        self.ingresar_button.setStyleSheet(p.stylesheet_boton)
        self.ranking_button.setStyleSheet(p.stylesheet_boton)

    def recibir_validacion(self, tupla_respuesta):
        if tupla_respuesta[1]:
            self.ocultar()
        else:
            self.usuario_form.setText("")
            self.usuario_form.setPlaceholderText("Usuario ínvalido")

    def mostrar(self):
        self.show()

    def ocultar(self):
        self.hide()
