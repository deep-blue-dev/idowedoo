class UserProfile < ActiveRecord::Base

  belongs_to :user
  has_many :locations, dependent: :destroy

  def full_name
    first_name + '' + last_name
  end

end
