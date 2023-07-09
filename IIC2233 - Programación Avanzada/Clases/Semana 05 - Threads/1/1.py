import threading

def contar_diez_ovejas():
    print("Tengo sueño...")
    for numero in range(1, 11):
        print(f"({numero} oveja{'s' if numero > 1 else ''})")
    print("A dormir...")


mi_hilo = threading.Thread(target=contar_diez_ovejas)
mi_hilo.start()