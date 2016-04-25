class RemoveExtrasFromOrder < ActiveRecord::Migration
  def change
    remove_column :orders, :subtotal, :decimal
    remove_column :orders, :tax, :decimal
    remove_column :orders, :shipping, :decimal
    remove_column :orders, :case_id, :integer
  end
end
