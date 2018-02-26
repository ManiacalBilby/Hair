require 'rails_helper'

RSpec.describe Appointment, type: :model do
  subject {
    described_class.new(
    start_time: "13:00:00:00", 
    start_date: "2018-03-02",
    duration: 120)
  }
  it "is valid with valid attributes" do
    expect(subject).to be_valid
  end
  it "is not valid without a start time" do
    subject.start_time = nil
    expect(subject).to_not be_valid
  end
  it "is not valid without a start date" do
    subject.start_date = nil
    expect(subject).to_not be_valid
  end
  it "is not valid without a duration" do
    subject.duration = nil
    expect(subject).to_not be_valid
  end
end
