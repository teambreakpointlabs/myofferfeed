MyOfferFeed::Application.routes.draw do

  match "product_types(.:format)" => "product_types#index"

  root to: "MyOfferFeed#index"
end
