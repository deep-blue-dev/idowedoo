# == Schema Information
#
# Table name: locations
#
#  id            :integer          not null, primary key
#  title         :string
#  name          :string
#  street_number :string
#  street        :string
#  city          :string
#  state         :string
#  zipcode       :string
#  country       :string
#  unit          :string
#  long_address  :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  profile_id    :integer
#  user_title    :string
#

require 'rails_helper'

RSpec.describe Location, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
