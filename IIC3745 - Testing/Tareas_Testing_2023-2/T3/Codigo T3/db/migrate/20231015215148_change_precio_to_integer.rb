class ChangePrecioToInteger < ActiveRecord::Migration[6.0]
  def change
    change_column :products, :precio, 'integer USING CAST(precio AS integer)'
  end
end