class ApplicationController < ActionController::API
  include Response
  include ExceptionHandler
  attr_reader :current_user
  before_action :authorize_request

  def current_user?(user)
    user == @current_user
  end

  def authorize_request
    @current_user = (AuthorizeApiRequest.new(request.headers).call)[:user]
  end
end
