# == Schema Information
#
# Table name: colors
#
#  id         :integer          not null, primary key
#  value      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Color < ActiveRecord::Base

  has_and_belongs_to_many :cases

  def name
    value
  end

  def human
    value
  end

  rails_admin do
    edit do
      include_all_fields
      field :value, :color
    end
    list do
      include_all_fields
      field :value, :color
    end
  end
end
