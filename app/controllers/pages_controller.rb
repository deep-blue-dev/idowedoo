class PagesController < ApplicationController

  def index
  end

  def learn
  end

  def cart
  end

  def coming_soon

    if request.post?
      landing_email = Landingemail.new()
      landing_email.email = params[:email]

      if landing_email.save
        render json: {email: landing_params}, status: :ok
      else
        render errors: landing_email.errors, status: :internal_server_error
      end

    else
      render file: 'pages/coming_soon', layout: false
    end
  end

  def landing_params
    params.permit(:email)
  end

end