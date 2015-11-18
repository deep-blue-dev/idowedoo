class AddIpadToCases < ActiveRecord::Migration
  def change
    add_column :cases, :ipad, :boolean
  end
end
