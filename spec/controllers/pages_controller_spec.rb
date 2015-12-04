require 'rails_helper'

RSpec.describe PagesController, type: :controller do

  describe "GET #learn" do
    it "returns http success" do
      get :learn
      expect(response).to have_http_status(:success)
    end
  end

end
