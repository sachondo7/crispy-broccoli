# frozen_string_literal: true

require 'faker'
# Una factory nos permitirá crear de manera sencilla instancias de una clase con diferentes valores
# y sin la necesidad de que nosotros le asignemos los parámetros al momento de crearla.

FactoryBot.define do
  factory :publicacion do
    post_customer_name { Faker::Name.name }
    post_direccion_salida { Faker::Lorem.sentence(word_count: 5) }
    post_direccion_llegada { Faker::Lorem.sentence(word_count: 5) }
    post_hora { '8:30' }
    post_day { '2022, 01, 01' }
    post_limit_personas { Faker::Number.between(from: 0, to: 6) }

    association :user, factory: :user
  end
end
