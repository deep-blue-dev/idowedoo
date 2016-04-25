class DropTableOrderItems < ActiveRecord::Migration
  def up
    drop_table :order_items
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
