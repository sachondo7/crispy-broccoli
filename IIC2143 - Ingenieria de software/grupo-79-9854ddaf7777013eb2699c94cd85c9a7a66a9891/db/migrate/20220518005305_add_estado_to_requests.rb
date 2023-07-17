class AddEstadoToRequests < ActiveRecord::Migration[6.0]
  def change
    add_column :requests, :estado, :string
  end
end
