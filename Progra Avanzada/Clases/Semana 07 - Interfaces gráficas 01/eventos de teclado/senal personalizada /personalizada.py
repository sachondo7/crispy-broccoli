import sys
from PyQt5.QtCore import (QObject, pyqtSignal)
from PyQt5.QtWidgets import (QApplication, QWidget, QLabel)


class MiSenal(QObject):
    """
    Esta clase contiene la señal que permite la comunicación entre
    elementos de la GUI.
    """
    senal = pyqtSignal()


class VentanaPresionable(QWidget):

    def __init__(self, senal_escribir):
        super().__init__()

        self.senal_escribir = senal_escribir

        self.inicializa_gui()

    def inicializa_gui(self):
        self.etiqueta = QLabel('Presiona esta ventana', self)
        self.etiqueta.move(20, 10)
        self.etiqueta.resize(self.etiqueta.sizeHint())

        self.setGeometry(300, 300, 290, 150)
        self.setWindowTitle('Emite señal')
        self.show()

    def mousePressEvent(self, event):
        # Al ejecutar la siguiente línea, se emite la señal,
        # y los métodos conectados se llamarán automáticamente.
        self.senal_escribir.emit()


class VentanaQueSeEdita(QWidget):

    def __init__(self, senal_editar):
        super().__init__()

        self.senal_editar = senal_editar
        # Conectamos el método encargado de ejecutar la tarea
        self.senal_editar.connect(self.edita_etiqueta)

        self.inicializa_gui()

    def inicializa_gui(self):

        self.etiqueta = QLabel('', self)
        self.etiqueta.move(20, 10)
        self.etiqueta.resize(self.etiqueta.sizeHint())

        self.setGeometry(700, 300, 290, 150)
        self.setWindowTitle('Recibe señal')
        self.show()

    def edita_etiqueta(self):
        self.etiqueta.setText('¡Oh! Alguien ha presionado el mouse')
        self.etiqueta.resize(self.etiqueta.sizeHint())


if __name__ == '__main__':
    app = QApplication([])
    senal = MiSenal()
    ventana_1 = VentanaPresionable(senal.senal)
    ventana_2 = VentanaQueSeEdita(senal.senal)
    sys.exit(app.exec_())