FactoryBot.define do
  factory :shopping_cart do
    user
    products { {} }
  end
end
