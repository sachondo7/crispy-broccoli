# frozen_string_literal: true

require 'rails_helper'
require 'factories/messages'
require 'factories/rooms'

RSpec.describe Message, type: :model do
  let!(:room) { create(:room) }
  let!(:message) { create(:message, room: room) }

  it 'is valid with valid attributes' do
    expect(message).to be_valid
  end

  it 'is not valid with no content' do
    message.content = nil
    expect(message).not_to be_valid
  end
end
