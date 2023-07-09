import time
import parametros
import random
from Clases_tributos import Tribute
from Clases_arena import Arena
from Clases_objetos import Objeto, Especial, Consumible, Arma
from Clases_ambientes import Ambiente, Playa, Montana, Bosque
from abc import ABC, abstractmethod


def manejar_input(opcion_elegida, cantidad_de_opciones):
    try:
        int_opcion_elegida = int(opcion_elegida)
    except ValueError:
        raise ValueError(f"\nEl valor ingresado no es un int\n")
    else:
        if int_opcion_elegida > cantidad_de_opciones or int_opcion_elegida < 1:
            raise IndexError(f"\nEl valor ingresado no está entre el 1 y el {cantidad_de_opciones}\n")
    return True

def menu_inicio():
    a = True
    while a == True:
        print("*** Menú de inicio ***"
        '\n---------------------'
        '\n(1) Iniciar partida'
        '\n(2) Salir')
        input_usuario_menu1 = input("Ingrese su opción elegida: ")
        try:
            validar_input = manejar_input(input_usuario_menu1, 2)
        except (ValueError, IndexError) as err:
            print(err)
            validar_input = False
        if validar_input:
            if input_usuario_menu1 == "2":
                print("Usted ha salido del programa")
                time.sleep(2)
                print('\nIniciando el programa nuevamente''\n')
                menu_inicio()
            a = False
    ambiente_y_tributos()
def ambiente_y_tributos():
    with open("Tareas/T1/ambientes.csv","r", encoding= 'utf-8') as file: 
        lista_ambientes = []
        lista_intermedia = []
        lista_instancias1 = []
        for linea in file:
            linea = linea.strip().split(",")
            lista_ambientes.append(linea)
        lista_ambientes.pop(0)
        for fila in lista_ambientes:
            for elemento in fila:
                elemento = elemento.split(";")
                lista_intermedia.append(elemento)
                if len(lista_intermedia) == 4:
                    lista_instancias1.append(lista_intermedia)
                    lista_intermedia = []
    ambientes = []
    ambiente1 = Playa(lista_instancias1[1][0][0],lista_instancias1[1][1][0],
            int(lista_instancias1[1][1][1]),lista_instancias1[1][2][0],
            int(lista_instancias1[1][2][1]),
            lista_instancias1[1][3][0],int(lista_instancias1[1][3][1]))
    ambientes.append(ambiente1)
    ambiente2 = Montana(lista_instancias1[0][0][0],lista_instancias1[0][1][0],
            int(lista_instancias1[0][1][1]),lista_instancias1[0][2][0],
            int(lista_instancias1[0][2][1]),
            lista_instancias1[0][3][0],int(lista_instancias1[0][3][1]))
    ambientes.append(ambiente2)
    ambiente3 = Bosque(lista_instancias1[2][0][0],lista_instancias1[2][1][0],
            int(lista_instancias1[2][1][1]),lista_instancias1[2][2][0],
            int(lista_instancias1[2][2][1]),
            lista_instancias1[2][3][0],int(lista_instancias1[2][3][1]))
    ambientes.append(ambiente3)
    with open("Tareas/T1/tributos.csv","r", encoding= 'utf-8') as file:
        lista_tributos = []
        lista_instancias = []
        for linea in file:
            linea = linea.strip().split(",")
            lista_tributos.append(linea)
    lista_tributos.pop(0)
    indice = 1
    for i in lista_tributos:
        x = Tribute(i[0],i[1],int(i[2]),int(i[3]),int(i[4]),int(i[5]),
        int(i[6]),int(i[7]),int(i[8]))
        lista_instancias.append(x)
    tributos(lista_instancias,ambiente1,ambientes)
def tributos(lista_instancias,ambiente,ambientes):
    a = True
    while a == True:
        indice = 1
        print("\nElija su tributo \n")
        for i in (lista_instancias):
            print(f"Tributo {[indice]}: {i.nombre}, Distrito: {i.distrito}")
            indice += 1
        opcion = input("\nTributo Escogido:")
        print(f"Usted ha escogido al tributo número {opcion}")
        try:
            validar_input = manejar_input(opcion, 12)
        except (ValueError, IndexError) as err:
            print(err)
            validar_input = False
        if validar_input:
            mi_tributo = lista_instancias[int(opcion)-1]
            todos_tributos = lista_instancias
            otros_tributos = []
            for i in todos_tributos:
                if i.nombre != mi_tributo.nombre and i.vida != 0:
                    otros_tributos.append(i) 
            a = False
            arena(mi_tributo,otros_tributos,todos_tributos,ambiente,ambientes)
