class Color < ActiveRecord::Base
  belongs_to :cases


  def name
    value
  end

  def human
    value
  end

  rails_admin do
    edit do
      include_all_fields
      field :value, :color
    end
    list do
      include_all_fields
      field :value, :color
    end
  end
end
