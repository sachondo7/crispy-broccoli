FactoryBot.define do
  factory :contact_message do
    title { 'Sample Title' }
    body { 'Sample Message Body' }
    name { 'John Doe' }
    mail { 'john@example.com' }
  end
end
