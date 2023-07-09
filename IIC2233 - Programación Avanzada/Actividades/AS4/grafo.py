from collections import deque


class NodoGrafo:
    def __init__(self, usuario):
        # No modificar
        self.usuario = usuario
        self.amistades = None

    def formar_amistad(self, nueva_amistad):
        nueva_amistad.amistades.append(self)
        self.amistades.append(nueva_amistad)
        

    def eliminar_amistad(self, ex_amistad):
        ex_amistad.amistades.remove(self)
        self.amistades.remove(ex_amistad)



def recomendar_amistades(nodo_inicial, profundidad):
    cola = deque([nodo_inicial])
    while len(cola) > 0 and profundidad >0:
        vert = cola.popleft()
        for nodo in nodo_inicial[vert]:
            cola.append(nodo)
            profundidad-=1


def busqueda_famosos(nodo_inicial, visitados=None, distancia_min=80):
    
    """
    [BONUS]
    Recibe un NodoGrafo y busca en la red social al famoso mas
    cercano, retorna la distancia y el nodo del grafo que contiene
    a el usuario famoso cercano al que se encuentra.
    """
    # Completar para el bonus
