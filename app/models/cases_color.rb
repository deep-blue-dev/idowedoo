# == Schema Information
#
# Table name: cases_colors
#
#  case_id    :integer
#  color_id   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class CasesColor < ActiveRecord::Base
  belongs_to :case
  belongs_to :color

  rails_admin do
    visible false
  end

end
