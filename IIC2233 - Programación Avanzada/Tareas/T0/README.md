# Tarea 0: Nombre de la tarea :DCComerce:

El módulo principal de la tarea a ejecutar es  ```main.py```, disponible en mi repositorio personal de github (sachondo7)

Los archivos que se necesitan para ejecutar correctamrnte el programa son: "publicaciones.csv" y "comenatarios.csv" y usuarios.csv"
Además, se utilizó la libreria propia "parametros.py" y la libreria externa "datetime"

Según yo, mi tarea cumple de la siguiente manera:
#### Menú de Inicio (14pts) (14%)
##### ✅ Requisitos : El programa imprime correctamente lo pedido 
##### ✅ Iniciar sesión : El programa responde correctamente a iniciar sesión con usuaruario que esté registardo en "usuarios.csv"
##### ✅ Ingresar como usuario anónimo : Al ingresar como usuario anonimo el programa deja ver las publicaciones realizadas pero no permite agregar comentarios como se pide. 
##### ✅ Registrar usuario: Se deja registar correctamente un usuario, ademas, si se da un nombre existente el programa avisa
##### ✅ Salir : se puede volver para atrás en todo momento 
#### Flujo del programa (35pts) (35%) 
##### ✅ Menú Principal : Se imprime correctamente el menú principal 
##### ✅ Menú Publicaciones : se imprimen correctamente las publicaciones y sus comentarios
##### 🟠 Menú Publicaciones Realizadas : no se imprimen correctamente las publicaciones realizadas por el usuario registrado, ya que no entran al if de la linea 279, aún cuando los dos están en formato str ("la vdd no sé en que falla) Ademas, si se ingresa bajo anónimo, no es posible ver este menú
#### Entidades 15pts (15%)
##### ✅ Usuarios: Funciona bien, en todo momento es posible verificar si estamos entrando como usuario anónimo o uno ya existente, ademas arroja error en caso de querer hacer alguna trampita. 
##### 🟠 Publicaciones: Las publicaciones se pueden visualizar correctamente, solo que el método "menu publicaciones realizadas" como se explicó antes no logra imprimir correctamente las publicaciones de cada usuario al no entrar al if de la linea 279. Además, me quede sin tiempo y no alcancé a implementar la función encargada de crear una nueva publicación por usuario. 
##### ✅ Comentarios: se agregar y se borran correctamente. 
#### Archivos: 15 pts (15%)
##### ✅ Manejo de Archivos: Se abren y se cierran correctamente los archivos en todo momento, ademas cuando se pide escribir se hace de manera correcta o cuando hay que "appendear tambien" 
#### General: 21 pts (21%)
##### ✅ Menús 
##### 🟠  Parámetros: se importan los parametros necesarios para la tarea, sin embargo, para la libreria de la hora, esta viene con unos decimales más a que como se entregan en el archivo publicaciones.csv
##### ✅ Módulos
##### 🟠 PEP8: no vi esto hasta ya terminada la tarea, es muy probable que me haya pasado de 100 carácteres en alguna linea o haya hecho un espacio despues de una coma


FUNCIONES creadas: 

imprimir_inicio()  : Imprime el menú de inicio del DCComerce, ademas, si se ingresa un numero no valido se llama nuevamente.

imprimir_menu(): imprime el menú principal del programa, llama a otras funciones dependiendo de la respuesta 

imprimir_menu_anonimo(): hace lo mismo que la función anterior, excepto que lo imprime bajo que es anonimo. 

usuario(path, numero): pide el  nombre de usuario, verifica que exista o no. Si se da un input válido, se llama a la funcione imprimir menú y si no arroja error y se vuelve a ejecutar la función. 

menu_publicaciones(path,user): recibe el archivo publicaciones y el usuario que está operando, permite volver, llamarse a si misma en caso de ser un input no valido o llamar a la funcion desplegar_info.

menu_publicaciones_anonimas(path): Lo mismo que la función anterior pero para usuarios anonimos

desplegar_info(lista,encontrar,path,user,id): Recibe una lista de listas, el articulo a encontrar, el archivo "comentarios.csv", el usuario operando y el id del articulo. Imprime las caracteristicas del producto buscado y sus respectivos comentarios. Puede llamar a la funcion agregar_comentario

desplegar_info_anonimo(lista,encontrar,path): Lo mismo que la función anterior, pero bajo usuarios anónimos, por lo que no permite agregar comentarios

agregar_comentario(path,user,id): recibe el archivo comentarios, el usuario y el id de la publicación, su función es agregar un comentario. 

menu_publicaciones_realizadas(path,usuario): Esta es la función que tuvo problemas. Su proposito era imprimir las publicaciones del usuario que esté operando pero como no entra al if de la linea 279 no lo hace bien. Permite llamar a una función de crear una nueva publicación (que no alcancé a crear) o a otra de borrar la publicación existente. 

borrar_publicacion(path, id,user): Borra la publicación deseada por el usuario registrado. 