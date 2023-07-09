# Tarea 2: Nombre de la tarea DCCrossyFrog
# Sebastian Achondo Silva
# 20203918 
# 20830920-K

**Dejar claro lo que NO pudieron implementar y lo que no funciona a la perfección. Esto puede sonar innecesario pero permite que el ayudante se enfoque en lo que sí podría subir su puntaje.**

## Consideraciones generales :octocat:

La tarea cumple en lineas generales con lo que se pide, se puede jugar al juego correctamente.
El nombre se verifica que cumpla con el largo establecido y sea alfanumérico 
La comunicación entre ventanas resulta exitosa, pues cada vez que se abre una se cierra la otra.
El choque con los autos funciona de manera correcta, además está implementado el checkpoint que se vuelve a la zona media de pasto en caso de lograr sobrepasar los troncos. 
Cuando se pasa al siguiente nivel, la velocidad tanto de los autos y los troncos aumenta.
Cada vez que la rana llega a la meta se abre automaticamente la ventana de resumen. 
El puntaje se va actualizando a medida que uno avanza en el nivel.
Los diferentes objetos al ser agarrados funcionan correctamente, reflejando su función en la interfaz de usuario. 
Los troncos no fueron bien implementados, ya que el personaje no se mueve junto a ellos en caso de chocar. (No quise hacer tampoco que el personaje muriera en caso de tocar el agua ya que sería imposible llegar a los autos), así también, tampoco implemente la mecanica de los saltos y solo es posible mover al personaje con las teclas "wasd". 



### Cosas implementadas y no implementadas :white_check_mark: :x:

Explicación: mantén el emoji correspondiente, de manera honesta, para cada item. Si quieres, también puedes agregarlos a los títulos:
- ❌ si **NO** completaste lo pedido
- ✅ si completaste **correctamente** lo pedido
- 🟠 si el item está **incompleto** o tiene algunos errores
#### Ventana de Inicio: 4 pts (3%)
##### ✅ Ventana de Inicio <Se visualiza bien la pagina de inicio sin que los elementos se sobrepongan>
#### Ventana de Ranking: 5 pts (4%)
##### ✅ Ventana de Ranking <Se visualiza bien la pagina de ranking sin que los elementos se sobrepongan, además, se actualiza si un jugador obtiene un puntaje mayor.>>
#### Ventana de juego: 13 pts (11%)
##### ✅ Ventana de juego <Se visualiza bien la pagina de inicio sin que los elementos se sobrepongan, esta va actualizando constantemente el tiempo que queda y las vidas del jugador>
#### Ventana de post-nivel: 5 pts (4%)
##### ✅ Ventana post-nivel <Se visualiza bien la pagina de post nivel sin que los elementos se sobrepongan, esta va actualizando constantemente según se pasa de ronda>
#### Mecánicas de juego: 69 pts (58%)
##### 🟠 Personaje <Se ve el personaje de manera fluida, pero no implemente 3 sprites distintos por cada direccion y tampoco la mecánica del salto. Tampoco hice que el personaje se moviera con los troncos>
##### ✅ Mapa y Áreas de juego <EL mapa está bien diseñado como se pide con 2 carreteras y un rio cada uno con 3 autos o troncos en direccion aleatoria (intercalada para los troncos)>
##### ✅ Objetos <Aparace un objeto aleatorio bajo el tiempo del parametro TIEMPO_OBJETO en un lugar aleatorio del mapa que no sea la meta ni el rio.>
##### ✅ Fin de Nivel <Apenas la rana toca la meta se pasa a la ventana de post nivel>
##### ✅ Fin del juego <Cuando se te acaban las vidas o el tiempo se detiene automáticamente la partida>
#### Cheatcodes: 8 pts (7%)
##### ❌ Pausa <explicacion\>
##### ❌V + I + D <explicacion\> NO IMPLEMENTADO
##### ❌ N + I + V <explicacion\>
#### General: 14 pts (12%)
##### ✅ Modularización <Todo lo visual esta en el frontend y lo lógico en el backend>
##### ✅ Modelación <Fui lo menos acoplado y lo más cohesivo posible>
##### ✅ Archivos  <Los archivos son manipulados correctamente>
##### ✅ Parametros.py <Los parámetros son fijos y bien implementados>
#### Bonus: 10 décimas máximo
##### ❌ Ventana de Tienda <NO IMPLEMENTADO>
##### ✅ Música <Se escucha la múscia al iniciar el juego >
##### ✅ Checkpoint <Al chocar >

