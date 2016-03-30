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

class Campaign < ActiveRecord::Base

  include ActionView::Helpers::DateHelper

  belongs_to :user

  belongs_to :case

  has_many :campaign_case_options, dependent: :destroy
  accepts_nested_attributes_for :campaign_case_options


  def length
    distance_of_time_in_words(self.start, self.finish)
  end
end
