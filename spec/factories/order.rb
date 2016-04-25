FactoryGirl.define do
  factory :order do
    user_id { create(:user).id }
    num_items 1
    address_1 "123 Test St."
    address_city "Fake City"
    address_state "FK"
    address_zip "12345"
    address_country "US"
    stripe_token "FK_21kwejio3"
    campaign_id { create(:campaign).id }
    email "order#{SecureRandom.hex(10)}@test.com"
  end
end
