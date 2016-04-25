require 'rails_helper'

RSpec.describe Order, type: :model do
  let(:order) { create(:order) }
  describe "factory" do
    let!(:new_order) { build(:order) }
    it "should be valid" do
      expect(new_order).to be_valid
      expect do
        new_order.save
      end.to change{ Order.count }.by(1)
    end

    it "should generate a token" do
      expect(order.token).to_not eq(nil)
      expect(order.token.length > 1).to be_truthy
    end
  end

  describe "calculate_and_charge" do
    
  end
end
