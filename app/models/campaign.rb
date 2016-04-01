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
#  pending     :boolean          default(TRUE)
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

  
  ## CONSTANTS

  # This is the cost price per case (before any profit), the sale value cannot go below this
  # At some point this may become dynamic based on phone type, # of colors, number sold, etc.
  MIN_BASE_PRICE = 10.00
  # This is the price we think a customer should sell their case at, it gives them and us a profit.
  RECOMMENDED_BASE_PRICE = 15.00

  STARTING_GOAL_VALUE = 20


  ## CALLBACKS

  before_validation :set_base_price, on: :create
  

  ## ASSOCIATIONS

  belongs_to :user

  belongs_to :case

  has_many :campaign_case_options, dependent: :destroy
  accepts_nested_attributes_for :campaign_case_options

  
  ## VALIDATIONS

  validates_numericality_of :base_price, minimum: MIN_BASE_PRICE,
    too_short: "This base price is below cost, please set it to a minimum of #{MIN_BASE_PRICE}"


  ## INSTANCE METHODS

  def length
    distance_of_time_in_words(self.start, self.finish)
  end

  private

    def set_base_price
      update_attribute(:base_price, RECOMMENDED_BASE_PRICE)
    end
end
