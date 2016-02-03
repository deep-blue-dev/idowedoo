class Case < ActiveRecord::Base

  attr_accessor :delete_asset

  before_validation { self.asset.clear if self.delete_asset == '1' }

  has_and_belongs_to_many :colors

  has_attached_file :template,
                    :styles => {
                        :thumb => '100x100#',
                        :small  => '150x150>',
                        :medium => '200x200'}

  validates_attachment :template, presence: true,
                       content_type: { content_type: 'image/svg+xml'}


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
