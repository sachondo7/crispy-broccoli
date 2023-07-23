class Article < ApplicationRecord
    # aqui se definen las relaciones y validaciones
    belongs_to :user
    validates :title, presence: true, length: {minimum:6, maximum:50}
    validates :description, presence: true, length: {minimum:10, maximum:300}
end