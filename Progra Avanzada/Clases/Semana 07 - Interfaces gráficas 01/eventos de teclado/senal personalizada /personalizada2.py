import sys
from PyQt5.QtCore import (QObject, pyqtSignal)
from PyQt5.QtWidgets import (QApplication, QWidget, QLabel)


class MisSenales(QObject):
    """
    Esta clase contiene las señales que permite la comunicación entre
    elementos de la GUI.
    """
    senal_simple = pyqtSignal() # Señal simple
    senal_texto = pyqtSignal(str) # Señal que permite enviar texto
    senal_coordenadas = pyqtSignal(int, int) # Señal que permite enviar dos ints


class VentanaPresionable(QWidget):

    def __init__(self, senal_simple, senal_texto, senal_coor):
        super().__init__()
        # Se guarda referencia a todas las señales que puede emitir esta ventana
        self.senal_simple = senal_simple
        self.senal_texto = senal_texto
        self.senal_coor = senal_coor

        self.inicializa_gui()

    def inicializa_gui(self):
        self.etiqueta = QLabel('Texto etiqueta', self)
        self.etiqueta.move(20, 10)
        self.etiqueta.resize(self.etiqueta.sizeHint())

        self.setGeometry(300, 300, 290, 150)
        self.setWindowTitle('Emite señal')
        self.setMouseTracking(True)
        self.show()

    def mousePressEvent(self, event):
        # Se emite la señal simple, sin argumento
        self.senal_simple.emit()
        # Se emite la señal que permite envir un str
        # Se envia el contenido de la etiqueta de la ventana
        self.senal_texto.emit(self.etiqueta.text())

    def mouseMoveEvent(self, event):
        # Se emite la señal que permite enviar dos ints, enviamos la posición del mouse
        self.senal_coor.emit(event.pos().x(), event.pos().y())


class VentanaQueSeEdita(QWidget):

    def __init__(self, senal_simple, senal_texto, senal_coor):
        super().__init__()

        self.senal_simple = senal_simple
        self.senal_texto = senal_texto
        self.senal_coor = senal_coor
        # Conectamos los métodos de respuesta de cada señal
        self.senal_simple.connect(self.edita_etiqueta_1)
        self.senal_texto.connect(self.edita_etiqueta_2)
        self.senal_coor.connect(self.edita_etiqueta_3)

        self.inicializa_gui()

    def inicializa_gui(self):

        self.etiqueta_1 = QLabel('', self)
        self.etiqueta_1.move(20, 10)
        self.etiqueta_1.resize(self.etiqueta_1.sizeHint())

        self.etiqueta_2 = QLabel('', self)
        self.etiqueta_2.move(20, 40)
        self.etiqueta_2.resize(self.etiqueta_2.sizeHint())

        self.etiqueta_3 = QLabel('', self)
        self.etiqueta_3.move(20, 70)
        self.etiqueta_3.resize(self.etiqueta_3.sizeHint())

        self.setGeometry(700, 300, 290, 150)
        self.setWindowTitle('Recibe señal')
        self.show()
    
    def edita_etiqueta_1(self):
        # Este método no tiene argumentos, ya que es una señal simple
        self.etiqueta_1.setText('¡Oh! Alguien ha presionado el mouse')
        self.etiqueta_1.resize(self.etiqueta_1.sizeHint())

    def edita_etiqueta_2(self, texto):
        # Este método tiene un argumento, el str que se espera del evento conectado
        self.etiqueta_2.setText(f'Recibí del evento: {texto}')
        self.etiqueta_2.resize(self.etiqueta_2.sizeHint())

    def edita_etiqueta_3(self, x, y):
        # Este método tiene dos argumentos, los ints que se espera del evento conectado
        self.etiqueta_3.setText(f'Recibí posiciones: {x}, {y}')
        self.etiqueta_3.resize(self.etiqueta_3.sizeHint())


if __name__ == '__main__':
    app = QApplication([])
    senales = MisSenales()
    ventana_1 = VentanaPresionable(senales.senal_simple, senales.senal_texto, senales.senal_coordenadas)
    ventana_2 = VentanaQueSeEdita(senales.senal_simple, senales.senal_texto, senales.senal_coordenadas)
    sys.exit(app.exec_())