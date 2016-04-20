class DropOrderStatusTable < ActiveRecord::Migration
  def up
    drop_table :order_statuses
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
