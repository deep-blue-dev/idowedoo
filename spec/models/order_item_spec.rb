# == Schema Information
#
# Table name: order_items
#
#  id          :integer          not null, primary key
#  unit_price  :decimal(, )
#  quantity    :integer
#  total_price :decimal(, )
#  product_id  :integer
#  order_id    :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'rails_helper'

RSpec.describe OrderItem, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
