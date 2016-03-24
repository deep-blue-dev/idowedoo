RSpec.configure do |config|
  config.after(:suite) do
    # Remove the test Paperclip storage
    FileUtils.rm_rf("spec/storage/")
  end
end
