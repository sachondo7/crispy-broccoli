## Tarea 4

### Logros de la entrega:
  Se cumplió con la tarea completa, Sebastián estuvo a cargo de implementar la mejora de canchas y mantener y actualizar los tests de los controladores a 100%. 
  Pablo fue quien se encargó de los tests de sistema. 
  
### Informacion para el correcto:
  Se borró el método `def address_params
    params.require(:address).permit(:nombre, :direccion, :comuna, :region)
  end` ya que no se utilizaba en ninguna parte, ademas que la direccion venia comentada en el método crear_solicitudes, por lo que este método no se incluyó para la cobertura de 100% de shopping_cart.

Cambios al proyecto:

Actualize a selenium 4.11 para evitar problemas con el driver
Cambie el tipo de dato de precio, de string a int

### CAMBIOS TAREA 4:

#### Mejoras en reservas de canchar. 
Para la mejora de canchas ahora se verifica que las reservas estén dentro del horario disponible de cada cancha. Cuando se crea una nueva cancha la fecha debe estar en formato 12/12/2023 y las horas 00:00. 

No se hicieron las validaciones que si un usuario reserva una cancha a cierta hora, otro usuario no puede hacer la misma reserva a esa misma hora, ya que no se explicitaba en el enunciado. 

Tampoco se agregó un parametro de duración de la reserva como para verificar si se excede el tiempo en que la cancha está operativa ya que tampoco se especifica en el enunciado. 

No se modificaron ni se crearon nuevos modelos ni controladores, solo se agregaron nuevas validaciones en el modelo de product, especificamente `def horario_disponible?(fecha)` y en el controlador de solicitudes se agrego la condición que tiene que estar el producto disponible para esa fecha, especificamente en la parte de `unless producto.horario_disponible?(fecha)`.

#### Tests de sistema. 
Se utilizó capybara para los test de sistema. En los test de navegación se aprietan botones para poder llegar a una vista en particular, y si llega a la vista que queremos el test es aceptado y de lo contrario es rechazado. En especifico se hicieron los tests `register from landing page, and then visit my profile`, `login as regular user, send contact message and stay in the same page` y `login as admin user and check messages`.
Por el lado de los test de los Forms se ingresan distintos inputs para comprobar que la vista muestra lo que uno quiere que muestre. En especifico se testearon los formularios relacionados a product y a contact_message. 
