class CartsController < ApplicationController
  def show
    @order_items = current_order.order_items
    p "1111111111"
    p @order_items
    p "1111111111"
    @total = current_order # notes TODO need make a total amount to pass it to stripe go to _shopping_cart !!
  end
end
