# == Schema Information
#
# Table name: stripe_customers
#
#  id                 :integer          not null, primary key
#  stripe_customer_id :string
#  email              :string
#  user_id            :integer
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#

class StripeCustomer < ActiveRecord::Base

  def self.create_from_order(order)
    data = Stripe::Customer.create(
      email: order.email,
      source: order.stripe_token
    )
    params = {email: data[:email], stripe_customer_id: data[:id]}
    params.merge!(user_id: order.user.id) if order.user.present?
    create(params)
  end
end
