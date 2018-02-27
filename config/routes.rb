Rails.application.routes.draw do
  namespace :api do
    resources :stylist do
      resources :appointments do
        resources :clients
      end
    end
  end  
end
