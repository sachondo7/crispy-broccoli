# frozen_string_literal: true

# rubocop:disable Metrics/BlockLength
Rails.application.routes.draw do
  post '/messages', to: 'messages#create', as: 'messages_create'
  get 'rooms/new'
  get 'rooms/index'
  post 'rooms', to: 'rooms#create'
  get 'rooms/show'
  delete 'rooms/delete', to: 'rooms#delete'

  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  get 'resenas/index'
  get 'resenas/new'
  post 'resenas/new', to: 'resenas#create', as: 'create_resena'
  get 'resenas/edit'
  patch 'resenas/update', to: 'resenas#update'
  delete 'resenas/delete/:id', to: 'resenas#delete'
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations', users: 'users'
  },
                     path: '', path_names: {
                       sign_in: 'login',
                       sign_out: 'logout', sign_up: 'register'
                     }

  root to: 'controllers#index'

  get 'users/profile/:id', to: 'users#profile', as: 'profile'
  delete 'users/delete/:id', to: 'users#delete', as: 'delete_user'

  get 'users/profiles', to: 'users#profiles', as: 'profiles'

  get 'publicacions/new'
  post 'publicacions', to: 'publicacions#create'

  get 'publicacions/index'
  get 'publicacions/show'
  get 'publicacions/edit'

  patch 'publicacions/update', to: 'publicacions#update'

  delete 'publicacions/delete', to: 'publicacions#delete'

  get 'requests/new'
  post 'requests', to: 'requests#create'
  get 'requests/delete'
  get 'requests/show'
  get 'requests/index'
  get 'requests/update'

  delete 'requests/delete', to: 'requests#delete'
  get 'controllers/index'
  get 'sobre_nosotros/index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
# rubocop:enable Metrics/BlockLength
