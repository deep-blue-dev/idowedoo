class Campaign < ActiveRecord::Base

  include ActionView::Helpers::DateHelper

  belongs_to :user


  def length
    distance_of_time_in_words(self.start, self.finish)
  end
end
