class ChargesController < ApplicationController
  # Stripe backend
  Stripe.api_key = App.first.stp_test_sk
  # Easypost
  EasyPost.api_key = App.first.easy_test_sk
  # Data used for stripe

  before_action :set_current_order, only: [:charge, :shipping]

    def new
    end

    def index
    end

    def shipping
      p "Easy Post started"
      @location = Location.all.first
      fromAddress = EasyPost::Address.create(
      :company => 'EasyPost',
      :street1 => '118 2nd Street',
      :street2 => '4th Floor',
      :city => 'San Francisco',
      :state => 'CA',
      :zip => '94105',
      :phone => '415-528-7555'
      )
      toAddress = EasyPost::Address.create(
      :name => @location.name,
      :street1 => (@location.street_number + " " + @location.street),
      :city => @location.city,
      :state => @location.state,
      :zip => @location.zipcode
      )

      parcel = EasyPost::Parcel.create(
      :length => 9,
      :width => 6,
      :height => 2,
      :weight => 10
      )

      shipment = EasyPost::Shipment.create(
      :to_address => toAddress,
      :from_address => fromAddress,
      :parcel => parcel
      )

      shipment.rates.each do |rate|
        puts (rate.carrier)
        puts (rate.service)
        puts (rate.rate)
        puts (rate.id)
          end
    # p "EasyPost ended"
    # p "<<<<<<<********************>>>>>"
    p "3"
    p "<<<<<<<********************>>>>>"
    p "EasyPost ended in CONTROLLER"
    p "<<<<<<<********************>>>>>"

    end

    def charge
      p "2"
      p "Stripe Started"
      @subtotal = current_order.subtotal.to_f
      @subtotal_tax = current_order.tax.to_f
      @order_total = @subtotal + @subtotal_tax
      @customer = Stripe::Customer.create(
      :email => params[:stripeEmail],
      :card => params[:stripeToken]
      )
      @charge = Stripe::Charge.create(
        :customer => @customer.id,
        :amount => (@order_total * 100).to_i,
        :currency => 'usd',
        :metadata => { :order_id => @order.id }
      )
      p "Stripe Ended"
      p "*********************************"
      redirect_to charge_shipping_path

    # rescue Stripe::CardError => e
    #   redirect_to products_path
    # end
end
  private

  def set_current_order
    @order = current_order
    p "set_current_order"
    p "1"
  end

end
