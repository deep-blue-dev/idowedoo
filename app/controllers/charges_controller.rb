class ChargesController < ApplicationController
  # Stripe backend
  Stripe.api_key = App.first.stp_test_sk
  # Data used for stripe


  def new
  end

  def index
  end

    def charge
      p "Rescue Stripe Card Error!!!!!"

      @subtotal = current_order.subtotal.to_f
      @subtotal_tax = current_order.tax.to_f
      @order_total = @subtotal + @subtotal_tax
      @tracking_no = current_order.tracking

      p @order_total*100
      @customer = Stripe::Customer.create(
      :email => params[:stripeEmail],
      :card => params[:stripeToken]
      )
      @charge = Stripe::Charge.create(
        :customer => @customer.id,
        :amount => (@order_total * 100).to_i,
        :currency => 'usd'
      )


      redirect_to charges_path

    # rescue Stripe::CardError => e
    #   redirect_to products_path
      p "Rescue Stripe Card Error"
  end

end



# NOTE example
# @order_items = current_order.order_items
# # notes TODO need make a total amount to pass it to stripe go to _shopping_cart !!
#  @subtotal = current_order.subtotal
#  @subtotal_tax = current_order.tax
#  @order_total = @subtotal + @subtotal_tax

# def charge
#   @subtotal = current_order.subtotal.to_f
#   @subtotal_tax = current_order.tax.to_f
#   @order_total = @subtotal + @subtotal_tax
#   p "Subtotal:"
#   p @subtotal
#   p "Subtotal Tax"
#   p @subtotal_tax
#   p "Stripe.api_key:"
#   p Stripe.api_key
#   p "****************************** Charge begun"
#   p "Order Total:"
#   p @order_total
#   redirect_to cart_path
#   p "****************************** Charge ended"
# end
