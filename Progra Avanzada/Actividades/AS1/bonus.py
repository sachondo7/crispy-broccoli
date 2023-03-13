from atracciones import AtraccionAdrenalinica, AtraccionFamiliar
import parametros as p


# Recuerda completar la herencia!
class AtraccionTerrorifica(AtraccionAdrenalinica):

    def __init__(self,**kwargs):
        super().__init__(**kwargs)
        self.efecto_salud = p.SALUD_TERROR
        self.efecto_felicidad = p.FELICIDAD_TERROR
        pass

    def iniciar_juego(self, personas):
        # COMPLETAR
        pass


# Recuerda completar la herencia!
class CasaEmbrujada(AtraccionFamiliar,AtraccionTerrorifica):

    def iniciar_juego(self, personas):
        # COMPLETAR
        pass
