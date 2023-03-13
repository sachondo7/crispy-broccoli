import random
from PyQt5.QtCore import QObject, pyqtSignal, QTimer, QRect
from PyQt5.QtGui import QIcon, QPixmap, QFont, QTransform
import parametros as p

#modela el comportamiento de la rana
class Rana(QObject):
    
    senal_actualizar_ventana = pyqtSignal(dict)

    def __init__(self, x, y):
        super().__init__()
        self._x = x 
        self._y = y
        self.limitsup_x = p.MAX_X
        self.limitinf_x = p.MIN_X
        self.limitsup_y = p.MAX_Y
        self.limitinf_y = p.MIN_Y
        self.direccion = "U"
        self.frame = 1
        self.monedas = p.CANTIDAD_MONEDAS
        
    def cambiar_direccion(self, nueva_direccion):
        self.direccion = nueva_direccion
        self.avanzar()

    def avanzar(self):
        if self.direccion == "R":
            delta = (p.VELOCIDAD_CAMINAR, 0)
            self.frame = 3
        elif self.direccion == "L":
            self.frame = 4
            delta = (-1 * p.VELOCIDAD_CAMINAR, 0)
        elif self.direccion == "U":
            self.frame = 1
            delta = (0, -1 * p.VELOCIDAD_CAMINAR)
        else:
            self.frame = 2
            delta = (0, p.VELOCIDAD_CAMINAR)
        choca = self.mover(*delta)
        return choca

    #emite la señal con la nueva info de la rana
    def actualizar_ventana(self):
        info = {'x' : self.x,
		'y' : self.y,
		'direccion' : self.direccion,
        'frame' : self.frame,}
        print(info)
        self.senal_actualizar_ventana.emit(info)

    def mover(self, x, y):
        if x != 0:
            self.x += x
        else:
            self.y += y 

    #setea que la rana no pueda salirse de los bordes
    @property
    def x(self):
        return self._x
    @x.setter
    def x(self,valor):
        choca = False
        if self.limitinf_x < valor  < self.limitsup_x:
            self._x = valor
            self.actualizar_ventana()

    @property
    def y(self):
        return self._y
    @y.setter
    def y(self, valor):
        choca = False
        if self.limitinf_y < valor < self.limitsup_y:
            self._y = valor
            self.actualizar_ventana()
            if valor == 70: 
                self.reiniciar_rana(self.x,self.y)

    def reiniciar_rana(self,x,y):
        if y > 70:
            self.x = p.POS_INICIAL_RANA[0]
            self.y = 390
        else:
            self.x = p.POS_INICIAL_RANA[0]
            self.y = p.POS_INICIAL_RANA[1]

#modela a los troncos y los autos
class Obstaculos(QObject):

    senal_actualizar_auto = pyqtSignal()

    def __init__(self, label, direc, velocidad):
        super().__init__()
        self.direc = direc
        self.label = label
        self._x = 0
        self.velocidad = velocidad
        self.timer = QTimer(self)
        self.timer.setInterval(self.velocidad)
        self.timer.timeout.connect(self.timer_tick)
        self.subtick = 0
        if direc == 2: 
            self.subtick = p.MAX_X
            self._x = p.MAX_X

    def iniciar_auto(self):
        self.timer.start()

    def timer_tick(self): 
        if self.direc == 2: 
            self.subtick += 20
        else: 
            self.subtick -= 20 
        self.mover(self.subtick)
    
    def actualizar_ventana(self):
        self.senal_actualizar_auto.emit()

    def mover(self, x):
        self.x = x

    #setea que si tocan el borde vuelvan a aparecer en el principio
    @property
    def x(self):
        return self._x
    @x.setter
    def x(self,valor):
        choca = False
        if p.MIN_X <= valor  <= p.MAX_X:
            self._x = valor
            self.actualizar_ventana()
        else:
            choca = True
        if valor < p.MIN_X:
            self._x = p.MAX_X
            self.subtick = p.MAX_X
            self.actualizar_ventana()
        elif valor > p.MAX_X:
            self._x = p.MIN_X
            self.subtick = p.MIN_X
            self.actualizar_ventana()
          
#modela los distintos objetos que pueden aparecer.
class Objetos(QObject):

    senal_parametros_objetos = pyqtSignal(list)

    def __init__(self):
        super().__init__()
        self.x = random.randint(p.MIN_X, p.MAX_X)
        self.y = random.randint(p.MIN_Y,p.MAX_Y)
        self.timer = QTimer(self)
        self.timer.setInterval(p.TIEMPO_OBJETOS)
        self.timer.timeout.connect(self.aparecer_objetos)
        self.timer.start()
    
    def aparecer_objetos(self):
        x = random.randint(p.MIN_X, p.MAX_X)
        y = random.randint(p.MIN_Y ,p.MAX_Y)
        while y < 100 and 390 < y < 510:
            y = random.randint(p.MIN_Y ,p.MAX_Y)
        objeto = random.randint(1,4)
        self.senal_parametros_objetos.emit([objeto,x,y])
        
