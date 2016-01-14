json.array!(@campaigns) do |campaign|
  json.extract! campaign, :id, :title, :description, :start, :finish, :user_id, :goal_unit
  json.url campaign_url(campaign, format: :json)
end
