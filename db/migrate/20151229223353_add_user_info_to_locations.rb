class AddUserInfoToLocations < ActiveRecord::Migration
  def change
    add_reference :locations, :user, index: true, foreign_key: true
    add_column :locations, :user_title, :string
  end
end
