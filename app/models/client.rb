class Client < ApplicationRecord
  has_many :appointments
  has_many :stylists, through: :appointments
  
  validates_presence_of :first_name
  validates_presence_of :last_name
  validates_presence_of :phone_number
  validates :email, presence: true, unique: true
end
