class Location < ActiveRecord::Base

  #gems
  require 'uri'

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

  def google_maps_url
    'http://maps.google.com/?q=' + self.long_address
  end

  def google_maps_img_url

    uri = URI.parse('https://maps.googleapis.com/maps/api/staticmap')

    uri.query = URI.encode_www_form(
        :center => self.long_address,
        :zoom => 18,
        :size => '150x150',
        :markers => 'color:red|' + self.long_address)

    uri.to_s

  end

  def to_s
    self.name ||= ''
  end

  private

  def default_title
    self.user_title = "Default" if self.user_title == ''
  end

end
