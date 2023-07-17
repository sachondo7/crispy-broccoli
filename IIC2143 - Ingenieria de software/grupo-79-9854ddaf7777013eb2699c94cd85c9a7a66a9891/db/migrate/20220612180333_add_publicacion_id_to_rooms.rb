class AddPublicacionIdToRooms < ActiveRecord::Migration[6.0]
  def change
    add_reference :rooms, :publicacion, null: false, foreign_key: true
  end
end
