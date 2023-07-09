import parametros as param

def imprimir_inicio():
    print("--- ¡Bienvenidos a DCCommerce! ---\n")
    print("*** Menu Inicio ***\n")
    print("Selecciona una opción:\n")
    print("[1] Ingresar sesión")
    print("[2] Registrar usuario")
    print("[3] Ingresar como usuario anonimo")
    print("[4] Salir\n")
    respuesta = int(input("Indique su opción:"))
    if respuesta == 4:
        print("Ha salido de la plataforma, gracias por visitarnos")
    elif respuesta != 1 and respuesta != 2 and respuesta != 3 and respuesta != 4:
        print("Respuesta inválida, redireccionando al menú principal\n")
        imprimir_inicio()
    else:
        usuario("usuarios.csv",respuesta)

def imprimir_menu(usuario):
    user = usuario
    print("*** Menú Principal ***\n")
    print("[1] Menú de Publicaciones")
    print("[2] Menú de Publicaciones realizadas")
    print("[3] Volver\n")
    respuesta = float(input("Indique su opción:"))
    if respuesta == 3: 
        imprimir_inicio()
    elif respuesta == 1:
        menu_publicaciones("publicaciones.csv") 
    elif respuesta == 2:
        menu_publicaciones_realizadas("publicaciones.csv",user) 
    else:
        print("número no válido")
        imprimir_menu(user)

def imprimir_menu_anonimo():
    print("*** Menú Principal ***\n")
    print("[1] Menú de Publicaciones")
    print("[2] Volver\n")
    respuesta = float(input("Indique su opción:"))
    if respuesta == 2:
        imprimir_inicio()
    elif respuesta == 1:
        menu_publicaciones_anonimas("publicaciones.csv")
    else: 
        print("número no válido")
        imprimir_menu_anonimo()

def usuario(path, numero):
    if numero != 3:
        usuario = input("nombre del usuario:")
        usuario = usuario + "\n"
    if numero == 3: 
        print("Usted ha ingresado como anónimo, solo puede ver las publicaciones\n")
    lista_ayudantes = []
    with open(path,"r") as file:
        for linea in file:
            lista_ayudantes.append(linea)
    if numero == 1: 
        for i in lista_ayudantes:
            verdad = usuario == i
            if verdad:
                imprimir_menu(usuario)
        print("Este usuario no está registrado, será redirigido al menú principal\n")
        imprimir_inicio()
    elif numero == 2: 
        for i in lista_ayudantes:
            verdad = usuario == i
            if verdad:
                print("Este usuario ya existe!!")
                print("Intente nuevamente\n")
                imprimir_inicio()
        if len(usuario) < param.MIN_CARACTERES or len(usuario) > param.MAX_CARACTERES or "," in usuario:
            print("Este nombre de usuario no cumple con las condiciones") 
            print("Intente nuevamente\n")
            imprimir_inicio()
        else: 
            with open(path,"a") as myfile:
                myfile.write(usuario)
            imprimir_menu(usuario)
    elif numero == 3: 
        imprimir_menu_anonimo()
    elif numero == 4: 
        print("Usted ha salido, el programa se ejecutará nuevamente")
        imprimir_inicio()

def menu_publicaciones(path):
    print("*** Menú de Publicaciones ***\n")
    lista_publicaciones = []
    with open(path,"r") as file:
        for linea in file:
            linea = linea.strip().split(",")
            lista_publicaciones.append(linea)
    listafinal = []
    for i in lista_publicaciones:
        listachica = []
        listachica.append(i[1])
        listachica.append(i[3])
        listafinal.append(listachica)        
    listafinal.pop(0)
    alele = (sorted(listafinal, key=lambda x:x[1], reverse=False))
    cont = 0
    opciones = []
    for i in alele:
        print("[",cont,"]", i[0])
        opciones.append(i[0])
        cont += 1
    print("[",cont,"]","Volver")
    respuesta = int(input("Indique su opción:"))
    if respuesta != cont: 
        buscar = opciones[respuesta]
    if respuesta == cont:
        print("Ha vuelto al menú principal")
        imprimir_menu(usuario)
    elif respuesta < 0 or respuesta > cont: 
        print("Opción no válida, intente nuevamente\n")
        menu_publicaciones("publicaciones.csv")
    else: 
        lista_publicaciones.pop(0)
        desplegar_info(lista_publicaciones,buscar,"comentarios.csv")

