class NodoFama:

    def __init__(self, usuario, padre=None):
        # No modificar
        self.usuario = usuario
        self.padre = padre
        self.hijo_izquierdo = None
        self.hijo_derecho = None


class ArbolBinario:

    def __init__(self):
        # No modificar
        self.raiz = None

    def crear_arbol(self, nodos_fama):
        # No modificar
        for nodo in nodos_fama:
            self.insertar_nodo(nodo, self.raiz)

    #esta pesimo mi trabajo ayudenme a terminar el semestre :(
    def insertar_nodo(self, nuevo_nodo, padre=None):
        if padre is not None:
            padre = self.buscar_nodo(padre.usuario.fama, padre)
        if padre is None:
            return
        else:
            padre.hijo_izquierdo = nuevo_nodo
        


    def buscar_nodo(self, fama, padre=None):
        if padre.usuario.fama == fama:
            return padre
        else: 
            if padre.usuario.fama > fama: 
                self.buscar_nodo(self,fama, padre.hijo_derecho)
            else: 
                self.buscar_nodo(self,fama, padre.hijo_izquierdo)
           

    def print_arbol(self, nodo=None, nivel_indentacion=0):
        # No modificar
        indentacion = "|   " * nivel_indentacion
        if nodo is None:
            print("** DCCelebrity Arbol Binario**")
            self.print_arbol(self.raiz)
        else:
            print(f"{indentacion}{nodo.usuario.nombre}: "
                  f"{nodo.usuario.correo}")
            if nodo.hijo_izquierdo:
                self.print_arbol(nodo.hijo_izquierdo,
                                 nivel_indentacion + 1)
            if nodo.hijo_derecho:
                self.print_arbol(nodo.hijo_derecho,
                                 nivel_indentacion + 1)
