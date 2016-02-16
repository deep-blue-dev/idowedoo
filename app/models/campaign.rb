class Campaign < ActiveRecord::Base

  include ActionView::Helpers::DateHelper

  belongs_to :user

  has_many :campaign_case_options, dependent: :destroy
  accepts_nested_attributes_for :campaign_case_options


  def length
    distance_of_time_in_words(self.start, self.finish)
  end
end