def arena(mi_tributo,otros_tributos,todos_tributos,ambiente,ambientes):
    a = True
    with open("arenas.csv","r", encoding= 'utf-8' ) as file:
        lista_arenas = []
        lista_instancias = []
        for linea in file:
            linea = linea.strip().split(",")
            lista_arenas.append(linea)
        lista_arenas.pop(0)
    while a == True:
        indice = 1
        print("Escoja su arena")
        for i in lista_arenas:
            print(f"Arena [{indice}]: {i[0]} - dificultad {i[1]}")
            indice += 1
        opcion = input("Arena escogida:")
        try:
            validar_input = manejar_input(opcion, 3)
        except (ValueError, IndexError) as err:
            print(err)
            validar_input = False
        if validar_input:
            opcion = int(opcion)
            arena = Arena(lista_arenas[opcion - 1][2],lista_arenas[opcion - 1][1]
            ,mi_tributo,otros_tributos, ambientes=["Playa","Montana", "Bosque"])
            print(f"La arena escogida es {lista_arenas[opcion-1][0]}")
            print("El orden de los ambientes es: Playa - Montana - Bosque")
            a = False
            menu_principal(mi_tributo,arena,otros_tributos,todos_tributos,ambiente,ambientes,objetos='')
def menu_principal(mi_tributo, arena,otros_tributos,todos_tributos,ambiente,ambientes,objetos):
    a = True
    while a == True:
        print("*** Menú Principal ***"
        '\n---------------------'
        '\n[1] Simulación Hora'
        '\n[2] Mostrar estado del tributo'
        '\n[3] Utilizar objeto'
        '\n[4] Resumen DCCapitolio'
        '\n[5] Volver'
        '\n[6] Salir')
        input_usuario_menu1 = input("Ingrese su opción elegida: ")
        try:
            validar_input = manejar_input(input_usuario_menu1, 6)
        except (ValueError, IndexError) as err:
            print(err)
            validar_input = False
        if input_usuario_menu1 == "6":
            print("Usted ha salido del programa"
            '\nIniciando el programa nuevamente'
            '\n')
            menu_inicio()
        elif input_usuario_menu1 == "5":
            print("Usted ha vuelto atrás\n")
            ambiente_y_tributos()
        if validar_input:
            if mi_tributo.mochila != []:
                if input_usuario_menu1 == "1":
                    simulacion_hora(mi_tributo,arena,otros_tributos,todos_tributos,ambiente,ambientes,objetos)
                elif input_usuario_menu1 == "2":
                    mostrar_estado_tributo(mi_tributo,arena,otros_tributos,todos_tributos,ambiente,ambientes,objetos)
                elif input_usuario_menu1 == "3":
                    if mi_tributo.mochila != []:
                        utilizar_objeto(mi_tributo,arena,otros_tributos,todos_tributos,ambiente,ambientes,objetos)
                    else:
                        utilizar_objeto(mi_tributo,arena,otros_tributos,todos_tributos,ambiente,ambientes,objetos)
                elif input_usuario_menu1 == "4":
                    resumen_dcc(mi_tributo,arena,otros_tributos,todos_tributos,ambiente,ambientes,objetos)
            else:
                if input_usuario_menu1 == "1":
                    simulacion_hora(mi_tributo,arena,otros_tributos,todos_tributos,ambiente,ambientes,objetos= '')
                elif input_usuario_menu1 == "2":
                    mostrar_estado_tributo(mi_tributo,arena,otros_tributos,todos_tributos,ambiente,ambientes,objetos = '')
                elif input_usuario_menu1 == "3":
                    if mi_tributo.mochila != []:
                        utilizar_objeto(mi_tributo,arena,otros_tributos,todos_tributos,ambiente,ambientes,objetos = '')
                    else:
                        utilizar_objeto(mi_tributo,arena,otros_tributos,todos_tributos,ambiente,ambientes,objetos= '')
                elif input_usuario_menu1 == "4":
                    resumen_dcc(mi_tributo,arena,otros_tributos,todos_tributos,ambiente,ambientes,objetos = '')
            a = False
