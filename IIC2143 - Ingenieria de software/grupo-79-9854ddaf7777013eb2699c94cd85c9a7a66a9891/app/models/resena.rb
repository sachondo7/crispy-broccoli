# frozen_string_literal: true

class Resena < ApplicationRecord
  belongs_to :user
  validates :calificacion, presence: true, numericality: { only_integer: true }
  validates :texto, presence: true
  validates :emisor, presence: true
  validates :receptor, presence: true
end
