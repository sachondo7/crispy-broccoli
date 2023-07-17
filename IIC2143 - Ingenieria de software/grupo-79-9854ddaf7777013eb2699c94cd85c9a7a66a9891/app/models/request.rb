# frozen_string_literal: true

class Request < ApplicationRecord
  belongs_to :user
  belongs_to :publicacion
  validates :requesting_name, presence: true
  validates :requested_name, presence: true
  validates :descripcion, presence: true
end
