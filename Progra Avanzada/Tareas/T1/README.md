# Tarea 1: Nombre de la tarea DCCapitolio
# Sebastian Achondo Silva
# 20203918 
# 20830920-K


**Dejar claro lo que NO pudieron implementar y lo que no funciona a la perfección. Esto puede sonar innecesario pero permite que el ayudante se enfoque en lo que sí podría subir su puntaje.**

## Consideraciones generales 

<La tarea en lineas generales cumple con lo pedido en el enunciado, se busca simular un juego a partir de la programacion orientada a objetos mediante las clases tributo, arena, objetos y ambientes.
lo que hace generalmente es ir instanciando estas clases y dependiendo de las interacciones que se van ejecutando se van borrando los tributos que su vida llega a 0 y se mueren. 
Si la lista todos_tributos, que contiene las instancias de todos los tributos llega a solo contener un elemento, significa que el tributo utilizado ganó y se imprimira un mensaje en consola indicando que ganó. 
En caso que el tributo utilizado tenga vida = 0, significa que este murió y por ende se acaba el juego. También se imprime un mensaje en consola si ocurre esto.
Tal como pide el enunciado, despues de cada simulacion de hora, va cambiando el ambiente, entre playa- montana y bosque. Esto también se va notificando en consola y cada ambiente hace un daño igual a toda la vida de los tributos. Si ocurre algún evento espécifico del ambiente, tambien se notifica y el daño producido por el ambiente será de una mayor magnitud. 
La tarea presenta ciertos bugs al veces no ir borrando correctamente los tributos con vida = 0 de la lista todos tributos, por lo que se tiene que ir repitiendo simular la hora para que finalmente sean borrados y poder ganar los juegos del dccapitolio.

### funciones 
<manejar_input> encargada de hcer que el programa no se caiga y levantar excepciones
<menu_inicio> encargada de imprimir el menú inicio 
<ambientes_y_yributos> encargada de abrir los archivos ambientes y tributos para luego ir instanciandolos
<tributos> imprime todos los tributos para elegir con cual quieres jugar
<arena> imprime las arenas posibles y te permite seleccionar en cual quieres jugar
<menu_princial> imprime el menú principal 
<simulacion_hora> imprime todas las acciones posibles que puedes escoger al simular una hora
<accion_heoroica> permite al tributo ganar popularidad a cambio de energia
<atacar_tributo> permite elegir a que tributo quieres atacar y quitarle vida 
<pedir_objeto> permite pedir un objeto a los patrocinadores si la popularidad del tributo es suficiente
<hacerse_bolita> aumenta la energia del tributo 
<mostrar_estado_tributo> muestra las principales carácteristicas del tributo con el que estás jugando
<utilizar_objeto> en caso de contar con un objeto en la mochila, permite al tributo obtener los beneficios de este
<pasar_hora> simula que pasa una hora en la arena. Aquí también se hacen los daños producidos por el ambiente y los encuentros de los otros tributos externos al jugador 
<resumen_dcc> muestra un resumen de como van los juegos del dccapitolio hasta ahora
<ganaste> se imprime en caso que ningún otro tributo quede con vida, indicando que ganaste los juegos
<perdiste> se imprime en caso que la vida de tu tributo sea 0, donde lo mataron y se acaban los juegos


### Cosas implementadas y no implementadas :white_check_mark: :x:

Explicación: mantén el emoji correspondiente, de manera honesta, para cada item. Si quieres, también puedes agregarlos a los títulos:
- ❌ si **NO** completaste lo pedido
- ✅ si completaste **correctamente** lo pedido
- 🟠 si el item está **incompleto** o tiene algunos errores

#### Programación Orientada a Objetos: 38 pts (27%)
##### ✅  Diagrama: 
El diagrama de clases se explica de la siguiente manera:

