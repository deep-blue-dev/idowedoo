  # TODO first one is yours
# Rails.application.routes.draw do
#
#   get 'carts/show'
#
#   root 'pages#coming_soon'
#   get '/' => 'pages#coming_soon'
#   post '/' => 'pages#coming_soon'
#
#   get 'order_items/create'
#   get 'charges/new'
#   get 'charges/create'
#   get 'orders/index'
#   post 'orders/create'
#   get 'orders/show'
#
#   resources :orders
#   resources :order_items
#   resources :products
#   resources :charges
#   resource :cart, only: [:show]
#   resources :users, only: [:new, :show, :edit]
#   resources :cases, only: [:new, :show, :create]
#   devise_for :users
#
#   devise_scope :user do
#     get "sign_in", :to => "devise/sessions#new", as: :sign_in
#     get "sign_up", :to => "devise/registrations#new", as: :sign_up
#     get "sign_out", :to => "devise/sessions#destroy", as: :sign_out
#   end
#
#   resources :users, only: [:new, :show, :edit]
#   resources :cases, only: [:new, :show, :create]
#
#
#   get 'learn' => 'pages#learn', as: :learn
#   # get '/' => 'pages#coming-soon'
#   # get 'cart' => 'pages#cart', as: :cart
#   get '/' => 'pages#coming-soon'
# # last end here
#   # get 'cart' => 'pages#cart', as: :cart
#
# end

Rails.application.routes.draw do
  # NOTE hg routes
    resource :cart, only: [:show]
    get 'carts/show'


  root 'pages#coming_soon'
  get '/' => 'pages#coming_soon'
  post '/' => 'pages#coming_soon'

  get 'order_items/create'

  get 'charges/new'
  get 'charges/create'
  get 'orders/index'
  post 'orders/create'
  get 'orders/show'
  resources :orders
  resources :order_items
  resources :products
  resources :charges
  resources :users, only: [:new, :show, :edit]
  resources :cases, only: [:new, :show, :create]
  devise_for :users

  devise_scope :user do
    get "sign_in", :to => "devise/sessions#new", as: :sign_in
    get "sign_up", :to => "devise/registrations#new", as: :sign_up
    get "sign_out", :to => "devise/sessions#destroy", as: :sign_out
  end

  resources :users, only: [:new, :show, :edit]
  resources :cases, only: [:new, :show, :create]


  get 'learn' => 'pages#learn', as: :learn
  # get 'cart' => 'pages#cart', as: :cart
  get 'index' => 'pages#index', as: :index

end
