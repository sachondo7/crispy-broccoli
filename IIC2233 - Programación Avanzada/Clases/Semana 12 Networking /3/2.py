# Implementación del cliente que envía los datos en formato JSON.
# Pon atención en la serialización y transformación a bytes.

import json
import socket

server_host = ''  # Debemos poner aquí la dirección IP del servidor.
                  # Si no ponemos nada, supone que estamos hablando con un programa en el mismo host.
server_port = 12345

# Generamos la información que enviaremos; en este caso, es un simple diccionario.
data = {1: "Hola", 2: "Chao"}
mensaje = json.dumps(data)

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.connect((server_host, server_port))

# Debemos enviar bytes.
sock.sendall(mensaje.encode('utf-8'))

# Decodificamos los bytes y luego los deserializamos con JSON.
data = json.loads(sock.recv(4096).decode('utf-8'))
print(data)
input("ENTER para terminar.")
sock.close()