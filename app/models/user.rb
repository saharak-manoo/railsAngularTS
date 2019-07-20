class User < ApplicationRecord
  rolify
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable

  after_create :assign_default_role

  ROLE_CUSTOMER = :customer
  ROLE_ADMIN = :admin

  def assign_default_role
    self.add_role(ROLE_CUSTOMER) if self.roles.blank?
  end

  def full_name
    "#{first_name} #{last_name}"
  end  
end
