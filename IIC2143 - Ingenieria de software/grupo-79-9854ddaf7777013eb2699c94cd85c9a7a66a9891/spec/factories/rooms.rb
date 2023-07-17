# frozen_string_literal: true

require 'faker'

FactoryBot.define do
  factory :room do
    name { Faker::Name.name }

    association :publicacion, factory: :publicacion
  end
end
