class Location < ActiveRecord::Base

  #gems
  #scopes

  #callbacks
  before_save :default_title

  #relations
  belongs_to :order
  belongs_to :profile, class_name: 'Profile'

  #methods

  def street_address
    self.street_number + ' ' + self.street + ' ' + self.unit
  end

  def city_state
    self.city + ', ' + self.state
  end

  def googlemapsurl
    'http://maps.google.com/?q=' + self.long_address
  end

  def to_s
    self.name ||= ''
  end

  private

  def default_title
    self.user_title = "Default" if self.user_title == ''
  end
end
