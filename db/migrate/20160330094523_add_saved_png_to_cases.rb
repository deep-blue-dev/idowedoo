class AddSavedPngToCases < ActiveRecord::Migration
  def change
    add_column :cases, :saved_png, :text
  end
end
