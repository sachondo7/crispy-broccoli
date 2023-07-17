class AddEmisorToResenas < ActiveRecord::Migration[6.0]
  def change
    add_column :resenas, :emisor, :string
  end
end
