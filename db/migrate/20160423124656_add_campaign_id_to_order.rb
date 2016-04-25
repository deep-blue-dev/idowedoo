class AddCampaignIdToOrder < ActiveRecord::Migration
  def change
    add_column :orders, :campaign_id, :integer
  end
end
