Rails.application.routes.draw do
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

  get 'learn' => 'pages#learn', as: :learn
  # TODO 1
  # get '/' => 'pages#coming-soon'
  get 'index' => 'pages#index', as: :index
  # TODO 2
  # root 'pages#index'
  # TODO for now using this one uncomment TODO 1 & 2
  root 'products#index'
end
