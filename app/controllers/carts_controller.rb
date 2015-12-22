class CartsController < ApplicationController
  def show
    @order_items = current_order.order_items
    # notes TODO need make a total amount to pass it to stripe go to _shopping_cart !!
     @subtotal = current_order.subtotal
     @subtotal_tax = current_order.tax
     @order_total = @subtotal + @subtotal_tax
     p "Show Carts"
     p @order_total
  end

  def charge
  end

end
