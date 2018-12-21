Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      post "auth/login", to: "authentications#authenticate"
      get "get_nonce/:address", to: "authentications#get_nonce"
      resources :users, except: %i(edit new)
    end
  end
end
