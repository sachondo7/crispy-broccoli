class RiesgoCovid(Exception):

    def __init__(self, sintoma, nombre_invitade):
        self.sintoma = sintoma
        self.nombre_invitade = nombre_invitade
        pass

    def alerta_de_covid(self):
        if self.sintoma == "fiebre" or self.sintoma == "tos" or self.sintoma == "dolor_cabeza":
            print(f"EL invitado {self.nombre_invitade} tiene prohibido el ingreso al carrete")
        # Completar
        pass
