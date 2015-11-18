class AddIphoneToCases < ActiveRecord::Migration
  def change
    add_column :cases, :iphone, :boolean
  end
end
