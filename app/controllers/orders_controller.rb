class OrdersController < ApplicationController

  def create
    @order = Order.new(order_params.merge(user: current_user))
    
    if @order.save
      if @order.calculate_and_charge
        flash[:success] = "Thanks you for ordering! Here is your order information."
        redirect_to order_path(id: @order.token) and return
      else
        flash[:danger] = "There was an issue charging your card. Please try again."
        # Issue with charging, must be invalid Stripe info
        redirect_to new_order_path(id: @order.id) and return
      end
    else
      flash[:danger] = "Some form fields were missing. Please try again."
      # Issue with validation, must be missing attrs
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
