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
      "http://idowedo.s3-us-west-1.amazonaws.com/" + template.url.split("http://s3.amazonaws.com/idowedo")[1]
    end
    url
  end
end
