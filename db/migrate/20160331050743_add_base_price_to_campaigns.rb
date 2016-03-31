class AddBasePriceToCampaigns < ActiveRecord::Migration
  def change
    add_column :campaigns, :base_price, :float
  end
end
