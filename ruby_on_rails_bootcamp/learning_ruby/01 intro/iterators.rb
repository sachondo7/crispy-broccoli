# a diferencia de python, aqui se itera con each
array = [1,2,3,4,5,6,7,8,9,10]
array.each do |x|
    print x
end
puts
# y para hacerlo en una sola linea
array.each {|x| print x}
puts

# y cuando queremos trabajar con booleanos usamos el metodo select
array = (1..100).to_a.shuffle
array.select {|num| puts num.even?}