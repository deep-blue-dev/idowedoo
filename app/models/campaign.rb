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
#  num_sold    :integer          default(0)
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

  MIN_GOAL_UNIT = 10


  ## Scopes

  scope :available, -> { where(pending: false) }


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

  validates_numericality_of :goal_unit, minimum: MIN_GOAL_UNIT, allow_nil: true,
    too_short: "This goal is too small, please set it to a minimum of #{MIN_GOAL_UNIT}"

  validates_presence_of :user, :case

  validates :case_id, uniqueness: true, presence: true

  ## Class Methods

  def self.new(params = {})
    default_params = {goal_unit: STARTING_GOAL_VALUE, base_price: RECOMMENDED_BASE_PRICE}
    params = default_params.merge(params)
    super(params)
  end

  ## INSTANCE METHODS

  def length
    distance_of_time_in_words(self.start, self.finish)
  end

  def sale_price
    if base_price and base_price > MIN_BASE_PRICE
      return base_price
    else
      return RECOMMENDED_BASE_PRICE
    end
  end

  def days_left
    left = ((finish - Time.now) / 1.days).ceil
    if left > 0
      return left
    else
      return 0
    end
  end

  def available_for_purchase?
    not pending and not finished
  end

  def finished
    Time.now > finish
  end

  # goal_unit
  # num_sold

  # Integer out of 100
  def goal_pct_int
    (num_sold.to_f / goal_unit * 100).to_i
  end

  def goal_ratio(delimiter = " / ")
    "#{num_sold}#{delimiter}#{goal_unit}"
  end

  def new_order_created
    # When a new order is created this method is called.
    # Here we can update the number of cases sole
    cases_sold = Order.num_bought_for(self)
    puts "\n\n\n Called update goal status \n #{cases_sold} cases sold \n\n"
    update_attribute(:num_sold, cases_sold)
  end

  private

    def set_base_price
      update_attribute(:base_price, RECOMMENDED_BASE_PRICE)
    end
end
