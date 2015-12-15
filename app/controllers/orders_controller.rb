class OrdersController < ApplicationController
  before_action :set_product only: [:new, :create]
  def index
  end
  def new
    @order = Order.new
  end

  def create
    @order = Order.new(order_params)
  end

  def show
  end

  private

  def order_params
    params.require(:order).permit(:subtotal, :tax, :shipping, :total_price, :order_status_id, :user_id, :case_id)
  end

  def set_product
    @product = Product.find(params[:id])
  end
end
