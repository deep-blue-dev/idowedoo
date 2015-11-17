class AddImagesToCases < ActiveRecord::Migration
  def change
    add_column :cases, :image, :string
  end
end
