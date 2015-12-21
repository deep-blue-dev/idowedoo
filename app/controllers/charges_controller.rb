class ChargesController < ApplicationController
  def new
  end

  def index
  end

  def charge
    p "charging......"
    
    redirect_to charges_path

  end

end
