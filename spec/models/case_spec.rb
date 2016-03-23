# == Schema Information
#
# Table name: cases
#
#  id                    :integer          not null, primary key
#  title                 :string
#  unit_min              :integer
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  template_file_name    :string
#  template_content_type :string
#  template_file_size    :integer
#  template_updated_at   :datetime
#  unit_cost_cents       :integer          default("0"), not null
#  unit_cost_currency    :string           default("USD"), not null
#  brand_id              :integer
#

require 'rails_helper'

RSpec.describe Case, type: :model do
  describe "factory" do
    let!(:kase) { build(:case) }
    it "should be valid" do
      expect(kase).to be_valid
      expect do
        kase.save
      end.to change{ Case.count }.by(1)
    end
  end

  describe "creator" do
    let!(:kase) { build(:case, creator: nil) }
    let!(:user) { build(:user) }
    it "should be validated" do
      expect(kase).to_not be_valid
      kase.creator = user
      expect(kase).to be_valid
      expect(kase.creator).to eq(user)
    end
  end
end
