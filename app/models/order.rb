# == Schema Information
#
# Table name: orders
#
#  id              :integer          not null, primary key
#  user_id         :integer
#  case_id         :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  subtotal        :decimal(, )
#  tax             :decimal(, )
#  shipping        :decimal(, )
#  total_price     :decimal(, )
#  order_status_id :integer
#  tracking_no     :string
#
# Indexes
#
#  index_orders_on_case_id  (case_id)
#  index_orders_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_7b358e1bb1  (case_id => cases.id)
#  fk_rails_f868b47f6a  (user_id => users.id)
#

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
