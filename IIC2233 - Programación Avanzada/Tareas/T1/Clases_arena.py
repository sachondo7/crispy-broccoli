import time
import parametros
import random
from abc import ABC, abstractmethod

class Arena():
    def __init__(self , riesgo, dificultad, jugador, tributos, ambientes):
        self.riesgo = riesgo
        self.dificultad = dificultad
        self.jugador = jugador
        self.tributos = tributos
        self.ambientes = ambientes

    def ejecutar_evento(self):
        probabilidad = parametros.PROBABILIDAD_EVENTO
        numero = random.randint(0,100)
        if probabilidad >= numero:
            return True
        else:
            return False 

    #aquí tributos restantes corresponde a la lista con las intancias
    #de todos_tributos en main.py
    def encuentros(self, mi_tributo, tributos_restantes):
        totalestributos= len(tributos_restantes)
        self.riesgo = float(self.riesgo)
        n_encuentros = int((self.riesgo * totalestributos) // 2)
        print(n_encuentros)
        for i in range(n_encuentros):
            ataca = random.randint(0,totalestributos-1)
            recibe = random.randint(0,totalestributos-1)
            while ataca == recibe or tributos_restantes[ataca] == mi_tributo:
                ataca = random.randint(0,totalestributos-1)
                recibe = random.randint(0,totalestributos-1)
            dano = tributos_restantes[ataca].atacar()
            tributos_restantes[recibe].vida -= dano
            print(f'El tributo {tributos_restantes[ataca].nombre} atacó al tributo {tributos_restantes[recibe].nombre}')
            print(f"la vida restante de {tributos_restantes[recibe].nombre} es {tributos_restantes[recibe].vida}\n")
            
                







