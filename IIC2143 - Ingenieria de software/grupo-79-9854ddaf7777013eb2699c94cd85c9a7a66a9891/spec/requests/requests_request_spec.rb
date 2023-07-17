# frozen_string_literal: true

require 'rails_helper'
require 'faker'
require 'factories/requests'
# rubocop:disable Metrics/BlockLength
RSpec.describe 'Request', type: :request do
  before do
    @user = create(:user)
    sign_in @user
  end

  let!(:publicacion) { create(:publicacion, user: @user) }
  let!(:request) { create(:request, publicacion: publicacion, user: @user) }

  describe 'create' do
    it 'increases count of requests by 1' do
      expect do
        post '/requests', params: { request: request.attributes }
      end.to change(Request, :count).by(1)
    end

    it 'does not increase count of publicacion' do
      request.publicacion_id = nil
      expect do
        post '/requests', params: { request: request.attributes }
      end.to change(Request, :count).by(0)
    end
  end

  describe 'delete' do
    it 'decreases count of requests by 1' do
      expect do
        delete "/requests/delete?id=#{request.id}"
      end.to change(Request, :count).by(-1)
    end
  end

  describe 'get index' do
    it 'returns a successful request' do
      get '/requests/index'
      expect(response).to have_http_status(:ok)
    end
  end

  describe 'get_show' do
    it 'returns a successful request' do
      get "/requests/show?id=#{request.id}"
      expect(response).to have_http_status(:ok)
    end
  end

  describe 'update' do
    it 'changes a Request' do
      expect do
        get "/requests/update?id=#{request.id}", params: { request: { estado: 'Rechazado' } }
        request.reload
      end.to change(request, :estado)
    end
  end

  describe 'update' do
    it 'changes a Request' do
      expect do
        get "/requests/update?id=#{request.id}", params: { request: { requesting_name: nil } }
        request.reload
      end.not_to change(request, :requesting_name)
    end
  end
end
# rubocop:enable Metrics/BlockLength