## Ejecución :computer:
El módulo principal de la tarea a ejecutar es  ```main.py```. Además se debe crear los siguientes archivos y directorios adicionales:
1. ```mis sprites``` en ```T25```
2. ```logica_inicio``` en ```backend```
3. ```logica_juego``` en ```backend```
4.```logica_puntajes``` en ```backend```
5.```logica_resumen``` en ```backend```
6```puntajes.txt``` en ```backend```
7```ventana_inicio``` en ```frontend```
8```ventana_juego``` en ```frontend``
9```ventana_ranking``` en ```frontend```
10```ventana_resumen``` en ```frontend```
Es importante mencionar que las ventanas juego, ranking y resumen las hice en qtdesigner por lo que se encuentra tambien su archivo .ui correspondiente.



## Librerías :books:
### Librerías externas utilizadas
La lista de librerías externas que utilicé fue la siguiente:

1. random: random (para poder obtener números aleatorios)
2. PyQt5.QtWidgets : QApplication,QWidget, QLabel, QLineEdit, QPushButton, QHBoxLayout, QVBoxLayout (para organizar la distribución de los elementos de cada ventana)
3. PyQt5.QtCore: pyqtsignal Qtimer, Qobject (señales y timers)
4. PyQt5.QtGui: QpixMap (darle forma a las fotos)
5. PyQt5: uic, QtMultimedia (importar qtdesigner y la música)

### Librerías propias
Por otro lado, los módulos que fueron creados fueron los siguientes:

1. ```Parametros```: Contiene a los parametros necesarios de la tarea. 
2. ```Ventanainicio``: Hecha para <desplegar la info del inicio>
3.  ```Logicainicio``: Hecha para <se encarga de la logica que sigue el inicio>
4.  ```Ventanajuego``: Hecha para <desplegar e ir actualizando la informacion que se ve en la ventana de juego>
5.  ```Rana``: Hecha para <la logíca de como se mueve la rana y que puede y no puede hacer>
6.  ```Obstaculo``: Hecha para <la logica de tanto los troncos y los autos y como estos se tienen que mover>
7.  ```Objeto``: Hecha para <la logica de cada objeto y las restricciones de donde no pueden aparecer>
8. ```VentanaRanking``: Hecha para <desplegar la info de los mejores 5 ranking>
9. ```VentanaResumen``: Hecha para <desplegar la info del resumen de cada nivel>
10. ```Ventanainicio``: Hecha para <desplegar la info del inicio>
11. ``Musica``: Hecha para <iniciar la música>


## Supuestos y consideraciones adicionales :thinking:
Los supuestos que realicé durante la tarea son los siguientes:

1. <El supuesto que hice fue que los autos solo pueden haber uno al mismo por hilera, ya que como estos van aumentando su velocidad conforme avanza el nivel, si hago aparecer mas de uno se irán superponiendo unos con otros.> 
2. <En la fórmula de la nueva velocidad de los troncos y autos, cambie el orden de la fraccion ya que este es el arugmento que le entrego al qtimer y entre más bajo sea el argumento más rapido irán los autos>




Si quieren ser más formales, pueden usar alguna convención de documentación. Google tiene la suya, Python tiene otra y hay muchas más. La de Python es la [PEP287, conocida como reST](https://www.python.org/dev/peps/pep-0287/). Lo más básico es documentar así:

Las funciones están comentadas en cada archivo correspondiente indicando su finalidad.

## Referencias de código externo :book:

Para realizar mi tarea saqué código de:
1. \https://github.com/IIC2233/sachondo7-iic2233-2021-2/tree/main/Actividades/AS3>: este es el de la Actividad sumativa 3 y lo utilicé para guiarme como estructura de la tarea. 


## Descuentos
Me pasé de los 100 carácteres en varias líneas. 
