class Location < ActiveRecord::Base

  belongs_to :order
  belongs_to :profile, class_name: 'UserProfile'

end
