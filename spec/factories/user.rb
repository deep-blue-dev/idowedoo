FactoryGirl.define do
  factory :user do
    email "user#{SecureRandom.hex(10)}@test.com"
    password "Password"
  end
end