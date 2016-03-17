# == Schema Information
#
# Table name: campaigns
#
#  id          :integer          not null, primary key
#  title       :string
#  description :text
#  start       :datetime
#  finish      :datetime
#  user_id     :integer
#  goal_unit   :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

FactoryGirl.define do
  factory :campaign do
    title "Test Campaign"
    description "This is a test campaign created by FactoryGirl used in Rspec testing."
    start DateTime.now
    finish DateTime.now + 7.days
    goal_unit 10_000
  end
end