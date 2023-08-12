class AddAdminToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :admin, :boolean, default: false #se agrega una columna a la tabla users con el nombre admin, tipo booleano y valor por defecto false
  end
end
