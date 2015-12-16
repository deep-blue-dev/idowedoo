Rails.application.routes.draw do

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
  get 'cart' => 'pages#cart', as: :cart
  get 'index' => 'pages#index', as: :index
  get '/' => 'pages#coming_soon'
  post '/' => 'pages#coming_soon'
  # You can have the root of your site routed with "root"

  root 'pages#coming_soon'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
