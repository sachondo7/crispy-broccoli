# frozen_string_literal: true

require 'rails_helper'
require 'factories/publicacions'

# rubocop:disable Metrics/BlockLength
RSpec.describe Publicacion, type: :model do
  # Todo lo que está dentro de este bloque se ejecutará una vez antes de cada it
  let!(:publicacion) { create(:publicacion) }

  it 'is valid with valid attributes' do
    expect(publicacion).to be_valid
  end

  it 'is not valid with no customer name' do
    publicacion.post_customer_name = nil
    expect(publicacion).not_to be_valid
  end

  it 'is not valid with no direccion de llegada' do
    publicacion.post_direccion_llegada = nil
    expect(publicacion).not_to be_valid
  end

  it 'is not valid with no direccion de salida' do
    publicacion.post_direccion_salida = nil
    expect(publicacion).not_to be_valid
  end

  it 'is not valid with no hora del turno' do
    publicacion.post_hora = nil
    expect(publicacion).not_to be_valid
  end

  it 'is not valid with no dia del turno' do
    publicacion.post_day = nil
    expect(publicacion).not_to be_valid
  end

  it 'is not valid with limite de personas mayor que 7' do
    publicacion.post_day = 8
    expect(publicacion).not_to be_valid
  end

  it 'is not valid with no user id' do
    publicacion.user_id = nil
    expect(publicacion).not_to be_valid
  end
end
# rubocop:enable Metrics/BlockLength
