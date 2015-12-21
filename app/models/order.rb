class Order < ActiveRecord::Base
  #gems
  #scopes
  #callbacks
  before_create :set_order_status
  before_save :update_subtotal
  #relations
  belongs_to :user
  belongs_to :case
  belongs_to :order_status
  has_many :order_items


  #validations



  #methods


    def subtotal
      order_items.collect { |oi| oi.valid? ? (oi.quantity * oi.unit_price) : 0 }.sum
    end

    def tax
      subtotal * 0.10.to_f
    end

    def shipping
      return subtotal + 100.00
    end

  private
    def set_order_status
      self.order_status_id = 1
    end

    def update_subtotal
      self[:subtotal] = subtotal
    end

end
