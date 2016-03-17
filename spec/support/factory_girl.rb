RSpec.configure do |config|
  # Factory girl helpers
  # FactoryGirl.create(:user) becomes create(:user)
  config.include FactoryGirl::Syntax::Methods

  config.before(:suite) do
    begin
      DatabaseCleaner.start
      # Test factories in spec/factories are working.
      FactoryGirl.lint
    ensure
      DatabaseCleaner.clean
    end
  end
end
