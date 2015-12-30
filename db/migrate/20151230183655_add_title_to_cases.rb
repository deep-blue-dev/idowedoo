class AddTitleToCases < ActiveRecord::Migration
  def change
    add_column :cases, :title, :string
  end
end
