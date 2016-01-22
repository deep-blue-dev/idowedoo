class Case < ActiveRecord::Base
  has_and_belongs_to_many :colors

  accepts_nested_attributes_for :colors

end
