class AddNumItemsToOrder < ActiveRecord::Migration
  def change
    add_column :orders, :num_items, :integer, default: 1
  end
end
