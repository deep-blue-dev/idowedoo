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
  end
end
