class User < ApplicationRecord
    # aqui se definen las relaciones y validaciones
    before_save {self.email = email.downcase}
    has_many :articles, dependent: :destroy
    validates :username, presence: true,  length: {minimum:6, maximum:25}, uniqueness: {case_sensitive: false}
    VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
    validates :email, presence: true, length: {maximum:105}, uniqueness: {case_sensitive: false}, format: {with: VALID_EMAIL_REGEX}
    has_secure_password
end