# == Schema Information
#
# Table name: locations
#
#  id            :integer          not null, primary key
#  title         :string
#  name          :string
#  street_number :string
#  street        :string
#  city          :string
#  state         :string
#  zipcode       :string
#  country       :string
#  unit          :string
#  long_address  :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  profile_id    :integer
#  user_title    :string
#
# Indexes
#
#  index_locations_on_profile_id  (profile_id)
#
# Foreign Keys
#
#  fk_rails_8c692a6426  (profile_id => profiles.id)
#

class Location < ActiveRecord::Base

  #gems
  require 'uri'

  #scopes

  #callbacks
  before_save :assign_default_title

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

  def assign_default_title
    self.user_title = "Default#{self.user.locations.size.next}" if self.user_title == ''
  end

  ## Rails Admin Config

  rails_admin do
    visible false
  end

end
