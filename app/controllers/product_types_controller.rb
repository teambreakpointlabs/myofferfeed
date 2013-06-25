class ProductTypesController < ApplicationController
	def index
		render json: ProductType.all
		#ProductType.uniq.pluck(:product_type)
	end
end
