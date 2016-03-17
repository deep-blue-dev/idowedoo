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
    if email.empty?
      errors[:email] << I18n.t('landing_email.errors.email_missing')
    elsif LandingEmail.where(email: email).any?
      errors[:email] << I18n.t('landing_email.errors.already_registered')
    elsif !email.match(/\A[\w+\-.]+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i)
      errors[:email] << I18n.t('landing_email.errors.invalid_email')
    end
  end
end
