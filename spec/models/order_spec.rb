# == Schema Information
#
# Table name: orders
#
#  id              :integer          not null, primary key
#  user_id         :integer
#  case_id         :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  subtotal        :decimal(, )
#  tax             :decimal(, )
#  shipping        :decimal(, )
#  total_price     :decimal(, )
#  order_status_id :integer
#  tracking_no     :string
#

require 'rails_helper'

RSpec.describe Order, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
