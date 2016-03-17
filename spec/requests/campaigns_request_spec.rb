require 'rails_helper'

RSpec.describe "Locations", type: :request do
  describe "Actions are valid" do
    let!(:campaign) { create(:campaign) }
    it "index" do
      get campaigns_path
      expect(response.status).to eq(200)
    end

    it "show" do
      get campaign_path(campaign)
      expect(response.status).to eq(200)
    end

    it "new" do
      get new_campaign_path
      expect(response.status).to eq(200)
    end

    it "edit" do
      get edit_campaign_path(campaign)
      expect(response.status).to eq(200)
    end

    it "create" do
      expect do
        post campaigns_path, campaign: attributes_for(:campaign)
      end.to change{ Campaign.count }.by(1)
      expect(response.status).to eq(302)
    end

    it "update" do
      campaign_attrs = campaign.attributes
      campaign_attrs["title"] = "New name"
      expect do
        patch campaign_path(campaign.id), campaign: campaign_attrs
      end.to change{ Campaign.count }.by(0)
      expect(campaign.reload.title).to eq("New name")
    end
  end
end
