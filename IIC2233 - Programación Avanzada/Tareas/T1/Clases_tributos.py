import time
import parametros
import random
import Clases_objetos

class Tribute:

    def __init__(self, nombre, distrito, edad, vida, energia, agilidad, fuerza, ingenio, popularidad):
        self.nombre = nombre
        self.distrito = distrito
        self.edad = edad
        self._vida = vida
        self._energia = energia
        self.agilidad = agilidad
        self.fuerza = fuerza
        self.ingenio = ingenio
        self.popularidad = popularidad
        self.estavivo = True
        self.mochila = []
        self.peso = 0
        self.instancias = []

    @property
    def vida(self):
        return self._vida

    @vida.setter
    def vida(self, valor):
        valor = int(valor)
        if 0 <= valor <= 100:
            self._vida = valor
        elif valor < 0:
            self._vida = 0 
            print(f"El tributo {self.nombre} ha muerto")
            self.estavivo = False
        else:
            self._vida = 100

    @property
    def energia(self):
        return self._energia

    @energia.setter
    def energia(self, valor):
        valor = int(valor)
        if 0 <= valor <= 100:
            self._energia = valor
        elif valor < 0:
            print(f"Al tributo {self.nombre} se le acabó la energia")
            self._vida = 0
        else:   
            self._energia = 100
    
    def atacar(self):
        argumento = int(((60* int(self.fuerza)) + (40 * int(self.agilidad)) + (40* int(self.ingenio)) - (30 * int(self.peso))) /int(self.edad))
        dano = min(90,max(5,argumento))
        return dano
        
    def utilizar_objeto1(self, objetoautilizar,instancia_objeto,instancia_arena):
        posicion = 0
        for i in instancia_objeto:
            if i.nombre == objetoautilizar:
                if i.tipo == "consumible":
                    i.dar_beneficio(self)
                elif i.tipo == "arma":
                    i.dar_beneficio(self,instancia_arena)
                else:
                    i.dar_beneficio(self,instancia_arena)
                self.peso -= i.peso
                self.mochila.pop(posicion)
                posicion += 1
                break
        return self
            
    def accion_heroica(self):
        self._energia = int(self._energia)
        self.popularidad = int(self.popularidad)
        if self._energia > parametros.ENERGIA_ACCION_HEROICA:
            self._energia -= parametros.ENERGIA_ACCION_HEROICA
            self.popularidad += parametros.POPULARIDAD_ACCION_HEROICA
            print(f"La popularidad de {self.nombre} es {self.popularidad}")
            print(f"La energía restante de {self.nombre} es {self._energia}")
            return True
        else:
            print(f"La popularidad de {self.nombre} no es suficiente")
            return False

    def pedir_objeto(self):
        a = True
        while a == True:
            self.popularidad = int(self.popularidad)
            if self.popularidad >= parametros.COSTO_OBJETO:
                with open("objetos.csv","r", encoding= 'utf-8') as file:
                    lista_objetos = []
                    for linea in file:
                        linea = linea.strip().split(",")
                        lista_objetos.append(linea)
                lista_objetos.pop(0)
                for objetos in lista_objetos:
                    if objetos[1] == "arma":
                        x = Clases_objetos.Arma(objetos[0],objetos[1],int(objetos[2]))
                        self.instancias.append(x)
                    elif objetos[1] == "consumible":
                        x = Clases_objetos.Consumible(objetos[0],objetos[1],int(objetos[2]))
                        self.instancias.append(x)
                    else:
                        x = Clases_objetos.Especial(objetos[0],objetos[1],int(objetos[2]))
                        self.instancias.append(x)
                largo = len(lista_objetos)
                numero = random.randint(1,largo)
                objeto = lista_objetos[numero][0]
                self.mochila.append(objeto)
                self.peso += int(lista_objetos[numero][2])
                print(f"Ahora {self.nombre} tiene el / los objetos {self.mochila}")
                a = False
                return self.instancias
            else:
                print(f"{self.nombre} no tiene suficiente popularidad para pedir objetos :c")
                a = False
                    


