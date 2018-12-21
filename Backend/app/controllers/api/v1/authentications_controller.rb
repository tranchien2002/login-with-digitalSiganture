class Api::V1::AuthenticationsController < ApplicationController
  skip_before_action :authorize_request, only: %i(authenticate get_nonce)

  def get_nonce
    user = User.find_or_create_by address: params[:address]
    render json: {
        status: true,
        nonce: user.nonce
    }
  end

  def authenticate
    random = Random.new
    auth_token = AuthenticateUser.new(auth_params[:address], auth_params[:signature]).call
    user = User.find_by address: auth_params[:address]
    render json: {
      status: true,
      auth_token: auth_token,
      name: user.name
    }
    new_nonce = random.rand(100)
    while(new_nonce == user.nonce)
      new_nonce = random.rand(100)
    end
    user.update_attributes nonce: new_nonce
  end

  private

  def auth_params
    params.permit(:signature, :address)
  end
end
