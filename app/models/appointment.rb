class Appointment < ApplicationRecord
  # belongs_to :stylist
  # belongs_to :client
  validates_presence_of :start_time
  validates_presence_of :start_date
  validates_presence_of :duration
end
