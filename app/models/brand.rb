# == Schema Information
#
# Table name: brands
#
#  id         :integer          not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Brand < ActiveRecord::Base

  has_many :cases, inverse_of: :brand

  rails_admin do
    visible false
  end

end
