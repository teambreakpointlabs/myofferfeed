MyOfferFeed::Application.routes.draw do

  match "product_types(.:format)" => "product_types#index"
  match "products(.:format)" => "products#index"

  resources :user_email
  
  match "app" => "MyOfferFeed#another"
  root to: "MyOfferFeed#index"
end
