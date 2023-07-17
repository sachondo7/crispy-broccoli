class AddReceptorToResenas < ActiveRecord::Migration[6.0]
  def change
    add_column :resenas, :receptor, :string
  end
end
