class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  # global order controller method
    def current_order
      if !session[:order_id].nil?
        Order.find(session[:order_id])
        p "^^^^^^^^^^^:order_id1"
        p :order_id
        p "^^^^^^^^^^^:order_id2"
      else
        Order.new
      end
    end

end
