# == Schema Information
#
# Table name: stripe_charges
#
#  id                 :integer          not null, primary key
#  order_id           :integer
#  stripe_customer_id :integer
#  charge_stripe_id   :string
#  amount             :integer
#  success            :boolean          default(FALSE)
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#

class StripeCharge < ActiveRecord::Base

  def self.charge_order(order, stripe_customer, amount, description = "Charge from Idowedo")
    stripe_amount = (amount * 100).to_i
    charge = Stripe::Charge.create(
      customer: stripe_customer.stripe_customer_id,
      amount: stripe_amount,
      description: description,
      currency: 'usd'
    )
    params = {
      order_id: order.id,
      stripe_customer_id: stripe_customer.id,
      amount: charge.amount,
      charge_stripe_id: charge.id,
      success: charge.paid
    }
    create(params)
  end
end
