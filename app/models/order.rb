class Order < ActiveRecord::Base

  before_create :set_order_status
  before_save :update_subtotal
  before_save :tracking

  belongs_to :user
  belongs_to :case
  belongs_to :order_status
  has_many :order_items
  has_many :locations

  def subtotal

    sub = order_items.collect do |oi|
      oi.valid? ? (oi.quantity * oi.unit_price) : 0
    end

    sub.sum

  end

  def tax
    subtotal * 0.10.to_f
  end

  def shipping
    subtotal + 100.00
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