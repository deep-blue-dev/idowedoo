class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  # helper methods
  helper_method :current_order
  # global order controller method
    def current_order
      if !session[:order_id].nil?
        begin
          Order.find(session[:order_id])
        rescue ActiveRecord::RecordNotFound
          Order.new
        end
      else
        Order.new
      end
    end


end
