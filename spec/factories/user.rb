FactoryGirl.define do
  factory :user do
    sequence :email do |i|
      "user#{i}#{SecureRandom.hex(10)}@test.com"
    end
    password "Password"
  end
end