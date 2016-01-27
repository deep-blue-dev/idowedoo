class Case < ActiveRecord::Base

  has_many :colors

  ## Rails Admin Config

  rails_admin do

    configure :title do
      required :true
    end

    configure :unit_cost do
      required :true
    end

    configure :unit_min do
      label 'Unit Minimum'
      help 'Minimum unit purchase amount'
      required :true
      html_attributes do {
          value: 1,
          min: 1
      }
      end
    end
    configure :colors do
      required :true
    end
  end

end
