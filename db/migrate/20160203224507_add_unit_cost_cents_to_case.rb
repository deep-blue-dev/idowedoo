class AddUnitCostCentsToCase < ActiveRecord::Migration
  def change
    add_monetize :cases, :unit_cost
  end
end
