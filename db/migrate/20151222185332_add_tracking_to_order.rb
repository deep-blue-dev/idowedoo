class AddTrackingToOrder < ActiveRecord::Migration
  def change
    add_column :orders, :tracking_no, :string
  end
end
