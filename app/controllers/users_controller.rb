class UsersController < ApplicationController
  protect_from_forgery with: :null_session
  
  def index
    data_table
  end

  def destroy
    @user = User.find_by(id: params[:id])
    ap @user
    @user.destroy

    render json: { user: @user }
  end

  private

  def filter_users
    @users = User.all
    # search
    if params[:search].present?
      search = "%#{params[:search]}%"
      @users = @users.where('first_name LIKE :search OR
                                   last_name LIKE :search OR
                                   phone_number LIKE :search',
                                   search: search)
    end
  end

  def data_table
    filter_users

    total = @users.count
    @users = @users.limit(params[:limit]).offset(params[:offset])

    render json: { users: @users, total: total }
  end
end