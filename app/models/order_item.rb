class OrderItem < ActiveRecord::Base

  #gems
  #scopes
  # default_scope {
  #   where(status:true)
  # }
  #callbacks
  #relations
  belongs_to :product
  belongs_to :order
  #validations
  #methods
end
