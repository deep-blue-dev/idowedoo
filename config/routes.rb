Rails.application.routes.draw do
  # get 'charges/new'
  # get 'charges/create'
  get 'orders/index'
  get 'orders/create'
  get 'orders/show'
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
  get '/' => 'pages#coming-soon'
  get 'index' => 'pages#index', as: :index
  root 'pages#index'
end
