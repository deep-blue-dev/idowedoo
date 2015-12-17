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
