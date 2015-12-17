class CartController < ApplicationController
  def show
    @order_items = current_order.order_items
    @total = current_order # notes TODO need make a total amount to pass it to stripe
  end
end
