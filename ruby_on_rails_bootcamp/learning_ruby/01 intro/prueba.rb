puts "Hola mundo!"

print "Hola mundo!\n"

greeting = "Hola mundo!"

puts greeting

def say_hello(name)
  puts "Hola #{name}!"

end

say_hello("Juan")

# string interpolation
nombre = "Sebastian"
apellido = "Achondo"
puts "Mi nombre es #{nombre} #{apellido}"

# todo en ruby son clases asique puedo usar los métodos de las clases de manera automatica con cualquier variable
puts nombre.class
puts "Hola mundo!".length

# para tener input del usuario
puts "Ingrese su nombre: "
nuevo_nombre = gets.chomp
puts "Hola #{nuevo_nombre}!"
# ojo que gets.chomp siempre devuelve un string, si queremos cambiarlo lo hacemos con su metodo correspondiente

# lo mismo para numeros
puts 10/4 # 2
puts 10.0/4 # 2.5

puts "-" * 20

