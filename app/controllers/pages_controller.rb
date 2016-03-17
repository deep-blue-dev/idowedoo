class PagesController < ApplicationController

  def index
  end

  def create
    @cases = Case.all
    @order_item = OrderItem.new
  end

  def learn
  end

  def cart
  end

  def campaign
  end

  def coming_soon
  end

  def landing_email
    landing_email = LandingEmail.new(landing_email_params)
    if landing_email.save
      flash[:success] = t('landing_email.success')
    else
      flash[:error] = landing_email.errors.full_messages
    end
    redirect_to coming_soon_path
  end

  private 

  def landing_email_params
    params.require(:landing_email).permit(:email)
  end

end
