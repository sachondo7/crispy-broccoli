import threading
import time


# Usamos la definicion de los Thread declarados en el ejemplo anterior
# Se crean los threads usando la clase Thread.
cristian = CuentaOvejas("Cristian", 3)
cot = CuentaOvejas("Cote", 6)
antonio = CuentaLiebres("Antonio", 3)
joaquin = CuentaLiebres("Joaquin", 15)

# Se inicializan los threads creados
cristian.start()
cot.start()
antonio.start()
joaquin.start()
print("Ayudantes: Los profes se fueron a la cama...")

antonio.join()  # Esperaremos lo que sea necesario.
print("Ayudantes: ¡ANTONIO SE DURMIÓ!")
cristian.join() # No especificamos timeout, esperará lo que sea necesario
print("Ayudantes: ¡CRISTIAN SE DURMIÓ!")
cot.join() # Esperaremos lo que sea necesario.
print("Ayudantes: ¡COTE SE DURMIÓ!")
joaquin.join(1)  # Esperaremos máximo 1 segundos después del último dormido, ya es muy tarde

if joaquin.is_alive():
    print("Ayudantes: Joaquín sigue despierto 😞. A la casa cabros.")
else:
    print("Ayudantes: ¡Todos los profes se durmieron! ¡A festejar!")
    for i in range(10):
        print("Ayudantes: 🎵🎶🎵🎶🎵🎶🎵🎶🎵🎶🎵🎶🎵🎶🎵🎶")
        time.sleep(1)