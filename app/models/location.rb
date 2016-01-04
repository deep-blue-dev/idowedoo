class Location < ActiveRecord::Base
  #gems
  #scopes
  #callbacks
  before_save :assign_default_title
  #relations
  belongs_to :order
  belongs_to :user
  #validations

#methods
  private
    def assign_default_title
      self.user_title = "Default#{self.user.locations.size.next}" if self.user_title == ''
    end
end
