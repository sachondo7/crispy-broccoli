# Debes completar esta función para que retorne la información de los ayudantes
def cargar_datos(path):
    with open(path,"r") as file:
        for line in file:
            linea =line.strip().split(",")
            print(linea)
    pass


# Completa esta función para encontrar la información del ayudante entregado
def buscar_info_ayudante(nombre_ayudante, lista_ayudantes):
    lista = []
    buscar = lista_ayudantes[0].lower()
    nombre = nombre_ayudante.lower()
    if buscar == nombre:
        return nombre 
    else: 
        return None
    pass


# Completa esta función para que los ayudnates puedan saludar
def saludar_ayudante(info_ayudante):
    pass


if __name__ == '__main__':
    lista = cargar_datos("ayudantes.csv") 
    print(lista)
    # El código que aquí escribas se ejecutará solo al llamar a este módulo.
    # Aquí puedes probar tu código llamando a las funciones definidas.

    # Puede llamar a cargar_datos con el path del archivo 'ayudantes.csv'
    # para probar si obtiene bien los datos.

    # Puedes intentar buscar la lista de unos de los nombres
    # que se encuentran en el archivo con la función buscar_info_ayudante.
    # Además puedes utilizar la lista obtenida para generar su saludo.

    # Hint: la función print puede se útil para revisar
    #       lo que se está retornando.
