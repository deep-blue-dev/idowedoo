Rails.configuration.easy_post = {
    :api_key => ENV['easy_post_key']
}


EasyPost.api_key = Rails.configuration.easy_post[:api_key]
