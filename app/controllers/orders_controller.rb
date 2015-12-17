class OrdersController < ApplicationController
  # TODO take a look to set_product private method mayber set_order too??
  before_action :set_product, only: [:new, :create]

  def index
  end

  def new
    @order = Order.new
    redirect_to new_charge_path
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
