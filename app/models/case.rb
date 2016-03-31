# == Schema Information
#
# Table name: cases
#
#  id                 :integer          not null, primary key
#  title              :string
#  unit_min           :integer
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  unit_cost_cents    :integer          default(0), not null
#  unit_cost_currency :string           default("USD"), not null
#  brand_id           :integer
#  creator_id         :integer
#  template_id        :integer
#  saved_data         :text
#  saved_png          :text
#
# Indexes
#
#  index_cases_on_brand_id  (brand_id)
#

class Case < ActiveRecord::Base

  attr_accessor :delete_asset

  monetize :unit_cost_cents

  before_validation { self.asset.clear if self.delete_asset == '1' }

  belongs_to :brand, inverse_of: :cases
  belongs_to :case_template, class_name: "CaseTemplate", foreign_key: "template_id"
  has_many :images

  has_and_belongs_to_many :colors

  validates_presence_of :template_id, :creator_id

  after_create :setup_json

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

  def template
    case_template
  end

  private

  def setup_json
    saved_data = {caseTemplateURL: template.url}
    update_column(:saved_data, saved_data.to_json)
  end

end
  
