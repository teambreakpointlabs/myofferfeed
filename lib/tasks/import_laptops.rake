namespace :data do
	desc "scrape and import product data"
	task :scrape => :environment do
      sh %{casperjs lib/tasks/tv_scrape.js}
	end
	task :import_laptops => :environment do
		file = File.open("lib/tasks/tmp/laptop_scrape.txt")
		file.each do |line|
			attrs = line.split(";")
			p = Product.new
			p.link_url = attrs[0]
			p.image_url = attrs[1]
			p.old_price = attrs[2]
			p.price_off = attrs[3]
			p.new_price = attrs[4]
			p.retailer = attrs[5]
			p.make = attrs[6]
			p.screen_size = attrs[7]
			p.product_type = attrs[8]
			p.percent_off = attrs[9]
			p.save!	
		end
	end
end