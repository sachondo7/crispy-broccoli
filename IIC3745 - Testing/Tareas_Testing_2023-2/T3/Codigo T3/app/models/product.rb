class Product < ApplicationRecord
  # Asociaciones existentes
  belongs_to :user
  has_one_attached :image
  has_many :reviews, dependent: :destroy
  has_many :messages, dependent: :destroy
  has_many :solicituds, dependent: :destroy

  # Validaciones existentes
  validates :categories, presence: true, inclusion: { in: ['Cancha', 'Accesorio tecnologico',
                                                           'Accesorio deportivo', 'Accesorio de vestir',
                                                           'Accesorio de entrenamiento', 'Suplementos',
                                                           'Equipamiento'] }
  validates :nombre, presence: true
  validates :stock, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :precio, presence: true, numericality: { greater_than_or_equal_to: 0 }
  # Asumiendo que deseas mantener estas validaciones repetidas, de lo contrario elimina las duplicadas
  validates :stock, numericality: { greater_than_or_equal_to: 0 }
  validates :precio, numericality: { greater_than_or_equal_to: 0 }

  #para verificar horario
  def horario_disponible?(fecha)
    return false if horarios.blank?

    # Formatea la fecha solicitada como "dd/mm/yyyy"
    fecha_solicitada = fecha.strftime('%d/%m/%Y')
    hora_solicitada = fecha.strftime('%H:%M')

    # Divide el string de horarios y verifica si la fecha y hora están disponibles
    horarios_disponibles = horarios.split(';').map do |horario|
      horario.split(',')
    end

    # Verifica si la fecha y hora están disponibles
    horarios_disponibles.any? do |dia, hora_inicio, hora_fin|
      dia_solicitado = DateTime.parse(dia).strftime('%d/%m/%Y') # Parsea y formatea el día como "dd/mm/yyyy"
      fecha_solicitada == dia_solicitado &&
        hora_solicitada >= hora_inicio &&
        hora_solicitada <= hora_fin
    end
  end
end
