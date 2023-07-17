# frozen_string_literal: true

require 'rails_helper'

# rubocop:disable Metrics/BlockLength
class PublicacionTest < ActiveSupport::TestCase
  RSpec.describe 'Publicacion', type: :request do
    before do
      @user = FactoryBot.create(:user)
      sign_in @user
    end

    let!(:publicacion) { create(:publicacion, user: @user) }
    let!(:publicacion2) { create(:publicacion, user: @user) }

    describe 'get index' do
      it 'returns a successful request' do
        get '/publicacions/index'
        expect(response).to have_http_status(:ok)
      end
    end

    describe 'get new' do
      it 'returns a successful request' do
        get '/publicacions/new'
        expect(response).to have_http_status(:ok)
      end
    end

    describe 'get_show' do
      it 'returns a successful request' do
        get "/publicacions/show?id=#{publicacion.id}"
        expect(response).to have_http_status(:ok)
      end
    end

    describe 'create' do
      it 'increases count of Publication by 1' do
        expect do
          post '/publicacions', params: { publicacion: publicacion.attributes }
        end.to change(Publicacion, :count).by(1)
      end

      it 'does not increase count of publicacion' do
        publicacion.post_customer_name = nil
        expect do
          post '/publicacions', params: { publicacion: publicacion.attributes }
        end.to change(Publicacion, :count).by(0)
      end
    end

    describe 'delete' do
      it 'decreases count of Publication by 1' do
        expect do
          delete "/publicacions/delete?id=#{publicacion.id}"
        end.to change(Publicacion, :count).by(-1)
      end
    end

    describe 'edit' do
      it 'returns a successful request' do
        get "/publicacions/edit?id=#{publicacion.id}"
        expect(response).to have_http_status(:ok)
      end
    end

    describe 'update' do
      it 'changes a Publicacion' do
        expect do
          patch "/publicacions/update?id=#{publicacion.id}", params: { publicacion: { post_customer_name: 'Cambio Nombre' } }
          publicacion.reload
        end.to change(publicacion, :post_customer_name)
      end
    end

    describe 'update' do
      it 'changes a Publicacion' do
        expect do
          patch "/publicacions/update?id=#{publicacion.id}", params: { publicacion: { post_customer_name: nil } }
          publicacion.reload
        end.not_to change(publicacion, :post_customer_name)
      end
    end
  end
  # rubocop:enable Metrics/BlockLength
end
