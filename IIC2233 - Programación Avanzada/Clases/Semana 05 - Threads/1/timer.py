import threading

def mi_timer(ruta_archivo):
    with open(ruta_archivo) as archivo:
        for linea in archivo:
            print(linea)

t1 = threading.Timer(10.0, mi_timer, args=("files/mensaje_01.txt",))
t2 = threading.Timer(5.0, mi_timer, kwargs={"ruta_archivo": "files/mensaje_02.txt"})

t1.start() # el thread t comenzará después de 10 seconds
t2.start() # el thread t comenzará después de 5 seconds