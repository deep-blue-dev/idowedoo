source 'https://rubygems.org'

ruby '2.2.3'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.2.4'
gem 'pg'

# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

# Use ActiveModel has_secure_password
gem 'bcrypt', '~> 3.1.7'

### Libraries

gem 'turbolinks' # Turbo mode for views
gem 'devise' # Devise some users
gem 'figaro' # Env Dependent Keys
gem 'stripe' # Payments made simple
gem 'easypost' # Easy Shipping
gem 'rails_admin' # Auto-Magic Admin Dashboard
gem 'paperclip' # File Handler
gem 'aws-sdk' # AWS
gem 'money-rails'
gem 'annotate' # Add model DB data to app/models/*.rb file
gem 'bootstrap-slider-rails'

### Assets

gem 'bootstrap-sass' # Pull yourself up by your
gem 'slim-rails' # Lose some weight
gem 'sass-rails' # Use SCSS for stylesheets
gem 'coffee-rails' # CoffeeScript
gem 'jquery-rails' # jQuery
gem 'uglifier', '>= 1.3.0' # Use Uglifier as compressor for JavaScript assets
gem 'jbuilder', '~> 2.0' # Build JSON APIs with ease

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug'
  gem 'rspec-rails'
  gem 'capybara'
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console', '~> 2.0'

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'

  gem 'thin' # Light Web Server
  gem 'better_errors' # Debuggers
  gem 'binding_of_caller'
  gem 'awesome_print'
  gem 'pry-rails'
  gem 'pry-byebug'
  gem 'quiet_assets' # Shhh.. we don't need to see the assets
end

group :test do
  # Creates models for testing
  gem 'factory_girl_rails'
  # Cleans all records from DB before each test
  gem 'database_cleaner'
end

group :production do

  gem 'rails_12factor'

end
