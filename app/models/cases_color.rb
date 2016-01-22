class CasesColor < ActiveRecord::Base
  belongs_to :case
  belongs_to :color


  rails_admin do
    visible false
  end

end
