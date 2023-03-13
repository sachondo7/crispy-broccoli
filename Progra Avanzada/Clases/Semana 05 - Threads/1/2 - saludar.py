import threading

def saludar():
    thread_actual = threading.current_thread()
    print(f"Hola desde {thread_actual.name}")


hilo_1 = threading.Thread(name="Mi thread 1", target=saludar)
hilo_2 = threading.Thread(name="Mi thread 2", target=saludar)
hilo_1.start()
hilo_2.start()