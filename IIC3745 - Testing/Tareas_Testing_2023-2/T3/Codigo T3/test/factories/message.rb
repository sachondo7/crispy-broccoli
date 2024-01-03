FactoryBot.define do
  factory :message do
    body { 'Contenido del mensaje' }
    user
    product
  end
end
