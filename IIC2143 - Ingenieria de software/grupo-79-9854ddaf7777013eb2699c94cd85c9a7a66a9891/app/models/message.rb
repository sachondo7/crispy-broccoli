# frozen_string_literal: true

class Message < ApplicationRecord
  # Diego verifica que estas dos asociaciones esten bien hechas
  ##########
  belongs_to :user
  belongs_to :room
  validates :content, presence: true
  ##########
end
