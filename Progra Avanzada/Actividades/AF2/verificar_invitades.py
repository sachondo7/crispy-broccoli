def verificar_edad(invitade):
    if invitade.edad < 0:
        raise ValueError(f"Error: la edad de {invitade.nombre} es negativa")
    # Completar
    pass

def corregir_edad(invitade):
    try:
        verificar_edad(invitade)
    except ValueError as err:
        invitade.edad = abs(invitade.edad)
        print(f"El error en la edad de {invitade.nombre} ha sido corregido")
    pass


def verificar_pase_movilidad(invitade):
    if not isinstance(invitade.pase_movilidad, bool):
        raise TypeError(f"Error: el pase de movilidad de {invitade.nombre} no es un bool")
    pass

def corregir_pase_movilidad(invitade):
    try:
        verificar_pase_movilidad(invitade)
    except TypeError as err:
        invitade.pase_movilidad = True
        print(f"El error en el pase de movilidad de {invitade.nombre} ha sido corregido")
    # Completar
    pass

def verificar_mail(invitade):
    if invitade.mail[0:3] == "uc@":
        raise TypeError(f"Error: El mail de {invitade.nombre} no está en el formato correcto")
    pass

def corregir_mail(invitade):
    try:
        verificar_mail(invitade)
    except TypeError as err:
        largo = len(invitade.mail)
        uc = invitade.mail[0:2]
        cl = invitade.mail[-3:]
        nombre = invitade.mail[3:largo-3]
        invitade.mail = (nombre+"@"+uc+cl)
        print(f"El error en el mail de {invitade.nombre} ha sido corregido")
    # Completar
    pass


def dar_alerta_colado(nombre_asistente, diccionario_invitades):
    try:
        if nombre_asistente not in diccionario_invitades: 
            print((f"Error: {nombre_asistente} se está intentando colar al carrete"))
    except KeyError as err:
        asistente = diccionario_invitades[nombre_asistente]
        print(f"{asistente.nombre} esta en la lista y tiene edad {asistente.edad}")
        # Completar
    pass
