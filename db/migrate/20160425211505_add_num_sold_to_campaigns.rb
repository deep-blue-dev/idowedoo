class AddNumSoldToCampaigns < ActiveRecord::Migration
  def change
    add_column :campaigns, :num_sold, :integer, default: 0
  end
end
