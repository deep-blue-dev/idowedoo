# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default("0"), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :inet
#  last_sign_in_ip        :inet
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#

class User < ActiveRecord::Base

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable


  after_create :build_default_profile

  has_one :profile
  has_many :locations, dependent: :destroy

  # before_create :build_default_profile

  private

  def build_default_profile
    # build default profile instance. Will use default params.
    # The foreign key to the owning User model is set automatically
    build_profile
    true # Always return true in callbacks as the normal 'continue' state
    # Assumes that the default_profile can **always** be created.
    # or
    # Check the validation of the profile. If it is not valid, then
    # return false from the callback. Best to use a before_validation
    # if doing this. View code should check the errors of the child.
    # Or add the child's errors to the User model's error array of the :base
    # error item
  end



end
