# frozen_string_literal: true

# rubocop: disable Metrics/BlockLength
require 'rails_helper'
require 'faker'
require 'factories/publicacions'
require 'factories/users'

RSpec.describe 'User', type: :request do
  before do
    @user = create(:user)
    sign_in @user
  end

  describe 'get index' do
    it 'returns a successful request' do
      get '/controllers/index'
      expect(response).to have_http_status(:ok)
    end
  end

  describe 'delete' do
    it 'decreases count of users by 1' do
      expect do
        delete "/users/delete/#{@user.id}"
      end.to change(User, :count).by(-1)
    end
  end

  describe 'All users' do
    it 'get all the users' do
      get '/users/profiles'
      expect(response).to have_http_status(:ok)
    end
  end

  describe 'one user' do
    it 'get one user' do
      get "/users/profile/#{@user.id}"
      expect(response).to have_http_status(:ok)
    end
  end
end
# rubocop: enable Metrics/BlockLength
