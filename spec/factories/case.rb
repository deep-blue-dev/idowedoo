FactoryGirl.define do
  factory :case do
    title "case_title_#{SecureRandom.hex(10)}"
    template { File.new(File.join(Rails.root, 'spec', 'factories', 'factory_files', 'image.svg')) }
    creator { create(:user, email: "case_user_#{SecureRandom.hex(3)}@case.com") }
  end
end
