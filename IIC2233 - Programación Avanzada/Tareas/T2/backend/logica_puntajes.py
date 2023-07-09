from PyQt5.QtCore import QObject, pyqtSignal

import parametros as p


class LogicaRanking(QObject):
    
    senal_volver = pyqtSignal()
    senal_lista_puntajes = pyqtSignal(list)

    def __init__(self):
        super().__init__()

    def nuevo_nombre(self,nombre):
        nombre_nuevo  = nombre
        with open("backend/puntajes.txt",'a', encoding='utf-8') as file:
            file.write(f'\n{nombre_nuevo}')
    
    def nuevo_puntaje(self,dict):
        puntaje = str(dict["puntajetotal"])
        with open("backend/puntajes.txt",'a', encoding='utf-8') as file:
            file.write(f',{puntaje}')
    
    def desplegar_ranking(self):
        with open("backend/puntajes.txt",'r', encoding='utf-8') as file:
            lista_puntajes = []
            for j in file: 
                j = j.strip().split(",")
                lista_puntajes.append(j)
            for i in lista_puntajes:
                i[1] = int(i[1])
            lista_puntajes = sorted(lista_puntajes, key = lambda x: x[1],reverse= True)
            lista_puntajes = lista_puntajes[0:5]
        self.senal_lista_puntajes.emit(lista_puntajes)
    
    def volver(self):
        self.senal_volver.emit()



