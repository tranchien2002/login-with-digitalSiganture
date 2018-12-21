module Response
  def json_response(object, status = :success)
    render json: object, status: status
  end
end