class ProductsController < ApplicationController
	def index
		render json: Product.where(:product_type => params[:product_type])
	end
end
