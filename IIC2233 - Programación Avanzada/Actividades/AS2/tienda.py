from pedido import Pedido
from threading import Thread, Lock
from time import sleep
from random import randint


class Tienda(Thread):
    def __init__(self, nombre):
        # NO MODIFICAR
        super().__init__()
        self.nombre = nombre
        self.cola_pedidos = []
        self.abierta = True
        self.lock_global = Lock()
        # COMPLETAR DESDE AQUI

    def ingresar_pedido(self, pedido, shopper):
        # Completar
        self.lock_global.acquire()
        tupla = (pedido,shopper)
        self.cola_pedidos.append(tupla)
        self.lock_global.release()

    def preparar_pedido(self, pedido):
        tiempo = randint(1,10)
        print(f"se demorará {tiempo} tiempo")
        sleep(tiempo)
        print("Esta listo")
        # Completar

    def run(self):
        if self.cola_pedidos != []:
            popped = self.cola_pedidos.pop([0][0])
            self.preparar_pedido(popped)
            popped.evento_pedido_listo.set()
            popped.evento_llego_repartidor.wait()
            #imprimir cuando lleguee
        else: 
            descanso = randint(1,5)
            sleep(descanso)
            print(f"se tomo un descanso de {descanso} minutos")

        # Completar
        pass
