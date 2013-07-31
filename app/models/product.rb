class Product < ActiveRecord::Base
  serialize :properties, ActiveRecord::Coders::Hstore
  attr_accessible :description, :image_url, :link_url, :make, :new_price, :old_price, :percent_off, :price_off, :product_type, :retailer, :title

  %w[screen_size tv_type model_no].each do |key|
    attr_accessible key
    scope "has_#{key}", lambda { |value| where("properties @> hstore(?, ?)", key, value) }
    
    define_method(key) do
      properties && properties[key]
    end
  
    define_method("#{key}=") do |value|
      self.properties = (properties || {}).merge(key => value)
    end
  end
end
