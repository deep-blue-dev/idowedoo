# == Schema Information
#
# Table name: landingemails
#
#  id         :integer          not null, primary key
#  email      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'rails_helper'

RSpec.describe Landingemail, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
