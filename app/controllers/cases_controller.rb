class CasesController < ApplicationController

  def new
    @cases = Case.all
    @order_item = OrderItem.new
  end
end
