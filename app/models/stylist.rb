class Stylist < ApplicationRecord
  has_many :appointments, dependent: :destroy
  has_many :clients, through: :appointments

  validates_presence_of :first_name
  validates_presence_of :last_name
  validates_presence_of :email
end
