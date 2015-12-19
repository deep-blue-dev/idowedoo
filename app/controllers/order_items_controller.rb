class OrderItemsController < ApplicationController
  before_action :set_current_order, only:[:create, :update, :destroy]


  def create
    @order_item = @order.order_items.new(order_item_params)
    @order.save
    session[:order_id] = @order.id
  end

  def update
    @order_item = @order.order_items.find(params[:id])
    @order_item.update_attributes(order_item_params)
    @order_items = @order.order_items
  end

  def destroy
    @order = current_order
    @order_item = @order.order_items.find(params[:id])
    @order_item.destroy
    @order_items = @order.order_items
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def set_current_order
      @order = current_order
    end

    def order_item_params
      params.require(:order_item).permit(:unit_price, :quantity, :total_price, :product_id, :order_id)
    end

end
