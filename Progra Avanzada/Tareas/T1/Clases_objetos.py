import time
import parametros
import random
from abc import ABC, abstractmethod

class Objeto(ABC):
    def __init__(self, nombre, tipo, peso):
        self.nombre = nombre
        self.tipo = tipo
        self.peso = peso

    @abstractmethod
    def dar_beneficio(self):
        pass

class Consumible(Objeto):
    def __init__(self, nombre, tipo, peso):
        super().__init__(nombre, tipo, peso)

    def dar_beneficio(self, tributo):
        beneficio = parametros.AUMENTAR_ENERGIA
        tributo.energia += beneficio
        print(f'La energia de {tributo.nombre} aumentó a {int(tributo.energia)}')
        return tributo

class Arma(Objeto):
    def __init__(self, nombre, tipo, peso):
        super().__init__(nombre, tipo, peso)

    def dar_beneficio(self, tributo, arena):
        beneficio = tributo.fuerza * ((parametros.PONDERADOR_AUMENTAR_FUERZA * arena.riesgo) + 1)
        tributo.fuerza += beneficio
        print(f'La fuerza de {tributo.nombre} aumentó a {int(tributo.fuerza)}')
        return tributo

class Especial(Arma,Consumible):
    def __init__(self, nombre, tipo, peso):
        super().__init__(nombre, tipo, peso)
    def dar_beneficio(self, tributo, arena):
        beneficio1 = parametros.AUMENTAR_INGENIO
        tributo.ingenio += beneficio1
        print(f'El ingenio de {tributo.nombre} aumentó a {int(tributo.ingenio)}')
        beneficio2 = parametros.AUMENTAR_AGILIDAD
        tributo.agilidad += beneficio2
        print(f'La agilidad de {tributo.nombre} aumentó a {int(tributo.agilidad)}')
        beneficio3 = tributo.fuerza * ((parametros.PONDERADOR_AUMENTAR_FUERZA * arena.riesgo) + 1)
        tributo.fuerza += beneficio3
        print(f'La fuerza de {tributo.nombre} aumentó a {int(tributo.fuerza)}')
        beneficio4 = parametros.AUMENTAR_ENERGIA
        tributo.energia += beneficio4
        print(f'La energia de {tributo.nombre} aumentó a {int(tributo.energia)}')
        return tributo
    