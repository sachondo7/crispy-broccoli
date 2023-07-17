# frozen_string_literal: true

# rubocop: disable Rails/HasManyOrHasOneDependent

class Room < ApplicationRecord
  # Diego verifica que estas dos asociaciones esten bien hechas
  ##########
  has_many :messages
  has_many :users, through: :messages
  ##########
  belongs_to :publicacion
  validates :name, presence: true
end

# rubocop: enable Rails/HasManyOrHasOneDependent
