class Order < ActiveRecord::Base
  #gems
  #scopes
  #callbacks
  before_create :set_order_status
  before_save :update_subtotal
  before_save :tracking

  #relations
  belongs_to :user
  belongs_to :case
  belongs_to :order_status
  has_many :order_items
  has_many :locations

  #validations



  #methods

    def order_total

      ## TODO
      # @subtotal + @subtotal_tax + @shipping.to_f

    end

    def calculated_subtotal
      order_items.collect { |oi| oi.valid? ? (oi.quantity * oi.unit_price) : 0 }.sum
    end

    def tax
      calculated_subtotal * 0.07.to_f
    end

    def shipping
      return calculated_subtotal + 100.00
    end

    def tracking
      self.tracking_no = Time.now.to_i.to_s
    end
  private

    def set_order_status
      self.order_status_id = 1
    end

    def update_subtotal
      self[:subtotal] = subtotal
    end

end
