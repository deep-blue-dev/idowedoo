Rails.application.routes.draw do

  root 'pages#coming_soon'

  get '/' => 'pages#coming_soon'
  post '/' => 'pages#coming_soon'

end
