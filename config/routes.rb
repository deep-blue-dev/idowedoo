Rails.application.routes.draw do

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

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".
  get 'learn' => 'pages#learn', as: :learn

  # checkout routes - hg
  # TODO 1
  # get '/' => 'pages#coming-soon'

  get 'cart' => 'pages#cart', as: :cart
  get '/' => 'pages#coming-soon'

  get 'index2' => 'pages#index', as: :hector
  # TODO 2
  # root 'pages#index'
  # TODO for now using this one uncomment TODO 1 & 2
  # root 'products#index'

# last end here
  # get 'cart' => 'pages#cart', as: :cart

end
