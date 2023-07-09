from random import randint
from time import sleep
from pedido import Pedido
from shopper import Shopper
from threading import Thread


class DCComidApp(Thread):

    def __init__(self, shoppers, tiendas, pedidos):
        # NO MODIFICAR
        super().__init__()
        self.shoppers = shoppers
        self.pedidos = pedidos
        self.tiendas = tiendas

    def obtener_shopper(self):
        for instancia in self.shoppers:
            if instancia.pedido_actual == None:
                return instancia.ocupado
        print(f"todos los shoppers estan ocupados")
        self.shoppers.evento_disponible.wait()
        print(f"se desocupó un shopper")
        self.obtener_shopper

        # Completar
        pass

    def run(self):
        pedido = self.pedidos.pop(0)
        # Completar
        pass


if __name__ == '__main__':
    pass
