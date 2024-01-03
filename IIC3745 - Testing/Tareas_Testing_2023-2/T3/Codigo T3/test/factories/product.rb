FactoryBot.define do
  factory :product do
    nombre { 'Producto de prueba' }
    precio { 100 }
    stock { 10 }
    user
    categories { 'Cancha' }
  end
end