def menu_publicaciones_anonimas(path):
    print("*** Menú de Publicaciones ***\n")
    lista_publicaciones = []
    with open(path,"r") as file:
        for linea in file:
            linea = linea.strip().split(",")
            lista_publicaciones.append(linea)
    listafinal = []
    for i in lista_publicaciones:
        listachica = []
        listachica.append(i[1])
        listachica.append(i[3])
        listafinal.append(listachica)        
    listafinal.pop(0)
    alele = (sorted(listafinal, key=lambda x:x[1], reverse=False))
    cont = 0
    opciones = []
    for i in alele:
        print("[",cont,"]", i[0])
        opciones.append(i[0])
        cont += 1
    print("[",cont,"]","Volver")
    respuesta = int(input("Indique su opción:"))
    if respuesta != cont: 
        buscar = opciones[respuesta]
    if respuesta == cont:
        print("Ha vuelto al menú principal")
        imprimir_menu_anonimo()
    elif respuesta < 0 or respuesta > cont: 
        print("Opción no válida, intente nuevamente\n")
        menu_publicaciones_anonimas("publicaciones.csv")
    else: 
        lista_publicaciones.pop(0)
        desplegar_info_anonimo(lista_publicaciones,buscar,"comentarios.csv")

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
            if linea != "":
                linea = linea.strip().split(",")
                lista_comentarios.append(linea)
    lista_comentarios.pop(0)
    lista_comentarios = sorted(lista_comentarios, key=lambda x:x[2])
    for i in lista:
        for j in lista_comentarios:
            if i[0] == j[0] and encontrar == i[1]:
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

def desplegar_info_anonimo(lista,encontrar,path):
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
            if linea != "":
                linea = linea.strip().split(",")
                lista_comentarios.append(linea)
    lista_comentarios.pop(0)
    lista_comentarios = sorted(lista_comentarios, key=lambda x:x[2])
    for i in lista:
        for j in lista_comentarios:
            if i[0] == j[0] and encontrar == i[1]:
                print(j[2],"--",j[1],":",j[3])
    print("\n")
    print("[1] Volver")
    respuesta = int(input("Indique su opción en forma de int"))
    if respuesta == 1:
        menu_publicaciones_anonimas("publicaciones.csv")
    else: 
        print("Respuesta no valida, intente nuevamente\n")

def agregar_comentario(path):
    comentario = input("Ingrese su comentario:")
    with open(path,"a") as myfile:
        myfile.write("\n"+comentario)
    print("Se ha agregado su comentario\n")
    print("[1] Volver")
    respuesta = int(input("Indique su opción"))
    while respuesta != 1:
        print("Respuesta inválida, intente nuevamente \n")
        respuesta = int(input("Indique su opción"))
    menu_publicaciones("publicaciones.csv")

def menu_publicaciones_realizadas(path,usuario):
    print("*** Menú de Publicaciones realizadas ***")
    print("Mis publicaciones:\n")
    user = usuario
    lista = []
    lista_id = []
    id_buscado = []
    listeylor = []
    with open(path,"r") as file:
        for line in file:
            fila = line.strip().split(",")
            lista.append(fila)
    lista.pop(0)
    for i in lista:
        if i[2] == user:
            print(i[1],"\n")
            lista_id.append(int(i[0]))
            listeylor.append("1")
    if listeylor == []:
        print("No tiene publicaciones hechas\n")
        print("[1] Volver")
        respuesta = int(input("Indique su opcion"))
        if respuesta == 1: 
            imprimir_menu(user)
        else: 
            print("Respuesta no valida, intente nuevamente\n")
            menu_publicaciones_realizadas("publicaciones.csv",user)
    else:
        print("[1] Crear nueva publicacion")
        print("[2] Eliminar publicacion")
        print("[3] Volver")
        respuesta = int(input("Indique su opcion"))
        if respuesta == 1:
            print("hola")
        elif respuesta == 2:
            print("Que publicación deseas borrar:\n")
            cont = 1
            for i in lista:
                if i[2] == user:
                    print("["+str(cont)+"]",i[1],"-- Creado el "+i[3]+"\n")
                    cont += 1
                    id_buscado.append(i[1])
            borrar = int(input("Seleccione su opción:"))
            borrar = id_buscado[borrar-1]
            for i in lista:
                if i[1] == borrar:
                    id = i[0]
                    print(id)
            borrar_publicacion("publicaciones.csv", id,user)
        elif respuesta == 3:
            imprimir_menu(user)
        else: 
            print("Respuesta inválida, intente nuevamente \n")
            menu_publicaciones_realizadas("publicaciones.csv", user)

def borrar_publicacion(path, id,user):
    lista_comentarios = []
    with open(path,"r") as file:
        for linea in file:
            linea = linea.strip().split(",")
            lista_comentarios.append(linea)
    lista_comentarios.pop(0)
    listafinal = []
    for linea in lista_comentarios:
        if linea[0] != id and linea[2] != user:
            listafinal.append(linea)
    with open(path,"w") as file:
        for i in listafinal: 
            i = ",".join(i)
            file.write(i+"\n")


imprimir_inicio()




