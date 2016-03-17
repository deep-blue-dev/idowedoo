require 'rails_helper'

RSpec.describe "Cases", type: :request do
  describe "index" do
    it 'returns 200' do
      get new_case_path
      expect(response.status).to eq(200)
    end
  end
end
