import sys
from PyQt5.QtWidgets import QApplication, QWidget, QLabel, QLineEdit


class MiVentana(QWidget):

    def __init__(self, *args, **kwargs):
        """
        Este método inicializa la ventana.
        """
        super().__init__(*args, **kwargs)
        
        # Llamamos a un método propio que inicializa los elementos de la ventana
        self.init_gui()

    def init_gui(self):
        """
        Este método configura la interfaz y todos sus widgets,
        posterior a __init__().
        """
        # Ajustamos la geometría de la ventana y su título
        self.setGeometry(200, 100, 200, 300)
        self.setWindowTitle('Ventana con label y cuadro de texto')
        
        # Agregamos etiquetas usando el widget QLabel(texto_inicial, padre)
        self.label1 = QLabel('Texto:', self)
        self.label1.move(10, 15)

        self.label2 = QLabel('Esta etiqueta es variable', self)
        self.label2.move(10, 50)

        # Agregamos cuadros de texto mediante QLineEdit(texto_inicial, padre)
        self.edit = QLineEdit('', self)
        self.edit.setGeometry(45, 15, 100, 20)

        # Una vez que fueron agregados todos los elementos a la ventana la
        # desplegamos en pantalla
        self.show()


if __name__ == '__main__':
    """
    Recordar que en el programa principal debe existir una instancia de
    QApplication ANTES de crear los demas widgets, incluida la ventana
    principal.
    Si la aplicación no recibe parámetros desde la línea de comandos,
    QApplication recibe una lista vacia como QApplication([]).
    """

    app = QApplication([])
    form = MiVentana()
    sys.exit(app.exec_())