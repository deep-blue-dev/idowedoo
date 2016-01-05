class CartsController < ApplicationController

  # Easypost
  EasyPost.api_key = ENV['easy_key']
  before_action :show, only: [:shipping, :checkout]
  before_action :shipping, only:[:checkout]

  def show
    @order_items = current_order.order_items
    @location = Location.all.first
    # notes TODO need make a total amount to pass it to stripe go to _shopping_cart !!
     @subtotal_tax = current_order.tax
     @subtotal = current_order.subtotal
     @order_total = @subtotal + @subtotal_tax
  end

  def charge
  end


  def shipping
    @location = Location.all.last
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
      @shipping = rate.rate
        end
  @order_total = @subtotal + @subtotal_tax + @shipping.to_f
  end



  def checkout

  end

  def address
  end

  def location

  end


end
