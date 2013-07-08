class UserEmailController < ApplicationController
respond_to :json
	def index
		respond_with UserEmail.all
	end
	def show
	  respond_with UserEmail.find(params[:id])
	end
	def create
	    respond_with UserEmail.create(params[:user_email])
	end
	def update
	  respond_with UserEmail.update(params[:id], params[:user_email])
	end

	def destroy
		respond_with UserEmail.destroy(params[:id])
	end
end
