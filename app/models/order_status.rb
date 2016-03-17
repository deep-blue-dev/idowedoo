# == Schema Information
#
# Table name: order_statuses
#
#  id         :integer          not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class OrderStatus < ActiveRecord::Base
  #gems
  #scopes
  #callbacks
  #relations
  has_many :orders
  #validations
  #methods
end
