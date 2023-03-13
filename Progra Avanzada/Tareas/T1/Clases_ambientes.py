import time
import parametros
import random
import Clases_tributos
import Clases_arena
import Clases_objetos
import Clases_ambientes
from abc import ABC, abstractmethod

class Ambiente(ABC):
    def __init__(self, nombre, evento1, dano1, evento2, dano2, evento3, dano3):
        self.nombre = nombre
        self.evento1 = evento1
        self.dano1 = dano1
        self.evento2 = evento2
        self.dano2 = dano2
        self.evento3 = evento3
        self.dano3 = dano3

    @abstractmethod
    def calcular_dano(self):
        pass

class Playa(Ambiente):
    def __init__(self, nombre, evento1, dano1, evento2, dano2, evento3, dano3):
        self.VELOCIDAD_VIENTOS_PLAYA = parametros.VELOCIDAD_VIENTOS_PLAYA
        self.HUMEDAD_PLAYA = parametros.HUMEDAD_PLAYA
        super().__init__(nombre, evento1, dano1, evento2, dano2, evento3, dano3)

    def calcular_dano(self, instancia_arena):
        if instancia_arena.ejecutar_evento():
            evento = random.randint(1,3)
            if evento == 1:
                dano_evento = self.dano1
                print(f'Se ejecutó el evento {self.evento1}')
            elif evento == 2:
                dano_evento = self.dano2
                print(f'Se ejecutó el evento {self.evento2}')
            else:
                dano_evento = self.dano3
                print(f'Se ejecutó el evento {self.evento3}')
        else:
            print(f'No ocurrió ningún evento en la arena {self.nombre}')
            dano_evento = 0
        adentro = ((0.4 * self.HUMEDAD_PLAYA) + 0.2 * (self.VELOCIDAD_VIENTOS_PLAYA) + dano_evento) / 5 
        dano_evento = int(max(5,adentro))
        print(f"El ambiente {self.nombre} ejecutó un dano {dano_evento} sobre los tributos")
        return dano_evento
    
class Montana(Ambiente):
    def __init__(self, nombre, evento1, dano1, evento2, dano2, evento3, dano3):
        self.NUBOSIDAD_MONTANA = parametros.NUBOSIDAD_MONTANA
        self.PRECIPITACIONES_MONTANA = parametros.PRECIPITACIONES_MONTANA
        super().__init__(nombre, evento1, dano1, evento2, dano2, evento3, dano3)
        
    def calcular_dano(self, instancia_arena):
        if instancia_arena.ejecutar_evento():
            evento = random.randint(1,3)
            if evento == 1:
                dano_evento = self.dano1
                print(f'Se ejecutó el evento {self.evento1}')
            elif evento == 2:
                dano_evento = self.dano2
                print(f'Se ejecutó el evento {self.evento2}')
            else:
                dano_evento = self.dano3
                print(f'Se ejecutó el evento {self.evento3}')
        else:
            print(f'No ocurrió ningún evento en la arena {self.nombre}')
            dano_evento = 0
        adentro = ((0.3 * self.NUBOSIDAD_MONTANA) + (0.1 * self.PRECIPITACIONES_MONTANA) + dano_evento) / 5
        dano_evento = int(max(5,adentro))
        print(f"El ambiente {self.nombre} ejecutó un dano {dano_evento} sobre los tributos\n")
        return dano_evento

class Bosque(Ambiente):
    def __init__(self, nombre, evento1, dano1, evento2, dano2, evento3, dano3):
        self.PRECIPITACIONES_BOSQUE = parametros.PRECIPITACIONES_BOSQUE
        self.VELOCIDAD_VIENTOS_BOSQUE = parametros.VELOCIDAD_VIENTOS_BOSQUE 
        super().__init__(nombre, evento1, dano1, evento2, dano2, evento3, dano3)

    def calcular_dano(self, instancia_arena):
        if instancia_arena.ejecutar_evento():
            evento = random.randint(1,3)
            if evento == 1:
                dano_evento = self.dano1
                print(f'Se ejecutó el evento {self.evento1}')
            elif evento == 2:
                dano_evento = self.dano2
                print(f'Se ejecutó el evento {self.evento2}')
            else:
                dano_evento = self.dano3
                print(f'Se ejecutó el evento {self.evento1}')
        else: 
            print(f'No ocurrió ningún evento en la arena {self.nombre}')
            dano_evento = 0
        adentro = ((0.1 * self.PRECIPITACIONES_BOSQUE) + (0.2 * self.VELOCIDAD_VIENTOS_BOSQUE) + dano_evento) / 5
        dano_evento = int(max(5,dano_evento))
        print(f"El ambiente {self.nombre} ejecutó un dano {dano_evento} sobre los tributos")
        return dano_evento

    
