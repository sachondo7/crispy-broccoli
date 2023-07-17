# frozen_string_literal: true

require 'rails_helper'
require 'factories/messages'
require 'factories/rooms'
require 'factories/users'

class PublicacionTest < ActiveSupport::TestCase
  RSpec.describe 'Message', type: :request do
    before do
      @user = FactoryBot.create(:user)
      sign_in @user
    end
    let!(:room) { create(:room) }
    let!(:message) { create(:message, room: room, user: @user) }

    # describe 'create' do
    #   it 'increases count of messages by 1' do
    #     expect do
    #       post '/messages', params: { message: message.attributes, room: room.attributes}
    #     end.to change(Message, :count).by(1)
    #   end
    # end
  end
end
