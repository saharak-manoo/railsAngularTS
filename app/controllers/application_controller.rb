class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token
  protect_from_forgery with: :null_session

  def users_decorate_as_json(obj)
    obj.decorate.as_json(
      decorator_methods: [
        :full_name,
        :admin?,
        :roles,
        :created_at_formatted,
        :updated_at_formatted,
        :deleted_at_formatted,
        :photo,
        :photo_url
      ])

    return obj
  end
end
