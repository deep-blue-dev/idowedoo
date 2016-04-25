# == Schema Information
#
# Table name: orders
#
#  id                 :integer          not null, primary key
#  user_id            :integer
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  total_price        :decimal(, )
#  tracking_no        :string
#  num_items          :integer          default(1)
#  address_1          :string
#  address_2          :string
#  address_city       :string
#  address_state      :string
#  address_zip        :string
#  address_country    :string
#  stripe_token       :string
#  email              :string
#  campaign_id        :integer
#  token              :string
#  status             :integer          default(0)
#  stripe_customer_id :string
#  stripe_charge_id   :string
#
# Indexes
#
#  index_orders_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_f868b47f6a  (user_id => users.id)
#

class Order < ActiveRecord::Base

  include Tokenable

  STATUSES = [
    # This status means the order has been received by the system,
    # but the system has not yet calculated, approved, or charged the order.
    # This is the default status
    PENDING       = 0,

    # The order has been processed, approved, and charged. This is the last status,
    # that is automatically done by the system. For here on, they must be manually changed.
    CHARGED       = 1,

    # The order has been reviewed by an employee, and the case is being made,
    # waiting for the campaign to complete, etc.
    PROCESSED     = 2,

    # This order has been shipped.
    SHIPPED       = 3,

    # The order has been received, and it is now complete.
    COMPLETE      = 4
  ]

  STATUS_VALUES = {
    0 => "Pending",
    1 => "Charged",
    2 => "Processed",
    3 => "Shipped",
    4 => "Complete"
  }

  belongs_to :user
  belongs_to :stripe_customer
  has_one :stripe_charge
  belongs_to :campaign

  validates_presence_of :num_items, :email, :stripe_token, :campaign_id,
                        :address_1, :address_city, :address_state, :address_zip, :address_country


  def order_status
    STATUS_VALUES[status]
  end

  def calculate_and_charge(current_user = nil)
    ## Create a Stripe Customer obj from token and email
    stripe_customer = StripeCustomer.create_from_order(self)
    ## Calculate base price and stripe customer model id
    update_attributes(
      total_price: campaign.base_price * num_items,
      stripe_customer_id: stripe_customer.id
    )
    # Create Stripe charge obj for order and stripe customer
    charge = StripeCharge.charge_order(self, stripe_customer, total_price, stripe_charge_description)
    # If stripe charge was created and charged, update 
    if charge.persisted? and charge.success
      update_attribute(:paid, true)
      return true
    else
      return false
    end
  end

  def stripe_charge_description
    "Purchase #{num_items} '#{campaign.title}' cases"
  end
end
