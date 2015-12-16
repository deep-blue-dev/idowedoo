class AddDataToOrders < ActiveRecord::Migration
  def change
    add_column :orders, :subtotal, :decimal
    add_column :orders, :tax, :decimal
    add_column :orders, :shipping, :decimal
    add_column :orders, :total_price, :decimal
    add_column :orders, :order_status_id, :integer
  end
end
