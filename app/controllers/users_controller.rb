class UsersController < ApplicationController
  def new
  	@user = User.new
  end
  
  def index
  	@users = User.order('created_at DESC').all

    respond_to do |format|
      format.html
      format.json { render json: @users }
    end
  end

  def show
  	@user = User.find(params[:id])
  end
  
  def edit
  	@user = User.find(params[:id])
  end
  
  def update
  	@user = User.find(params[:id])
    if @user.update_attributes(user_params)
	  render :partial => 'shared/user_form', :object => @user
    else
      render 'edit'
    end
  end
  
  def create
  	@user = User.new(user_params)

  	if @user.save
	  render :partial => 'shared/user_form', :object => @user
  	else
  		render 'new'
  	end
  end
  
  def destroy
    User.find(params[:id]).destroy
    flash[:success] = "User deleted."
    redirect_to users_url
  end

  private
  
  	def user_params
  		params.require(:user).permit(:first_name, :last_name, :email, :address_text, :address_coords)
  	end
end
