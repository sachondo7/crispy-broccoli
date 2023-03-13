
import sys
import os

from PyQt5.QtWidgets import (QApplication, QWidget, QPushButton, QLabel)
from PyQt5.QtGui import QPixmap
from PyQt5.QtCore import QRect


class MiVentana(QWidget):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.init_gui()

    def init_gui(self):
        self.setGeometry(300, 100, 225, 450)
        self.setMaximumHeight(450)
        self.setMaximumWidth(225)
        self.setWindowTitle('mousePressEvent')

        self.mostrar_azul = True
        self.label_azul = QLabel('AZUL', self)
        self.label_azul.move(0, 0)
        self.label_azul.setGeometry(QRect(0, 0, 225, 225))  # (x, y, height, width)
        ruta_imagen_azul = os.path.join('img', 'colors', 'azul.png')
        self.pixmap_azul = QPixmap(ruta_imagen_azul)
        self.label_azul.setPixmap(self.pixmap_azul)
        self.label_azul.show()

        self.mostrar_verde = True
        self.label_verde = QLabel('VERDE', self)
        self.label_verde.move(0, 0)
        self.label_verde.setGeometry(QRect(0, 225, 225, 225))
        ruta_imagen_verde = os.path.join('img', 'colors', 'verde.png')
        self.pixmap_verde = QPixmap(ruta_imagen_verde)
        self.label_verde.setPixmap(self.pixmap_verde)
        self.label_verde.show()

        self.show()

    def mousePressEvent(self, event):
        if event.y() <= 225:  # Este es el alto del label
            if self.mostrar_azul:
                self.label_azul.hide()
            else:
                self.label_azul.show()
            self.mostrar_azul = not self.mostrar_azul
        else:
            if self.mostrar_verde:
                self.label_verde.hide()
            else:
                self.label_verde.show()
            self.mostrar_verde = not self.mostrar_verde


if __name__ == '__main__':
    app = QApplication([])
    form = MiVentana()
    sys.exit(app.exec_())
