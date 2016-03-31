# == Schema Information
#
# Table name: cases_colors
#
#  case_id    :integer
#  color_id   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_cases_colors_on_case_id   (case_id)
#  index_cases_colors_on_color_id  (color_id)
#
# Foreign Keys
#
#  fk_rails_1dfa0b1e5c  (color_id => colors.id)
#  fk_rails_5a661cad6f  (case_id => cases.id)
#

class CasesColor < ActiveRecord::Base
  belongs_to :case
  belongs_to :color

  rails_admin do
    visible false
  end

end
