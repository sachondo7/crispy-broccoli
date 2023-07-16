array = [1,2,3,4,5,6,7,8,9,10]
print array
puts
# igual que en python, el primer elemento es el 0
puts array[0]

# para crear un array automatico
x = (1..30).to_a
print x
puts
print x.reverse
puts

# para agregar un elemento al final del array
array << 11
print array
puts

# para agregar un elemento al principio del array
array.unshift(0)
print array
puts

# pop funciona igual que en python, saca el ultimo elemento del array y lo guarda
b = array.pop

# tambien tenemos los metodos join y split que unen y separan strings respectivamente con algun criterio si necesario