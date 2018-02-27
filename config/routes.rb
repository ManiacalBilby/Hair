Rails.application.routes.draw do
  namespace :api do
    resources :stylists do
      resources :appointments do
        resources :clients
      end
    end
  end  
end
