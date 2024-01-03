FactoryBot.define do
  factory :user do
    name { 'John Doe' }
    email { 'john@example.com' }
    password { 'password123' }
    trait :admin do
      role { 'admin' }
    end
  end
end
