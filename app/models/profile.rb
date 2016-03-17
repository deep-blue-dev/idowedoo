# == Schema Information
#
# Table name: profiles
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  first_name :string
#  last_name  :string
#  phone      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Profile < ActiveRecord::Base

  belongs_to :user
  has_many :locations, dependent: :destroy

  def full_name
    first_name + '' + last_name
  end

end