def simulacion_hora(mi_tributo,arena,otros_tributos,todos_tributos,ambiente,ambientes,objetos):
    a = True
    while a == True:
        print("*** Simulación de Hora ***"
        '\n---------------------'
        '\n[1] Acción Heroíca'
        '\n[2] Atacar tributo'
        '\n[3] Pedir objeto a patrocinadores'
        '\n[4] Hacerse Bolita'
        '\n[5] Volver'
        '\n[6] Salir')
        input_usuario_menu1 = input("Ingrese su opción elegida: ")
        try:
            validar_input = manejar_input(input_usuario_menu1, 6)
        except (ValueError, IndexError) as err:
            print(err)
            validar_input = False
        if validar_input:
            a = False
            if input_usuario_menu1 == "1":
                accion_heroica(mi_tributo,arena,otros_tributos,todos_tributos,ambiente,ambientes,objetos)
            elif input_usuario_menu1 == "2":
                atacar_tributo(mi_tributo,arena,otros_tributos,todos_tributos,ambiente,ambientes,objetos)
            elif input_usuario_menu1 == "3":
                pedir_objeto(mi_tributo,arena,otros_tributos,todos_tributos,ambiente,ambientes)
            elif input_usuario_menu1 == "4":
                hacerse_bolita(mi_tributo,arena,otros_tributos,todos_tributos,ambiente,ambientes,objetos)
            elif input_usuario_menu1 == "5":
                menu_principal(mi_tributo,arena,otros_tributos,todos_tributos,ambiente,ambientes,objetos)
            else:
                menu_inicio()
def accion_heroica(mi_tributo,arena,otros_tributos,todos_tributos,ambiente,ambientes,objetos):
    x = mi_tributo.accion_heroica()
    if x:
        pasar_hora(mi_tributo,arena,otros_tributos,todos_tributos,ambiente,ambientes,objetos)
    else:
        simulacion_hora(mi_tributo,arena,otros_tributos,todos_tributos,ambiente,ambientes,objetos)
def atacar_tributo(mi_tributo,arena,otros_tributos,todos_tributos,ambiente,ambientes,objetos):
    a = True
    while a == True:
        if mi_tributo.energia >= parametros.ENERGIA_ATACAR:
            indice = 1
            otros_tributos = []
            for i in todos_tributos:
                if i.estavivo and i.nombre != mi_tributo.nombre:
                    print(f"[{indice}]: {i.nombre}, vida: {i.vida}")
                    indice += 1
                    otros_tributos.append(i)
            opcion = input('A qué tributo enemigo le gustaría atacar:\n')
            try:
                validar_input = manejar_input(opcion, len(otros_tributos))
            except (ValueError, IndexError) as err:
                    print(err)
                    validar_input = False
            if validar_input:
                a = False
                opcion = int(opcion)
                atacado = otros_tributos[opcion - 1]
                dano = int(mi_tributo.atacar())
                atacado.vida -= dano
                if atacado.estavivo == False:
                    todos_tributos.remove(atacado)
                    otros_tributos.remove(atacado)
                print(f"Atacaste a {atacado.nombre}, ahora su vida es {atacado.vida}")
                mi_tributo.energia -= parametros.ENERGIA_ATACAR
                print(f"A {mi_tributo.nombre}, le queda {mi_tributo.energia} de energía\n")
                if len(todos_tributos) == 1:
                    ganaste()
                else:
                    pasar_hora(mi_tributo,arena,otros_tributos,todos_tributos,ambiente,ambientes,objetos)
        else: 
            print(f'El tributo {mi_tributo.nombre} no tiene suficiente energía para atacar')
            if mi_tributo.mochila == []:
                simulacion_hora(mi_tributo,arena,otros_tributos,todos_tributos,ambiente,ambientes,objetos= '')
            else:
                simulacion_hora(mi_tributo,arena,otros_tributos,todos_tributos,ambiente,ambientes,objetos)
            a = False
def pedir_objeto(mi_tributo,arena,otros_tributos,todos_tributos,ambiente,ambientes):
    if mi_tributo.popularidad >= parametros.COSTO_OBJETO:
        objetos = mi_tributo.pedir_objeto()
        pasar_hora(mi_tributo,arena,otros_tributos,todos_tributos,ambiente,ambientes,objetos)
    else:
        objetos = mi_tributo.pedir_objeto()
        simulacion_hora(mi_tributo,arena,otros_tributos,todos_tributos,ambiente,ambientes,objetos='')
