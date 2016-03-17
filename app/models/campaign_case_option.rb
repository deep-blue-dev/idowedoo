# == Schema Information
#
# Table name: campaign_case_options
#
#  id          :integer          not null, primary key
#  campaign_id :integer
#  case_id     :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class CampaignCaseOption < ActiveRecord::Base
  belongs_to :campaign
  belongs_to :case
end
