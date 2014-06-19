class HomeController < ApplicationController
  
  def index
  	@users = User.order('created_at DESC').all
  	
  	@user = User.new

  end
end
