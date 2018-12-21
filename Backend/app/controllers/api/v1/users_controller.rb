class Api::V1::UsersController < ApplicationController
  before_action :load_user, only: %i(show update destroy)
  before_action :correct_user?, only: %i(update destroy)
  skip_before_action :authorize_request, only: %i(show)

  def show
    render json: {
       user: @user.as_json(only: [:id, :address, :name])
    }
  end

  def update
    if @user.update_attributes user_params
      render json: {
          status: true
      }
    else
      render json: {
          status: false,
          message: @user.errors.full_messages
      }
    end
  end

  def destroy
    if @user.destroy
      render json: {
          status: true
      }
    else
      render json: {
          status: false,
          message: @user.errors.full_messages
      }
    end
  end
  private
  def user_params
    params.require(:user).permit :name
  end

  def load_user
    @user = User.find_by id: params[:id]
    unless @user
      render json: {
          status: false,
          message: Settings.not_found
      }
    end
  end

  def correct_user?
    unless current_user?(@user)
      render json: {
          status: false,
          message: Settings.perpermission_denied
      }
    end
  end
end
