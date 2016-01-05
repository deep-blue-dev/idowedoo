class Location < ActiveRecord::Base

  belongs_to :order
  belongs_to :profile, class_name: 'Profile'


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

end
