import random
import parametros as p

class Mascota:
    def __init__(self, nombre, raza, dueno,
                 saciedad, entretencion):
        self.nombre = nombre
        self.raza = raza
        self.dueno = dueno
        
        # Los siguientes valores están en %.
        self._saciedad = saciedad
        self._entretencion = entretencion

    @property
    def saciedad(self):
        return self._saciedad 

    @saciedad.setter
    def saciedad(self, nuevo_valor):
        if 0 < nuevo_valor < 100:
            self._saciedad = nuevo_valor
        if nuevo_valor > 100:
            self._saciedad = 100
        elif nuevo_valor < 0: 
            self._saciedad = 0

    # COMPLETAR
    @property
    def entretencion(self):
        return self._entretencion

    @entretencion.setter
    def entretencion(self):
        if self.entretencion > 100:
            self._entretencion = 100
        elif self.entretencion < 0: 
            self._entretencion = 0
        
    @property
    def satisfaccion(self):
        return (self.saciedad//2 + self.entretencion//2)
    
    def comer(self, comida):
        # COMPLETAR
        num = random.random()
        vencer  = comida.probabilidad_vencer 
        caloria = comida.calorias 
        if num < vencer: 
            numero = self.saciedad - caloria
            print(f"La comida estaba vencida! A {self.nombre} le duele la pancita :(")
        else: 
            numero = self.saciedad + caloria
            print(f"{self.nombre} está comiendo {comida.nombre}, que rico!")
        pass

    def pasear(self):
        self.entretencion += p.ENTRETENCION_PASEAR
        self.saciedad += p.SACIEDAD_PASEAR
    
    def __str__(self):
        print("Nombre:",self.nombre)
        print("Saciedad:",self.saciedad)
        print("Entretención:",self.entretencion)
        print("Satisfacción:",self.satisfaccion)
        pass


class Perro(Mascota):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.especie = "PERRO"
        # COMPLETAR
        pass
    
    def saludar(self):
        print("GUAU GUAU")
        # COMPLETAR
        pass
        

class Gato(Mascota):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.especie = "GATO"
        # COMPLETAR
        pass

    def saludar(self):
        print("MiauU uwu")
        # COMPLETAR
        pass

class Conejo(Mascota):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.especie = "conejo"
        # COMPLETAR
        pass

    def saludar(self):
        print("No sé como hace un conejo")
        # COMPLETAR
        pass
