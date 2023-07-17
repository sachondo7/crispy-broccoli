class CreatePublicacions < ActiveRecord::Migration[6.0]
  def change
    create_table :publicacions do |t|
      t.string :post_customer_name
      t.datetime :post_day
      t.string :post_direccion_salida
      t.string :post_direccion_llegada
      t.time :post_hora
      t.boolean :post_type
      t.integer :post_limit_personas

      t.timestamps
    end
  end
end
