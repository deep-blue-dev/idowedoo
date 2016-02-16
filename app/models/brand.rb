class Brand < ActiveRecord::Base

  has_many :cases, inverse_of: :brand

  rails_admin do
    visible false
  end

end
