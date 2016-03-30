class AddCaseIdToCampaigns < ActiveRecord::Migration
  def change
    add_column :campaigns, :case_id, :integer
  end
end
