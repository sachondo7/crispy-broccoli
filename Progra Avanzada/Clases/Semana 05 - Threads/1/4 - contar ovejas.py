import threading
import time


def contar_ovejas_hasta(max_ovejas):
    thread_actual = threading.current_thread()
    print(f"{thread_actual.name} tiene sueño...")
    for numero in range(1, max_ovejas + 1):
        time.sleep(1)
        print(f"({thread_actual.name}: {numero} oveja{'s' if numero > 1 else ''})")
    print(f"{thread_actual.name} a dormir...")


# Se crean los threads usando la clase Thread, asociada a la función objetivo para 
# ser ejecutada por el thread, y los atributos de la función son ingresados en 
# args o kwargs

t1 = threading.Thread(name="Thread 1", target=contar_ovejas_hasta, args=(10,))
t2 = threading.Thread(name="Thread 2", target=contar_ovejas_hasta, kwargs={"max_ovejas": 15})
t1.start()
t2.start()