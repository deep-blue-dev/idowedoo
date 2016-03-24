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
    template.url
  end
end
