require 'rails_helper'

RSpec.describe "Pages", type: :request do
  describe "index" do
    it 'returns 200' do
      get root_path
      expect(response.status).to eq(200)
      expect(response.body).to match("This site is under construction")
    end
  end
end
