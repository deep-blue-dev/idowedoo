class AddAndroidToCases < ActiveRecord::Migration
  def change
    add_column :cases, :android, :boolean
  end
end
