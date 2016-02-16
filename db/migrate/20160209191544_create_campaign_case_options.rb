class CreateCampaignCaseOptions < ActiveRecord::Migration
  def change
    create_table :campaign_case_options do |t|
      t.references :campaign
      t.references :case

      t.timestamps null: false
    end
  end
end
