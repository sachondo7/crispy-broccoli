# frozen_string_literal: true

# rubocop: disable Rails/UniqueValidationWithoutIndex
# rubocop: disable Rails/HasManyOrHasOneDependent

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :publicacions, dependent: :destroy
  has_many :resenas, dependent: :destroy
  # Diego verifica que estas dos asociaciones esten bien hechas
  ##########
  has_many :messages
  has_many :rooms, through: :messages
  ##########
  validates :username, uniqueness: true, presence: true
  validates :email, presence: true
  validates :address, presence: true
  validates :phone, presence: true, numericality: true
  has_one_attached :profile_pic, dependent: :destroy
end

# rubocop: enable Rails/UniqueValidationWithoutIndex
# rubocop: enable Rails/HasManyOrHasOneDependent
