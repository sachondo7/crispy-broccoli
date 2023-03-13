import sys
from PyQt5.QtWidgets import (QApplication, QWidget, QPushButton)


class MiBoton(QPushButton):
    
    # Recibe dos argumentos extra además de los regulares de QPushButton
    # Un nombre para identificar el botón
    # Una posición para ubicarse en la ventana
    def __init__(self, nombre, pos, *args, **kwargs):
        # Llama al constructor de la clase madre
        super().__init__(*args, **kwargs)
        
        # Asigna el nombre a la instancia
        self.nombre = nombre
        
        # Crea un contador de instancia inicialmente en 0
        self.contador = 0
        
        # Fija su propia geometría
        self.resize(self.sizeHint())
        self.move(*pos)
        
        # La siguiente línea conecta un clic con el método contar
        # Entenderemos mejor esta línea en el siguiente notebook
        self.clicked.connect(self.contar)
        
    # Agregamos comportamiento al botón, aumenta el contador en cada clic
    def contar(self):
        self.contador += 1
        print(f'{self.nombre} apretado {self.contador} veces.')


class MiVentana(QWidget):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.init_gui()

    def init_gui(self):
        # Fija la geometría de la ventana principal
        self.setGeometry(200, 200, 100, 100)
        self.setMaximumHeight(100)
        self.setMaximumWidth(100)
        
        # Instancia dos botones de nuestra clase, con atributos extra
        # de los que QPushButton está acostumbrado: nombre y posición
        self.boton_1 = MiBoton('Botón 1', (0, 20), 'Aprétame', self)
        self.boton_2 = MiBoton('Botón 2', (0, 60), 'Aprétame', self)
        self.show()


if __name__ == '__main__':
    app = QApplication([])
    form = MiVentana()
    sys.exit(app.exec_())