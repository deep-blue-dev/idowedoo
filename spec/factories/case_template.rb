FactoryGirl.define do
  factory :case_template do
    title "case_template_#{SecureRandom.hex(10)}"
    template { File.new(File.join(Rails.root, 'spec', 'factories', 'factory_files', 'image.svg')) }
  end
end
