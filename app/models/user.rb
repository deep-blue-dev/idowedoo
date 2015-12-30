class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
 #gems
 #scopes
 # default_scope { where(status:true) }
 #callbacks
 #relations
 has_many :locations, dependent: :destroy
 #validations
 #methods
end
