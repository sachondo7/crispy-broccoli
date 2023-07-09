import threading
import time


def trabajador_rapido():
    # Función rápida, que toma 2 segundos
    thread_actual = threading.current_thread()
    print(f"{thread_actual.name} partiendo...")
    # Pondremos a dormir el thread por 2 segundos simulando 
    # que ocurre algun proceso dentro de la función
    time.sleep(2) 
    print(f"{thread_actual.name} terminando...")

def trabajador_lento():
    # Función lenta, que toma 6 segundos
    thread_actual = threading.current_thread()
    print(f"{thread_actual.name} partiendo...")
    # Ponemos a dormir el thread por 6 segundos simulando
    # un proceso más largo que el anterior dentro de la función
    time.sleep(6) 
    print(f"{thread_actual.name} terminando...")

# Creamos los threads usando la clase Thread
hilo_lento = threading.Thread(name="Hilo lento (6s)", target=trabajador_lento)
hilo_rapido_1 = threading.Thread(name="Hilo rápido (2s)", target=trabajador_rapido)
hilo_rapido_2 = threading.Thread(target=trabajador_rapido)  # Usa el nombre asignado por defecto
print("Thread principal: Fueron creados 3 threads")

# Se inicializan los threads creados
hilo_rapido_1.start() # Dormirá por 2 segundos
hilo_rapido_2.start() # Dormirá por 2 segundos
hilo_lento.start() # Dormirá por 6 segundos
print("Thread principal: Fueron iniciados 3 threads")
# Todas estas líneas serán ejecutadas mientras los threads
# se ejecutan independientemente del programa principal

print()
# El thread principal ejecutará lo que queda de código
# mientras los otros 3 threads hacen lo suyo

for i in range(10):
    print(f"Thread principal: Segundo actual: {i}")
    time.sleep(1)