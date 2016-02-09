class RemoveUnitCostFromCase < ActiveRecord::Migration
  def change
    remove_column :cases, :unit_cost
  end
end
