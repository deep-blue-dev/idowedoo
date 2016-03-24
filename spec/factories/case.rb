FactoryGirl.define do
  factory :case do
    title "case_title_#{SecureRandom.hex(10)}"
    template = create(:case_template)
    template_id { template.id }
    creator { create(:user, email: "case_user_#{SecureRandom.hex(3)}@case.com") }
  end
end
