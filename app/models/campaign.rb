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
#  case_id     :integer
#  base_price  :float
#
# Indexes
#
#  index_campaigns_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_9eb8249bf2  (user_id => users.id)
#

class Campaign < ActiveRecord::Base

  include ActionView::Helpers::DateHelper

  MIN_BASE_PRICE = 10.00

  belongs_to :user

  belongs_to :case

  has_many :campaign_case_options, dependent: :destroy
  accepts_nested_attributes_for :campaign_case_options


  def length
    distance_of_time_in_words(self.start, self.finish)
  end
end
