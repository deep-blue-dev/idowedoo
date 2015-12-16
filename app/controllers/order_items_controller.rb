class OrderItemsController < ApplicationController
  before_action :set_order_item, only: [:show, :edit, :update, :destroy]

  def index
    @tests = Test.all
  end


  def show
  end

  def new
    @order_item = OrderItem.new
  end

  def edit
  end

  ## TODO fix add cart link in /products/index (missing template issue)

  def create
    p "create happen"
    @order_item = OrderItem.new(order_item_params)
      if @order_item.save
        redirect_to @order_item, notice: 'Order Item was successfully created.'
      else
      render :new
      end
    end


  # def update
  #   respond_to do |format|
  #     if .update(order_item_params)
  #       format.html { redirect_to @test, notice: 'Order_Item was successfully updated.' }
  #       format.json { render :show, status: :ok, location: @test }
  #     else
  #       format.html { render :edit }
  #       format.json { render json: @torder_item.errors, status: :unprocessable_entity }
  #     end
  #   end
  # end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_order_item
      @order_item = OrderItem.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def order_item_params
      params.require(:order_item).permit(:unit_price, :quantity, :total_price, :product_id, :order_id)
    end

end
#
