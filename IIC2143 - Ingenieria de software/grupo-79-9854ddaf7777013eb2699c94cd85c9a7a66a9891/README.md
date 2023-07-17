Los relatos de usuario especificados se encuentran en la carpeta "docs" en formato de PDF. Se realizó y se utilizó rubocop dentro del proyecto de manera exitosa.

Sprint 0:
OJO: No sabemos por qué, pero hay que inicializar el servidor de postgresql de la base de datos del proyecto, para abrir la página (lo que nos hace mucho sentido, pero ¿Será siempre necesario?). La página se corre de manera perfecta, pero no sabemos porqué no se abre en el Heroku, el cual aplicamos también exitosamente como se puede comprobar. Se ver cómo nuestro deploy de heroku funcionó y que la página también nos corre al correr postgresql, pero tira error en el heroku.
Tambien se tiene que crear la base de datos y luego migrarla, si se quiere abrir la pagina web desde otro computador.

Sprint 1:

Para comenzar de agrego el metodo de devise, para crear los usuarios y registrarlos, esto se utilizo para que solamente usuarios iniciados de sesion puedan crear, eliminar, editar publicacion. El usuario no logueado solamente puede ver publicaciones. Luego se agrego el metodo de Publicaciones, que represetan cada turno que puede crear un usuario. Aqui implementamos el CRUD, correspondiente, tambien agregamos el metodo Request, que represetan las solicitudes con sus correspondientes CRUD. Luego hicimos las validaciones y testing para cada modelo. No implementamos los testings de helpers, puesto que no utilizamos ni un helper por el momento, esto no lo implementamos, puesto que no era necesario para esta entrega. Luego ejecutamos rubocop. Intentamos corregir la mayor cantidad de errores, agregando restricciones al archivo de rubocop. Las ofensas que no se pudieron solucionar es porque eran errores dificilmente solucionables, como por ejemplo, no utilizar variables globales, pero estas son necesarias para el funcionamiento de la applicacion. El index para ver los porcetanjes de los test, esta en la carpeta coverage, y no en la carpeta public

Sprint 2: 

Durante esta entrega se hicieron las respectivas asociaciones: entre los usuarios, las publicaciones y las solicitudes de turno. Así también, se creó el CRUD de reseñas con sus respectivas asociaciones y validaciones. 
Se implementó la funcionalidad de poder ofrecer un turno y solicitar un turno a un usuario diferente al mio siempre y cuando este usuario esté registrado. Mi usuario tiene la capacidad de aceptar o rechazar las solicitudes, donde te pueden hacer una reseña entre una calificación de 1 a 5 y una breve explicación. 
Por último, mediante la plataforma bulma se hicieron modificaciones en el frontend de la página, agregandole colores, diseños más llamativos, la posibilidad de poder agregar fotos a los perfiles, etc. 
Finalmente, mediante Rspec se logró cubrir con 25 pruebas de testing, obteniendo un 50% de cobertura en controladores y un 100% de cobertura en los modelos. 
Todas las funcionalidades fueron trabajadas en distintas ramas de git para luego hacer un merge a main y a medida que se iba trabajando se fue actualizando el tablero trello. 

Sprint 3: 
 
En esta entrega se creó un filtro para poder ordenar las publicaciones según la fecha y la hora de forma ascendente o descendente. También se implemento el sistema de administrador para poder moderar las publicaciones, reseñas y usuarios indebidos. Por último, se hicieron los CRUDS de Rooms y Messages, los cuales permiten a la aplicación la funcionalidad de poder tener un chat con todos los miembros aceptados de una aplicación. Con rspec se obtuvieron más de 35 pruebas unitarias con más de 65% de cobertura. 
Todas las funcionalidades fueron trabajadas en distintas ramas de git para luego hacer un merge a main y a medida que se iba trabajando se fue actualizando el tablero trello.

ADMIN USERNAME: ADMIN1@EXAMPLE.COM

ADMIN PASSWORD: PASSWORD1

HEROKU: https://iic2143grupo79.herokuapp.com/
