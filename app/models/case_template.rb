# == Schema Information
#
# Table name: case_templates
#
#  id                    :integer          not null, primary key
#  template_file_name    :string
#  template_content_type :string
#  template_file_size    :integer
#  template_updated_at   :datetime
#  name                  :string
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#

class CaseTemplate < ActiveRecord::Base

  has_many :cases

  has_attached_file :template,
                    :styles => {
                        :thumb => '100x100#',
                        :small  => '150x150>',
                        :medium => '200x200'}

  validates_attachment :template, presence: true,
                       content_type: { content_type: 'image/svg+xml'}

  def url
    url = template.url
    if template.url.starts_with?("http://s3.amazonaws.com/idowedo")
      "//idowedo.s3-us-west-1.amazonaws.com/" + template.url.split("http://s3.amazonaws.com/idowedo")[1]
    end
    url
  end
end
