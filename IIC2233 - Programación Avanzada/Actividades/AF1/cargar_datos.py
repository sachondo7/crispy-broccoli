from mascota import Perro, Gato, Conejo
def cargar_mascotas(archivo_mascotas):
    lista_a_retornar = []
    with open(archivo_mascotas,"r") as file:
        lista_mascotas = []
        for linea in file: 
            linea = linea.strip().split(",")
            lista_mascotas.append(linea)
    lista_mascotas.pop(0)
    for elemento in lista_mascotas:
        nombre = elemento[0]
        clase = elemento[1] 
        raza = elemento[2] 
        dueno = elemento[3]  
        saciedad = elemento[4] 
        entretencion = elemento[5]
        if clase == "perro": 
            a = Perro(nombre,raza,dueno,saciedad,entretencion)
            lista_a_retornar.append(a)
        elif clase == "gato":
            a = Gato(nombre,raza,dueno,saciedad,entretencion)
            lista_a_retornar.append(a)
        else: 
            a = Conejo(nombre,raza,dueno,saciedad,entretencion)
            lista_a_retornar.append(a)
    return lista_a_retornar

cargar_mascotas("mascotas.csv")
