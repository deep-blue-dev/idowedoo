# == Schema Information
#
# Table name: landing_emails
#
#  id         :integer          not null, primary key
#  email      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class LandingEmail < ActiveRecord::Base
  validate :email_is_valid

  def email_is_valid
    unless email.present? and email.match(/\A[\w+\-.]+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i)
      errors[:email] << I18n.t('landing_email.errors.invalid_email')
    end
  end
end
