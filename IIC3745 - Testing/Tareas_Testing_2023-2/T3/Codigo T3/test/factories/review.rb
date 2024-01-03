FactoryBot.define do
  factory :review do
    tittle { 'Titulo prueba' }
    description { 'Descripcion prueba' }
    calification { 5 }
    user
    product
  end
end
