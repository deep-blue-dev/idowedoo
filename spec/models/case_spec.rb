# == Schema Information
#
# Table name: cases
#
#  id                    :integer          not null, primary key
#  title                 :string
#  unit_min              :integer
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  template_file_name    :string
#  template_content_type :string
#  template_file_size    :integer
#  template_updated_at   :datetime
#  unit_cost_cents       :integer          default("0"), not null
#  unit_cost_currency    :string           default("USD"), not null
#  brand_id              :integer
#

require 'rails_helper'

RSpec.describe Case, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
