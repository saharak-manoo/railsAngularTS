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
                   current_user: current_user&.decorate.as_json(
                                              decorator_methods: [
                                                :full_name,
                                                :admin,
                                                :roles,
                                                :created_at_formatted,
                                                :updated_at_formatted,
                                                :deleted_at_formatted,
                                                :photo,
                                                :photo_url
                                              ]) 
                  }
                                            
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
    limit = params[:limit].to_i
    offset = params[:page_now].present? ? (params[:page_now].to_i * limit) : params[:offset]
    @users = @users.limit(limit).offset(offset)

    # sort and order
    if params[:sort].present?
      @users = @users.order("#{params[:sort]} #{params[:order]}")
    end  

    render json: { users: @users.decorate.as_json(
                                decorator_methods: [
                                  :full_name,
                                  :admin,
                                  :roles,
                                  :created_at_formatted,
                                  :updated_at_formatted,
                                  :deleted_at_formatted,
                                  :photo,
                                  :photo_url
                                ]),
                   page: { limit: limit,
                           total: total,
                           totalPages: (total / limit),
                           page_now: params[:page_now] }
                  }
  end 

  def user_params
    params.require(:user).permit(:email, :password, :first_name, :last_name, :phone_number, :photo)
  end
end