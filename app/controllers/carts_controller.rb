class CartsController < ApplicationController
  before_action :show, only:[:shipping]
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


  def shipping
    p "***************----->>>>>>>>>>****************"
    p "Shipping has just been clicked of CartsController"
    p "***************^^^^^"
  end


  def address
    @location = Location.new
  end

end
