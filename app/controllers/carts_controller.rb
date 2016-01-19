class CartsController < ApplicationController

  before_action :show, only: [:shipping, :checkout]
  before_action :shipping, only:[:checkout]
  before_action :calculate_subtotal, only: [:show]

  def show

    @order_items = current_order.order_items
    @location = Location.all.first

    # notes TODO need make a total amount to pass it to stripe go to _shopping_cart !!

    @subtotal_tax = current_order.tax
    @subtotal = current_order.subtotal
    @order_total = @subtotal + @subtotal_tax

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
    if @location && @location.any?
      toAddress = EasyPost::Address.create(
        :name => @location.name,
        :street1 => (@location.street_number + " " + @location.street),
        :city => @location.city,
        :state => @location.state,
        :zip => @location.zipcode
      )
    end

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

    ## Select the USPS First Rate from the Rates Array
    usps_first_rate = shipment.rates.any? ? shipment.rates.select{|rate| rate["service"] == 'First'}[0].rate : 0.00
    @shipping_rate = usps_first_rate


    @order_items = current_order.order_items
    # @location = Location.all.first

    # notes TODO need make a total amount to pass it to stripe go to _shopping_cart !!

    @subtotal_tax = current_order.tax
    @subtotal = current_order.subtotal
    @order_total = @subtotal + @subtotal_tax + usps_first_rate.to_f
  end

  def shipping


  end



  def checkout

  end

  def address
  end

  def location

  end

  private
  def set_location
    # @location = Location
  end
  def calculate_subtotal
   current_order.subtotal = current_order.order_items.collect { |oi| oi.valid? ? (oi.quantity * oi.unit_price) : 0 }.sum
  end

end
