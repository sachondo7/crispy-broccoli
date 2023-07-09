from os import path
from random import randint
from time import sleep

from PyQt5.QtCore import QThread, QTimer, pyqtSignal
from PyQt5.QtGui import QPixmap
from PyQt5.QtWidgets import QLabel, QMainWindow, QApplication


class Comida(QThread):

    actualizar = pyqtSignal(QLabel, int, int)

    def __init__(self, parent, limite_x, limite_y):
        """
        Una Comida es un QThread que movera una imagen de comida
        en una ventana. El __init__ recibe los parametros:
            parent: ventana
            limite_x e limite_y: Los límites rectangulares de la ventana
        """
        super().__init__()

        # Guardamos el path de la imagen que tendrá el Label
        self.ruta_imagen = path.join("img", "food", f"{randint(1, 9)}.png")

        # Creamos el Label y definimos su tamaño
        self.label = QLabel(parent)
        self.label.setGeometry(-50, -50, 50, 50)
        self.label.setPixmap(QPixmap(self.ruta_imagen))
        self.label.setScaledContents(True)
        self.label.setVisible(True)

        # Guardamos los limites de la ventana para que no pueda salirse de ella
        self.limite_x = limite_x
        self.limite_y = limite_y
        # Seteamos la posición inicial y la guardamos para usarla como una property
        self.__posicion = (0, 0)
        self.posicion = (randint(0, limite_x), randint(0, limite_y))

        self.label.show()
        self.start()

    @property
    def posicion(self):
        return self.__posicion

    # Cada vez que se actualicé la posición,
    # se actualiza la posición de la etiqueta
    @posicion.setter
    def posicion(self, valor):
        self.__posicion = valor
        self.actualizar.emit(self.label, *self.posicion)

    def run(self):
        while self.posicion[0] < self.limite_x and self.posicion[1] < self.limite_y:
            sleep(0.1)
            nuevo_x = self.posicion[0] + 1
            nuevo_y = self.posicion[1] + 1
            self.posicion = (nuevo_x, nuevo_y)


class MyWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setGeometry(200, 200, 500, 500)
        self.show()

        # Contador de cuanta comida hemos creado
        self.comida_creada = 0

        # Creamos un Timer que se encargara de crear la comida
        self.timer_crea_comida = QTimer(self)
        self.timer_crea_comida.setInterval(50)
        self.timer_crea_comida.timeout.connect(self.creador_de_comida)
        self.timer_crea_comida.start()

        self.comida = []

    def creador_de_comida(self):
        nueva_comida = Comida(self, self.width(), self.height())
        nueva_comida.actualizar.connect(self.actualizar_label)
        self.comida.append(nueva_comida)
        self.comida_creada += 1
        print(f"Has creado {self.comida_creada} unidades de comida\n")

    def actualizar_label(self, label, x, y):
        label.move(x, y)


if __name__ == '__main__':
    app = QApplication([])
    ex = MyWindow()
    app.exec_()