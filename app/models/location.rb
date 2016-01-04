class Location < ActiveRecord::Base
  #gems
  #scopes
  #callbacks
  before_save :default_title
  #relations
  belongs_to :order
  belongs_to :user
  #validations

  #methods
  private
    def default_title
      self.user_title = "Default" if self.user_title == ''
    end
end
