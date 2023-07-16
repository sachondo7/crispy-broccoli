# la implementacion de un diccionario es muy parecido a python
sample_hash = {'a' => 1, 'b' => 2, 'c' => 3}
puts sample_hash['b']

# rails usa la sintaxis de simbolos para los diccionarios
another_hash = {a: 1, b: 2, c: 3}
puts another_hash[:a]

# es posible iterar sobre los diccionarios de la misma manera
sample_hash.each do |key, value|
    puts "The class for key is #{key.class} and the value is #{value.class}"
end

#para agregar un elemento al diccionario
sample_hash[:d] = "Eduardo"

#y para cambiar un elemento ya existente
sample_hash[:c] = "Ruby"