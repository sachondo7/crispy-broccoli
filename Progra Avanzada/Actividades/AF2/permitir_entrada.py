from excepciones_covid import RiesgoCovid


# NO DEBES MODIFICAR ESTA FUNCIÓN
def verificar_sintomas(invitade):
    if invitade.temperatura > 37.5:
        raise RiesgoCovid("fiebre", invitade.nombre)
    elif invitade.tos:
        raise RiesgoCovid("tos", invitade.nombre)
    elif invitade.dolor_cabeza:
        raise RiesgoCovid("dolor_cabeza", invitade.nombre)


def entregar_invitados(diccionario_invitades):
    lista = [] 
    for i in diccionario_invitades: 
        #instancias = diccionario_invitades[i]
        try:
            verificar_sintomas(diccionario_invitades[i])
        except RiesgoCovid:
            RiesgoCovid.alerta_de_covid
        else:
            lista.append(i)
    return lista     
    # Completar
    pass