def hacerse_bolita(mi_tributo,arena,otros_tributos,todos_tributos,ambiente,ambientes,objetos):
    mi_tributo.energia += parametros.ENERGIA_BOLITA
    print(f"La energia de {mi_tributo.nombre} aumentó a {mi_tributo.energia}")
    time.sleep(1)
    pasar_hora(mi_tributo,arena,otros_tributos,todos_tributos,ambiente,ambientes,objetos)
    pass
def mostrar_estado_tributo(mi_tributo,arena,otros_tributos,todos_tributos,ambiente,ambientes,objetos):
    print(f"ESTADO TRIBUTO"
    '\n-----------------------')
    print(f"Nombre: {mi_tributo.nombre}")
    print(f"Distrito: {mi_tributo.distrito}")
    print(f"Edad: {mi_tributo.edad}")
    print(f"Vida: {mi_tributo.vida}")
    print(f"Energía: {mi_tributo.energia}")
    print(f"Agilidad: {mi_tributo.agilidad}")
    print(f"Fuerza: {mi_tributo.fuerza}")
    print(f"Ingenio: {mi_tributo.ingenio}")
    print(f"Popularidad: {mi_tributo.popularidad}")
    print(f"Objetos: {mi_tributo.mochila}")
    print(f"Peso: {mi_tributo.peso}")
    time.sleep(1)
    menu_principal(mi_tributo,arena,otros_tributos,todos_tributos,ambiente,ambientes,objetos)
def utilizar_objeto(mi_tributo,arena,otros_tributos,todos_tributos,ambiente,ambientes,objetos):
    a = True
    while a == True:
        lista = []
        if mi_tributo.mochila != []:
            print(f'Los objetos disponibles son:')
            indice = 1
            for i in mi_tributo.mochila: 
                print(f'[{indice}] {i}')
                lista.append(i)
                indice += 1 
            decision = input("Que objeto quiere utilizar")
            try:
                validar_input = manejar_input(decision, len(mi_tributo.mochila))
            except (ValueError, IndexError) as err:
                print(err)
                validar_input = False
            if validar_input:
                objetoautilizar = lista[int(decision)-1]
                mi_tributo = mi_tributo.utilizar_objeto1(objetoautilizar,objetos,arena)
                a = False
                time.sleep(1)
                menu_principal(mi_tributo,arena,otros_tributos,todos_tributos,ambiente,ambientes,objetos)
        else: 
            print(f'El tributo {mi_tributo.nombre} no tiene objetos disponibles :c\n')
            a = False
            menu_principal(mi_tributo,arena,otros_tributos,todos_tributos,ambiente,ambientes,objetos)      
def pasar_hora(mi_tributo,arena, otros_tributos,todos_tributos,ambiente,ambientes,objetos):
    dano_ambiente = ambiente.calcular_dano(arena)
    for i in todos_tributos:
        i.vida -= dano_ambiente
    print("Los encuentros ocurridos en esta hora fueron:")    
    arena.encuentros(mi_tributo,todos_tributos)
    print("Tributos que aún siguen con vida")
    for i in todos_tributos:
        if i.estavivo:
            print(f'{i.nombre}, vida: {i.vida}')
        else: 
            todos_tributos.remove(i)
    if ambiente.nombre == "playa":
        ambiente = ambientes[1]
    elif ambiente.nombre == "montaña":
        ambiente = ambientes[2]
    else:
        ambiente = ambientes[0]
    print('todostributos', len(todos_tributos))
    if len(todos_tributos) == 1 or len(todos_tributos)==2:
        ganaste()
    elif mi_tributo.vida == 0:
        perdiste()
    else:
        print(f"el nuevo ambiente será {ambiente.nombre} \n")
        menu_principal(mi_tributo,arena,otros_tributos,todos_tributos,ambiente,ambientes,objetos)
def resumen_dcc(mi_tributo, arena, otros_tributos, todos_tributos,ambiente,ambientes,objetos):
    print(f"Dificultad de la arena: {arena.dificultad}")
    print(f"Tributos con vida:")
    for i in todos_tributos:
        print(f'    {i.nombre} - vida: {i.vida}')
    print(f"Próximo ambiente:")
    if ambiente.nombre == "playa":
        print(" Montaña")
    elif ambiente.nombre == "montaña":
        print(" Bosque")
    else:
        print(" Playa")
    time.sleep(1)
    menu_principal(mi_tributo, arena, otros_tributos, todos_tributos,ambiente,ambientes,objetos)
def ganaste():
    print("GANASTE LOS JUEGOS DEL DCCAPITOLIO")
def perdiste():
    print("Te mataron, perdiste los juegos del DCCapitolio")

menu_inicio()