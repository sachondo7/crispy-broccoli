import sys
from PyQt5.QtCore import pyqtSignal
from PyQt5.QtWidgets import (QApplication, QWidget, QLabel, QPushButton, QLineEdit)
from procesador import Procesador


class Ventana(QWidget):

    senal_actualizar = pyqtSignal(str)

    def __init__(self):
        super().__init__()
        self.inicializa_gui()
        self.senal_actualizar.connect(self.actualizar_resultado)
        self.senal_procesar = None

    def inicializa_gui(self):

        self.etiqueta = QLabel('Ingresa una lista de números separados por comas:', self)
        self.etiqueta.move(20, 10)
        self.etiqueta.resize(self.etiqueta.sizeHint())

        self.input = QLineEdit('', self)
        self.input.setGeometry(20, 40, 360, 20)

        self.boton = QPushButton('Ordenar', self)
        self.boton.setGeometry(20, 70, 360, 30)
        self.boton.clicked.connect(self.boton_clickeado)

        self.resultado = QLabel('', self)
        self.resultado.move(20, 100)
        self.resultado.resize(self.resultado.sizeHint())

        self.setGeometry(700, 300, 400, 150)
        self.setWindowTitle('Ordenador de números')
        self.show()

    def boton_clickeado(self):
        if self.senal_procesar:
            texto_input = self.input.text()
            self.senal_procesar.emit(texto_input)

    def actualizar_resultado(self, texto):
        self.resultado.setText(texto)
        self.resultado.resize(self.resultado.sizeHint())
        self.resultado.repaint()


if __name__ == '__main__':
    app = QApplication([])
    procesador = Procesador()
    ventana = Ventana()
    procesador.senal_actualizar = ventana.senal_actualizar
    ventana.senal_procesar = procesador.senal_procesar
    sys.exit(app.exec_())