las clases abstractas son ambiente y objeto.
Esto porque: todos los ambientes tienen características generales como un nombre que los distingue o eventos que pueden suceder. Ademas tienen un metodo abstracto que representa el daño provocado por el ambiente. Hereda playa, motaña y bosque. Puesto que son los 3 tipos especificos de ambientes que pueden hber en el DCCapitolio. 
Similarmente, todos los objetos tienen los mismos atributos: nombre, tipo, peso. Su método abstracto es dar el beneficio al tributo. A que cosa del tributo se le da este beneficio depende exclusivamente del tipo de objeto con el que estemos tratando. Arma - consumible - especial.

La clase arena y Tributo no son abstractas y tienen métodos específicos.
Todos los tributos tienen los mismos atributos: vida, energia, esta vivo, agilidad, fuerza, ingenio, popularidad , mochila, peso
Todas las arenas tienen nombre, dificultad, riesgo 

Es importante recalcar que la clase arena es como la "principal" del programa, ya que sin una arena no puede haber juego. 
A esta clase, mediante agregacion, se le vinculan los tributos, pues pueden haber uno o varios tributos simultaneamente en la misma arena.
Asi mismo ocurre con los ambientes, puesto que en cada arena pueden ocurrir 3 ambientes distintos, los cuales van cambiando cada hora
Finalmente, mediante agregación tambien, pero a la clase tributo están los objetos, pues un tributo puede contar con 0 a muchos de estos si los patrocinadores se los proporcionan. 

,
##### ✅ Definición de clases, atributos y métodos
 <Clase Tributo: Representa a cada tributo y sus respectivas características: nombre,distrito,edad,vida,energía,agilidad,fuerza,ingenio,popularidad. En caso del tributo propip elegido, también se presenta una mochila con los objetos que contiene y un peso con el peso de estos objetos. Tiene los métodos atacar, que retorna el daño provocado a otro tributo. utilizar objeto: que permite obtener los beneficios del objeto en caso de tener alguno en la mochila. Accion heroica: que permite gastar energia a cambio de popularidad. Pedir objetos: que permite obtener un objeto si tiene la suficente popularidad.
 Clase Ambiente: Clase abstracta que representa los 3 ambientes posibles del juego. Playa - montana - bosque. Contiene el metodo abstracto que calcula el dano dependiendo de cada ambiente y si se ejecuto algún evento especifico de ese ambiente o no. 
 Clase arena: Representa la arena elegida por el jugador para llevar a cabo su partida. tiene los metodos ejecutar_evento que determina si ocurre o no el evento especifico de cada ambiente y tambien el metodo encuentros que simula los encuentros de todos los otros tributos que no son controlados por el jugador (pero si pueden atacarte a ti)
 Clase objetos: clase absracta que representa los 3 tipos de posibles objetos que hay en el juego. arma- consumible - especial. contiene el metodo abstracto dar_beneficio que entrega a los tributos el beneficio dependiendo del tipo de objeto que sea. >
