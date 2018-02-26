require 'rails_helper'

RSpec.describe Appointment, type: :model do
  it "is valid with valid attributes" do
    expect(Appointment.new).to be_valid
  end
  it "is not valid without a start time"
  it "is not valid without a start date"
  it "is not valid without a duration"
end
