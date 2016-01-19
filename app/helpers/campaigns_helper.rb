module CampaignsHelper

  include ActionView::Helpers::TextHelper

  def date_time_options(amount_of_days)
    [ "#{pluralize(amount_of_days, 'day').titleize}
      ( #{ (Date.today + amount_of_days.day).strftime('%a, %b %d, %Y') } )" ,
      Date.today + amount_of_days.day
    ]
  end

end
