class Client < ApplicationRecord
  validates_presence_of :first_name
  validates_presence_of :last_name
  validates_presence_of :phone_number
  validates :email, presence: true
end
