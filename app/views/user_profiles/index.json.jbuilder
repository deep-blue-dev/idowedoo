json.array!(@user_profiles) do |user_profile|
  json.extract! user_profile, :id, :user_id, :first_name, :last_name, :phone
  json.url user_profile_url(user_profile, format: :json)
end
