source 'https://rubygems.org'

#gems added
gem 'figaro' #env variable for development
gem 'stripe' #payments
gem 'easypost' #shipping computations
#gems for production:
gem 'pg'
gem 'rails_12factor'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.2.4'

# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'

# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
gem 'turbolinks'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.0'
# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0', group: :doc

# Use ActiveModel has_secure_password
gem 'bcrypt', '~> 3.1.7'


gem 'devise' # Devise some users

### Assets

gem 'bootstrap-sass' # Pull yourself up by your
gem 'slim-rails' # Lose some weight
gem 'sass-rails' # Use SCSS for stylesheets
gem 'coffee-rails' # CoffeeScript
gem 'jquery-rails' # jQuery

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
