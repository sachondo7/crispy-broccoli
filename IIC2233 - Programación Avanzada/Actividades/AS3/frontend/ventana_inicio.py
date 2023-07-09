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
        
        self.setWindowIcon(QIcon(p.RUTA_ICONO))
        self.setWindowTitle("Ventana inicio")
        self.setGeometry(tamano_ventana)

        #usuario
        self.usuario = QLabel("Ingrese usuario")
        self.usuario_form = QLineEdit("",self)

        #clave
        self.clave = QLabel("Ingrese Clave")
        self.clave_form = QLineEdit("",self)
        self.clave_form.setEchoMode(QLineEdit.Password)

        #imagen 
        self.imagen = QLabel(self)
        self.imagen.setPixmap(QPixmap(p.RUTA_LOGO))
        self.imagen.setMaximumSize(400,400)
        self.imagen.setScaledContents(True)

        #boton
        self.ingresar_button = QPushButton("&Ingresar", self)
        self.ingresar_button.clicked.connect(self.enviar_login)

        #forma 
        hbox = QHBoxLayout()
        hbox.addWidget(self.usuario)
        hbox.addWidget(self.usuario_form)
        hbox.addWidget(self.clave)
        hbox.addWidget(self.clave_form)

        #vbox
        vbox = QVBoxLayout()
        vbox.addWidget(self.imagen)
        vbox.addLayout(hbox)
        vbox.addWidget(self.ingresar_button)
        self.setLayout(vbox)

        self.agregar_estilo()


    def enviar_login(self):
        print(self.clave_form)
        self.senal_enviar_login.emit((self.usuario_form.text(),self.clave_form.text()))

    def agregar_estilo(self):
        # Acciones y señales
        self.clave_form.returnPressed.connect(
            lambda: self.ingresar_button.click()
        )  # Permite usar "ENTER" para iniciar sesión

        # Estilo extra
        self.setStyleSheet("background-color: #fdf600")
        self.usuario_form.setStyleSheet("background-color: #000000;"
                                        "border-radius: 5px;"
                                        "color: white")
        self.clave_form.setStyleSheet("background-color: #000000;"
                                      "border-radius: 5px;"
                                      "color: white")
        self.ingresar_button.setStyleSheet(p.stylesheet_boton)

    def recibir_validacion(self, tupla_respuesta):
        if tupla_respuesta[1]:
            self.ocultar()
        else:
            self.clave_form.setText("")
            self.clave_form.setPlaceholderText("Contraseña inválida!")

    def mostrar(self):
        self.show()

    def ocultar(self):
        self.hide()
