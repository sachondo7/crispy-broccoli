simport sys
from PyQt5.QtWidgets import QApplication, QWidget, QPushButton
from PyQt5.QtCore import pyqtSignal


class Ventana(QWidget):
    
    # Cada ventana se instancia con una señal para ser abierta
    senal_abrir_ventana = pyqtSignal()
    
    def __init__(self, titulo, x, y):
        super().__init__()
        # Definimos lo básico de la ventana
        self.setWindowTitle(titulo)
        self.setGeometry(x, y, 200, 50)
        
        # La señal que le permite a esta ventana abrirse, 
        # se conecta a su propio show. Así, si alguien
        # emite la señal, esta ventana se mostrará
        self.senal_abrir_ventana.connect(self.show)
        
        # Definimos el atributo de instancia que contendría una
        # señal para abrir otra ventana, comienza como None
        self.senal_abrir_otra_ventana = None
        
        # Creamos botón que se conecta a método self.abrir_otra_ventana
        self.boton = QPushButton("Abrir otra ventana", self)
        self.boton.clicked.connect(self.abrir_otra_ventana)

    def abrir_otra_ventana(self):
        # Si tenemos una señal asociada para abrir otra ventana
        if self.senal_abrir_otra_ventana:
            # Ocultamos esta ventana y emitimos la señal para abrir otra
            self.hide()
            self.senal_abrir_otra_ventana.emit()


if __name__ == '__main__':
    app = QApplication([])
    
    # Instanciamos dos ventanas distintas
    # Cada una comienza con una señal propia que
    # le permite ser abierta por otra.
    ventana_1 = Ventana("Inicial", 100, 100)
    ventana_2 = Ventana("Alternativa", 500, 100)
    
    # Conectamos las señales correspondientes:
    # ventana 1 tiene acceso a la señal de ventana 2
    # Ahora ventana 2 puede ser abierta desde ventana 1
    ventana_1.senal_abrir_otra_ventana = ventana_2.senal_abrir_ventana
    
    # Con esta también vinculamos a ventana 1 desde ventana 2
    ventana_2.senal_abrir_otra_ventana = ventana_1.senal_abrir_ventana
    
    ventana_1.show()
    sys.exit(app.exec_())
