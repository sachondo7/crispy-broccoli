# frozen_string_literal: true

require 'rails_helper'
require 'factories/publicacions'
require 'factories/rooms'
require 'factories/users'

class PublicacionTest < ActiveSupport::TestCase
  RSpec.describe 'Room', type: :request do
    before do
      @user = FactoryBot.create(:user)
      sign_in @user
    end
    let!(:publicacion) { create(:publicacion) }
    let!(:room) { create(:room, publicacion: publicacion) }

    describe 'get index' do
      it 'returns a successful request' do
        get '/rooms/index'
        expect(response).to have_http_status(:ok)
      end
    end

    describe 'get new' do
      it 'returns a successful request' do
        get '/rooms/new'
        expect(response).to have_http_status(:ok)
      end
    end
    describe 'get_show' do
      it 'returns a successful request' do
        get "/rooms/show?id=#{room.id}"
        expect(response).to have_http_status(:ok)
      end
    end
    # describe 'create' do
    #   it 'increases count of rooms by 1' do
    #     expect do
    #       post '/rooms', params: { room: room.attributes, publicacion: publicacion.attributes }
    #     end.to change(Room, :count).by(1)
    #   end
    # end
    #   it 'does not increase count of room' do
    #     room.name = nil
    #     expect do
    #       post '/rooms', params: { room: room.attributes }
    #     end.to change(Room, :count).by(0)
    #   end
  end
end
