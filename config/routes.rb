Rails.application.routes.draw do

  root  'pages#coming_soon'

  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  # Devise
  devise_for :users
  devise_scope :user do
    get 'sign_in', to: 'devise/sessions#new', as: :sign_in
    get 'sign_up', to: 'devise/registrations#new', as: :sign_up
    get 'sign_out', to: 'devise/sessions#destroy', as: :sign_out
  end

  # Pages
  get '/coming_soon', to: 'pages#coming_soon', as: :coming_soon
  post '/landing_email', to: 'pages#landing_email', as: :landing_email_subscribe
  get   'learn', to: 'pages#learn', as: :learn
  get   'cart', to: 'pages#cart', as: :cart
  get   'index', to: 'pages#index', as: :index
  get   'create', to: 'pages#create', as: :create

  resources :cases, only: [:index, :new, :create, :edit, :update]
  post '/add_image', to: "cases#add_image", as: :image_upload
  # Campaigns
  resources :campaigns
  get   'campaigns/case_options'
  get   'campaigns/cases_by_brand'
  # get   'campaign', to: 'pages#campaign', as: :campaign

  # Cart Stuff
  get   'carts/address'
  post  'carts/location'
  get 'carts/checkout', to: 'carts#checkout'
  post 'carts/location'
  get '/cart2', to: 'carts#show'

  # TODO: This should post to Charges#New not Charges#Charge
  post  '/charge', to: 'charges#charge'

  # TODO: Are these even needed? They conflict with normal REST methods
  get   'charges/create'
  get   'order_items/create'

  # Orders
  resources :orders
  get   'orders/index'
  post  'orders/create'
  get   'orders/show'

  # Resources
  resources :order_items
  resources :products
  resources :charges

  resource :profile do
    resources :locations
  end
end
