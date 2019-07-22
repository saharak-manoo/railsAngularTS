class UsersController < ApplicationController
  
  def index
    data_table
  end

  def show
    @user = User.find_by(id: params[:id])
    render json: { user: @user, photo_url: @user&.photo&.url }
  end

  def update
    @user = User.find_by(id: params[:id])
    if @user.update(user_params)
      render json: { updated: true }, status: :ok
    else
      render json: { updated: false, errors: @user&.errors }, status: 500
    end  
  end

  def destroy
    @user = User.find_by(id: params[:id])
    @user.destroy

    render json: { user: @user }
  end

  def check_sign_in
    render json: { signed_in: user_signed_in?, 
                   current_user: current_user, 
                   photo_url: current_user&.photo&.url,
                   role_admin: current_user&.has_role?(:admin) }
  end  

  private

  def filter_users
    @users =  if user_signed_in?
                User.where.not(id: current_user&.id)
              else 
                User.all
              end  
    # search
    if params[:search].present?
      search = "%#{params[:search]}%"
      @users = @users.where('email LIKE :search OR
                             first_name LIKE :search OR
                             last_name LIKE :search OR
                             phone_number LIKE :search',
                             search: search)
    end
  end

  def data_table
    filter_users

    total = @users.count
    @users = @users.limit(params[:limit]).offset(params[:offset])

    render json: { users: @users, 
                   page: { limit: params[:limit],
                           total: total,
                           totalPages: (total / params[:limit].to_i),
                           offset: params[:offset] }
                  }
  end

  def user_params
    params.require(:user).permit(:email, :password, :first_name, :last_name, :phone_number, :photo)
  end
end