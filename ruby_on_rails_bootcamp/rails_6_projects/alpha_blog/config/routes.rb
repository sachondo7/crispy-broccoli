Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root "pages#home"
  get '/about', to: 'pages#about'
  resources :articles #esto crea todas las rutas para articles
  get 'signup', to: 'users#new' #ruta para crear un nuevo usuario
  resources :users 
  get 'login', to: 'sessions#new' #ruta para crear una nueva sesion
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  resources :categories, except: [:destroy] #esto crea todas las rutas para categories excepto la de eliminar
end
