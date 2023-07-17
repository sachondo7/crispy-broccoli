# frozen_string_literal: true

require 'rails_helper'
require 'factories/rooms'

RSpec.describe Room, type: :model do
  let!(:room) { create(:room) }

  it 'is valid with valid attributes' do
    expect(room).to be_valid
  end

  it 'is not valid with no content' do
    room.name = nil
    expect(room).not_to be_valid
  end
end
