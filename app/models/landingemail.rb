# == Schema Information
#
# Table name: landingemails
#
#  id         :integer          not null, primary key
#  email      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Landingemail < ActiveRecord::Base
end
