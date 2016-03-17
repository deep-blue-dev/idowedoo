# == Schema Information
#
# Table name: products
#
#  id          :integer          not null, primary key
#  name        :string
#  price       :decimal(8, 2)
#  description :text
#  status      :boolean
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Product < ActiveRecord::Base
  #gems
  #scopes
  # default_scope { where(status:true) }
  #callbacks
  #relations
  has_many :order_items
  #validations
  #methods
end
