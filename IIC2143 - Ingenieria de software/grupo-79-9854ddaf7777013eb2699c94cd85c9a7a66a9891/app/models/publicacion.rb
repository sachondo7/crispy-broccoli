# frozen_string_literal: true

# rubocop: disable Rails/HasManyOrHasOneDependent

class Publicacion < ApplicationRecord
  belongs_to :user
  has_many :requests, dependent: :destroy
  has_one :room
  validates :post_direccion_llegada, presence: true
  validates :post_direccion_salida, presence: true
  validates :post_limit_personas, presence: true, numericality: { less_than: 7 }
  validates :post_hora, presence: true
  validates :post_day, presence: true
  validates :post_customer_name, presence: true

  def full?
    post_limit_personas == requests.where(estado: 'Aceptado').count
  end
end

# rubocop: enable Rails/HasManyOrHasOneDependent
