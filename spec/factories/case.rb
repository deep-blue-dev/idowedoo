FactoryGirl.define do
  factory :case do
    title "case_title_#{SecureRandom.hex(10)}"
    template_id { create(:case_template).id }
    creator_id { create(:user, email: "case_user_#{SecureRandom.hex(3)}@case.com").id }
  end
end
