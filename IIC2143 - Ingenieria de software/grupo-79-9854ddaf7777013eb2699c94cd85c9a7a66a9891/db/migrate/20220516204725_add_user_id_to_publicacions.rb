class AddUserIdToPublicacions < ActiveRecord::Migration[6.0]
  def change
    add_reference :publicacions, :user, foreign_key: true, null: false
  end
end
