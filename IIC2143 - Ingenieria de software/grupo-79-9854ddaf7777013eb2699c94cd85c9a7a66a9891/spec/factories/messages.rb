# frozen_string_literal: true

require 'faker'

FactoryBot.define do
  factory :message do
    content { Faker::Lorem.sentence(word_count: 5) }

    association :room, factory: :room
    association :user, factory: :user
  end
end
