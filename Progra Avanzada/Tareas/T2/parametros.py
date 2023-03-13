
import os
from random import random

#Parametros obligatorios
VIDAS_INICIO = 10
VIDAS_TRAMPA = 100
TIEMPO_AUTOS = 1
TIEMPO_TRONCOS = 1
TIEMPO_OBJETOS = 5000
CANTIDAD_MONEDAS = 0
DURACION_RONDA_INICIAL = 60
VELOCIDAD_AUTOS = 500
VELOCIDAD_TRONCOS = 200
PONDERADOR_DIFICULTAD = random()
MIN_CARACTERES = 1
MAX_CARACTERES = 10
VELOCIDAD_CAMINAR = 40
PIXELES_SALTO = 10


# Teclas
TECLA_ARRIBA = "w"
TECLA_IZQUIERDA = "a"
TECLA_ABAJO = "s"
TECLA_DERECHA = "d"

# Parámetros VentanaInicio:
WINDOW_SIZE_ARGS = (200, 200, 400, 400)

MIN_X = 0
MAX_X = 660
MIN_Y = 69
MAX_Y = 551
Y_INICIAL = (MAX_Y + MIN_Y) // 2
LARGO_RANA = 8
WIDTH_RANA = 40
HEIGHT_RANA = 40
LARGO_ELEMENTO = 15
WIDTH_ELEMENTO = 100
HEIGHT_OBJETO = 30 
WIDTH_OBJETO = 30
HEIGHT_ELEMENTO = 30
POS_INICIO_ITEM = (110, 225, 10, 10)
POS_INICIAL_RANA = (300, 550)

# Parámetros LogicaJuego
RANGO_APARICION_ITEM = 15
VELOCIDAD = 1

# Parámetros generales y paths:
NIVEL = 1
PUNTAJE = 0
RUTA_VENTANA_JUEGO = os.path.join("sprites", "logo")

RUTA_CARRETERA = os.path.join("sprites", "Mapa", "areas" , "carretera.png")
RUTA_PASTO = os.path.join("sprites", "Mapa", "areas" , "pasto.png")
RUTA_RIO = os.path.join("sprites", "Mapa", "areas" , "rio.png")

RUTA_AUTO_RIGHT = os.path.join("sprites", "Mapa", "autos" , "amarillo_right.png")
RUTA_AUTO_LEFT = os.path.join("sprites", "Mapa", "autos" , "amarillo_left.png")
RUTA_TRONCO = os.path.join("sprites", "Mapa", "elementos", "tronco.png")


RUTA_CALAVERA = os.path.join("sprites", "Objetos", "Calavera.png")
RUTA_CORAZON = os.path.join("sprites", "Objetos", "Corazon.png")
RUTA_MONEDA = os.path.join("sprites", "Objetos", "Moneda.png")
RUTA_RELOJ = os.path.join("sprites", "Objetos", "Reloj.png")

RUTA_ABAJO = os.path.join("sprites", "Personajes", "Verde", "down_1.png")
RUTA_ARRIBA = os.path.join("sprites", "Personajes", "Verde", "up_1.png")
RUTA_LEFT = os.path.join("sprites", "Personajes", "Verde", "left_1.png")
RUTA_RIGHT = os.path.join("sprites", "Personajes", "Verde", "right_1.png")
RUTA_JUMP = os.path.join("sprites", "Personajes", "Verde", "jump_1.png")

RUTA_CANCION = os.path.join('canciones', 'musica.wav')

# Extras
stylesheet_boton = """QPushButton {
    background-color: white;
    border-style: outset;
    border-width: 10px;
    border-radius: 20px;
    border-color: grey ;
    font: bold 14px;
    min-width: 4em;
    padding: 6px;
    color: black;
}
QPushButton:pressed {
    background-color: rgb(144, 74, 16);
    border-style: inset;
}"""

RUTA_MENU_JUEGO = os.path.join("frontend", "ventana_juego.ui")
RUTA_MENU_RESUMEN = os.path.join("frontend", "ventana_resumen.ui")
RUTA_MENU_RANKING = os.path.join("frontend", "ventana_ranking.ui")


