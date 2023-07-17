class CreateResenas < ActiveRecord::Migration[6.0]
  def change
    create_table :resenas do |t|
      t.integer :calificacion
      t.string :texto

      t.timestamps
    end
  end
end
