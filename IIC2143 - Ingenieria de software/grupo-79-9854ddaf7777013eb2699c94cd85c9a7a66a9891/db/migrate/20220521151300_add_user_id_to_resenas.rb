class AddUserIdToResenas < ActiveRecord::Migration[6.0]
  def change
    add_reference :resenas, :user, foreign_key: true, null: false 
  end
end
