require 'rails_helper'

RSpec.describe Client, type: :model do
  subject {
    described_class.new(first_name: "Anything", last_name: "Anything", phone_number: "Anything", email: "Anything")
  }


  describe "Validations" do
    it "is valid with valid attributes" do
      expect(subject).to be_valid
    end

    it "is not valid without a first name" do
      subject.first_name = nil
      expect(subject).to_not be_valid
    end
    it "is not valid without a last name" do 
      subject.last_name = nil
      expect(subject).to_not be_valid
    end
    it "is not valid without a phone number" do
      subject.phone_number = nil
      expect(subject).to_not be_valid
    end
    it "is not valid without an email" do
      subject.email = nil
      expect(subject).to_not be_valid
    end
  end
end
