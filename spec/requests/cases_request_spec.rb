require 'rails_helper'

RSpec.describe "Cases", type: :request do
  describe "routes work" do
    it 'new' do
      get new_case_path
      expect(response.status).to eq(200)
    end
  end
end
