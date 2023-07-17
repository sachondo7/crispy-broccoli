# frozen_string_literal: true

# rubocop: disable Metrics/BlockLength
require 'rails_helper'
require 'factories/resenas'

RSpec.describe 'Resenas', type: :request do
  before do
    @user = create(:user)
    sign_in @user
  end

  let!(:resena) { create(:resena, user: @user) }

  describe 'GET /index' do
    it 'returns http success' do
      get '/resenas/index'
      expect(response).to have_http_status(:success)
    end
  end

  describe 'GET /new' do
    it 'returns http success' do
      get '/resenas/new'
      expect(response).to have_http_status(:success)
    end
  end

  describe 'edit' do
    it 'returns a successful request' do
      get "/resenas/edit?id=#{resena.id}"
      expect(response).to have_http_status(:ok)
    end
  end

  describe 'delete' do
    it 'returns http success' do
      expect do
        delete "/resenas/delete/#{resena.id}"
      end.to change(Resena, :count).by(-1)
    end
  end

  describe 'create' do
    it 'increases count of resenas by 1' do
      expect do
        post "/resenas/new?=#{resena.id}", params: { resena: resena.attributes }
      end.to change(Resena, :count).by(1)
    end
  end

  describe 'update' do
    it 'changes a Resena' do
      expect do
        patch "/resenas/update?id=#{resena.id}", params: { resena: { texto: 'Este es un cambio en el texto' } }
        resena.reload
      end.to change(resena, :texto)
    end
  end

  describe 'update' do
    it 'No deberia cambiar la resena' do
      expect do
        patch "/resenas/update?id=#{resena.id}", params: { resena: { texto: nil } }
        resena.reload
      end.not_to change(resena, :texto)
    end
  end
end
# rubocop: enable Metrics/BlockLength
