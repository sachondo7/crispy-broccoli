import sys
from PyQt5.QtCore import QRect
from PyQt5.QtWidgets import QApplication
from backend.logica_puntajes import LogicaRanking
from frontend.ventana_juego import VentanaJuego
from frontend.ventana_ranking import VentanaRanking
from frontend.ventana_resumen import VentanaResumen
import parametros as p
from backend.logica_inicio import LogicaInicio
from backend.logica_juego import Obstaculos, Objetos, Rana
from frontend.ventana_inicio import VentanaInicio


if __name__ == '__main__':
    def hook(type, value, traceback):
        print(type)
        print(traceback)
    sys.__excepthook__ = hook
    app = QApplication([])

    # Instanciación de ventanas
    tamano_ventana = QRect(*p.WINDOW_SIZE_ARGS)
    ventana_inicio = VentanaInicio(tamano_ventana)
    ventana_ranking = VentanaRanking()
    ventana_juego = VentanaJuego()
    ventana_resumen = VentanaResumen()

    # Instanciación de lógica
    logica_inicio = LogicaInicio(p.RUTA_CANCION)
    rana = Rana(*p.POS_INICIAL_RANA)
    objeto = Objetos()
    logica_ranking = LogicaRanking()

#     # ~~ Conexiones de señales ~~
    ventana_inicio.senal_enviar_login.connect(logica_inicio.comprobar_usuario)
    logica_inicio.senal_respuesta_validacion.connect(ventana_inicio.recibir_validacion)
    logica_inicio.senal_abrir_juego.connect(ventana_juego.mostrar_ventana)
    logica_inicio.senal_abrir_ranking.connect(ventana_ranking.mostrar_ventana)
    logica_inicio.senal_abrir_ranking.connect(ventana_inicio.ocultar)
    ventana_ranking.senal_volver.connect(ventana_inicio.mostrar)
    ventana_ranking.senal_volver.connect(ventana_ranking.ocultar)
    logica_ranking.senal_volver.connect(ventana_ranking.ocultar)
    ventana_ranking.senal_ordenar_ranking.connect(logica_ranking.desplegar_ranking)
    logica_ranking.senal_lista_puntajes.connect(ventana_ranking.actualizar_ventana)
    ventana_juego.senal_volver.connect(ventana_inicio.mostrar)
    ventana_juego.senal_volver.connect(ventana_juego.ocultar)
    ventana_juego.senal_tecla.connect(rana.cambiar_direccion)
    ventana_juego.senal_pasar_menu_resumen.connect(ventana_resumen.mostrar_ventana)
    ventana_juego.senal_pasar_menu_resumen.connect(ventana_juego.ocultar)
    rana.senal_actualizar_ventana.connect(ventana_juego.actualizar_ventana)
    ventana_resumen.senal_siguiente_nivel.connect(ventana_juego.mostrar_ventana)
    ventana_resumen.senal_siguiente_nivel.connect(ventana_resumen.salir)
    ventana_juego.senal_reiniciar_rana.connect(rana.reiniciar_rana)
    ventana_juego.senal_perder.connect(ventana_resumen.mostrar_ventana)
    ventana_juego.senal_perder.connect(ventana_juego.ocultar)
    ventana_juego.senal_pasar_menu_resumen.connect(ventana_resumen.actualizar_ventana)
    objeto.senal_parametros_objetos.connect(ventana_juego.actualizar_objetos)
    logica_inicio.senal_usuario.connect(logica_ranking.nuevo_nombre)
    ventana_resumen.senal_ranking.connect(logica_ranking.nuevo_puntaje)
    ventana_resumen.senal_ventana_ranking.connect(ventana_ranking.mostrar_ventana)
    ventana_resumen.senal_ventana_ranking.connect(ventana_resumen.salir)
    ventana_inicio.mostrar()
    app.exec()