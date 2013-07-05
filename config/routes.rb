MyOfferFeed::Application.routes.draw do

  match "product_types(.:format)" => "product_types#index"
  match "products(.:format)" => "products#index"

  match "app" => "MyOfferFeed#another";
  root to: "MyOfferFeed#index"
end
