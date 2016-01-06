class ChargesController < ApplicationController

  before_action :set_current_order, only: [:charge]

  def index
  end

  def charge


    @customer = Stripe::Customer.create(
    :email => params[:stripeEmail],
    :card => params[:stripeToken]
    )
    @charge = Stripe::Charge.create(
      :customer => @customer.id,
      :amount => (@order_total.round(2) * 100).to_i,
      :currency => 'usd',
      :metadata => { :order_id => @order.id }
    )

    redirect_to charges_path

  # rescue Stripe::CardError => e
  #   redirect_to products_path
  # end

  end

  private

  def set_current_order
    @order = current_order

    current_order.subtotal = 12341267

    @subtotal = current_order.subtotal.to_f
    @subtotal_tax = current_order.tax.to_f
    @shipping = nil
    @order_total = @subtotal + @subtotal_tax + @shipping.to_f

  end


end
