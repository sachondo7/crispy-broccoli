# frozen_string_literal: true

require 'faker'

FactoryBot.define do
  factory :request do
    requesting_name { Faker::Name.name }
    requested_name { Faker::Name.name }
    descripcion { Faker::Lorem.characters(number: 34) }
    estado { 'Pendiente' }

    association :publicacion, factory: :publicacion
    association :user, factory: :user
  end
end