##### ✅ Relaciones entre clases <La clase arena es la principal del juego, pues en esta se ejecuta todo el programa. Mediante agregación, en una arena pueden existir una o varios tributos, los cuales están constantemente sumergidos en un ambiente en particular. Ademásm estos pueden tener o no tener objetos, por lo cual la clase objeto tambíen se agrega a la clase tributo. De las clases abstractas: Ambiente y objetos, se heredan 6 clases montana - playa - bosque y consumible - arma - especial, respectivamente. Estas clases representan las caracteristicas especiales de cada tipo de ambiente y objeto. >
#### Simulaciones: 12 pts (8%)
##### ✅ Crear partida <El programa permite correctamente crear una partida. En caso de salir, se espera un segundo y se vuelve a imprimir el menú a ver si se anima a partir. En caso de ir volver atrás, el juego se reinicia, pues sería trampa cambiar de tributo en la mitad de la partida. >
#### Acciones: 43 pts (30%)
##### ✅ Tributo <Estas 4 clases se explican en Definición de clases, atributos y métodos>
##### ✅ Objeto <Estas 4 clases se explican en Definición de clases, atributos y métodos>
##### ✅ Ambiente <Estas 4 clases se explican en Definición de clases, atributos y métodos>
##### ✅ Arena <Estas 4 clases se explican en Definición de clases, atributos y métodos>
#### Consola: 34 pts (24%)
##### ✅ Menú inicio <Se imprime correctamente el menú de inicio. Es a prueba de errores y en caso de querer jugar se despliegan los tributos, seguido de las arenas disponibles. >
##### ✅ Menú principal <Se imprime correctamente el menú principal. Es a prueba de errores y las 4 opciones funcionan de manera correcta. Además, permite volver atrás. (a seleccionar otro tributo para controlar y comenzar de nuevo o directamente al menú de inicio.)>
##### ✅ Simular Hora <Se imprime correctamente la simulación de hora. Es a prueba de errores y las 4 opciones funcionan de manera correcta. Además, permite volver atrás al menú principal \>
##### 🟠 Robustez <Como se mencionó antes hay veces que se bugea y a pesar que no queden tributos con vida no se imprime el menú de que ganaste. Hay errores con terminar el programa.>
#### Manejo de archivos: 15 pts (11%)
##### ✅ Archivos CSV  <Los archivos son abiertos de manera correcta siguiendo el encoding utf-8 como se pide. Dentro de cada archivo se van iterando e instanciando las clases según sea necesario. >
##### ✅ parametros.py <Están todos los parámetros pedidos e importados de manera correcta en el main.  >
#### Bonus: 3 décimas máximo
##### ❌ Guardar Partida <no ejecuté el bonus para guardar la partida.>

## Ejecución :computer:

El módulo principal de la tarea a ejecutar es  ```main.py```. Además se debe crear los siguientes archivos y directorios adicionales:
1. ```Clases_ambientes.py``` 
2. ```Clases_arena.py``` 
3. ```Clases_objetos.py``` 
4. ```Clases_tributos.py``` 
5. ```parametros.py``` 
# importante: Todos estos archivos se encuentran en el mismo directorio que la tarea1, mi repositorio personal de github T1.


## Librerías 
### Librerías externas utilizadas
La lista de librerías externas que utilicé fue la siguiente:

1. ```abc```: ```ABC, abstractmethod``` (para poder declarar las clases abstractas)
2. ```time```: ```sleep``` (para poder hacer esperar a que se impriman ciertas cosas)
3.  ```random```: ```random``` (para poder obtener números aleatorios)

### Librerías propias
Por otro lado, los módulos que fueron creados fueron los siguientes:

1. ```parametros```: Contiene a los parametros necesarios de la tare
2. ```Clases_ambientes.py```  Contiene a la clase abstracta ambientes y sus 3 clases hijas: playa - montana - bosque 
y sus respectivos métodos
2. ```Clases_arena.py```  contiene a la clase arena y sus respectivos metodos
3. ```Clases_objetos.py``` Contiene a la clase abstracta objetos  y sus 3 clases hijas: arma - consumible - especial
y sus respectivos métodos
4. ```Clases_tributos.py```  contiene a la clase tributo y sus respectivos métodos

## Supuestos y consideraciones adicionales :thinking:
Los supuestos que realicé durante la tarea son los siguientes:

1. <Solo se puede volver atrás en los menús principales del juego: siendo estos menu_inicio , menú_principal y simulación_hora. Esto es valido porque el resto de las cosas impresas en consola tienen obligación de ser contestadas, como que tributo quiero elegir, que tributo quiero atacar, en que arena quiero jugar, etc. > 

## Referencias de código externo :book:

Para realizar mi tarea saqué código de:
1. \<https://github.com/IIC2233/Syllabus/blob/main/Ayudant%C3%ADas/AY3/AY3_Excepciones.ipynb>: esta funcion revisa que los inputs entregados por el usuario sean válidoso y está implementado en el archivo <nmain.py> en las líneas <11 y 21> 

## Descuentos
Creo haberme pasado en varias lineas de 100 carácteres. (si esque los tabs cuentan)
La guía de descuentos se encuentra [link](https://github.com/IIC2233/syllabus/blob/main/Tareas/Descuentos.md).
