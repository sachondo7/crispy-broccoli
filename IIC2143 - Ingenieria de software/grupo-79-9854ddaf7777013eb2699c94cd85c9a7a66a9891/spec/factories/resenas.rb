# frozen_string_literal: true

require 'faker'

FactoryBot.define do
  factory :resena do
    calificacion { Faker::Number.between(from: 0, to: 5) }
    texto { Faker::Lorem.sentence(word_count: 5) }
    emisor { Faker::Name.name }
    receptor { Faker::Name.name }

    association :user, factory: :user
  end
end
