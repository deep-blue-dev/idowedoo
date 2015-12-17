class Case < ActiveRecord::Base
  #gems
  #scopes
  #callbacks
  #relations
  has_many :orders
  has_many :users, through: :orders
  #validations
  #methods

end
