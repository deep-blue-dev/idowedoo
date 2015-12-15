class Order < ActiveRecord::Base
  #gems
  #relations
  belongs_to :user
  belongs_to :case
  has_many :order_items

  #scopes
  #callbacks
  #validations

  #methods
end
