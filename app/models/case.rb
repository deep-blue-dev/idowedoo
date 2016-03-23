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

class Case < ActiveRecord::Base

  attr_accessor :delete_asset

  monetize :unit_cost_cents

  before_validation { self.asset.clear if self.delete_asset == '1' }

  belongs_to :brand, inverse_of: :cases
  belongs_to :creator, class_name: "User"

  has_and_belongs_to_many :colors

  has_attached_file :template,
                    :styles => {
                        :thumb => '100x100#',
                        :small  => '150x150>',
                        :medium => '200x200'}

  validates_attachment :template,
                       content_type: { content_type: 'image/svg+xml'}
  validates :creator, presence: true

  ## Rails Admin Config

  rails_admin do

    configure :title do
      required :true
    end

    configure :unit_cost, :decimal do
      formatted_value do
        bindings[:object].unit_cost
      end
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

    configure :unit_cost_currency do
      visible false
    end

  end

end
