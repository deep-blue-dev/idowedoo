class CampaignCaseOption < ActiveRecord::Base
  belongs_to :campaign
  belongs_to :case
end
