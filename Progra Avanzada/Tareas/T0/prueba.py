def desplegar_info(lista,encontrar,path):
    for i in lista:
        if i[1] == encontrar:
            print("***",encontrar,"***\n")
            print("Creado:",i[3])
            print("Vendedor:",i[2])
            print("Precio:",i[4])
            print("Descripción:",i[5],"\n")
            print("Comentarios de la publicación:")
    with open(path,"r") as file:
        lista_comentarios = []
        for linea in file:
            linea = linea.strip().split(",")
            lista_comentarios.append(linea)
    lista_comentarios.pop(0)
    for i in lista:
        for j in lista_comentarios:
            j[0] = int(j[0])
            if i[0] == j[0]:
                print(j[2],"--",j[1],":",j[3])
    print("\n")
    print("[1] Agregar comentario")
    print("[2] Volver")
    respuesta = int(input("Indique su opción en forma de int"))
    if respuesta == 1:
        agregar_comentario(path)
    elif respuesta == 2:
        menu_publicaciones("publicaciones.csv")
    else: 
        print("Respuesta no valida, intente nuevamente\n")



    

listaka = [[1,"bicicleta","ayer","ola","peo","ff"],[2,"odla","tuka","oeela","pdeo","ffff"]]
desplegar_info(listaka,"bicicleta","comentarios.csv")