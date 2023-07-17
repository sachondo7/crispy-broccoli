# frozen_string_literal: true

require 'faker'

FactoryBot.define do
  factory :user do
    username { Faker::Name.name }
    email { Faker::Internet.email }
    password { Faker::Internet.password(min_length: 6) }
    phone { 999_999_999 }
    address { Faker::Lorem.sentence(word_count: 5) }
  end
end
