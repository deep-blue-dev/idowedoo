class OrdersController < ApplicationController

  def create
    @order = Order.new(order_params.merge(user: current_user))

    # stripe_customer_params = {token: order.stripe_token, email: @order.email}
    # stripe_customer_params.merge!(current_user_id: @order.user.id) if @order.user
    if @order.save
      if @order.calculate_and_charge
        flash[:success] = "Thanks you for ordering! Here is your order information."
        puts "\n\n\n 1 \n\n\n"
        redirect_to order_path(id: @order.token) and return
        
        # total_price = order_params[:num_items] * order_params[:]
        # campaign_extra = {
        #   total_price: 
        # }
      else
        # Issue with charging, must be invalid Stripe info
        puts "\n\n\n 2 \n\n\n"
        redirect_to new_order_path(id: @order.id) and return
      end
    else
      # Issue with validation, must be missing attrs
      puts "\n\n\n 3 \n\n\n"
      redirect_to new_order_path(id: @order.id) and return
    end
  end

  def show
    @order = Order.includes(:campaign).find_by(token: params[:id])
    @campaign = @order.campaign
    unless (@order.user.present? &&  @order.user == current_user) or @order.user.nil?
      flash[:error] = "You are not authorized to access this order confirmation."  
      redirect_to campaigns_path and return
    end
  end

  private

  def order_params
    params.require(:order).permit(:num_items, :user_id, :email, :address_1,
                                  :address_2, :address_city, :address_state,
                                  :address_zip, :address_country, :campaign_id,
                                  :stripe_token)
  end

end
