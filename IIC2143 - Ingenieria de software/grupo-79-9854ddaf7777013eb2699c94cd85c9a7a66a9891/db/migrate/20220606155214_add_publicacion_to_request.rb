class AddPublicacionToRequest < ActiveRecord::Migration[6.0]
  def change
    add_reference :requests, :publicacion, foreign_key: true, null: false
  end
end
