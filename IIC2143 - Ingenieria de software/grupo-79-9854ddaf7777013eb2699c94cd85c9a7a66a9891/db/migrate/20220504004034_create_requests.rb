class CreateRequests < ActiveRecord::Migration[6.0]
  def change
    create_table :requests do |t|
      
      t.string :requesting_name
      t.string :requested_name
      t.string :descripcion

      t.timestamps
    end
  end
end
