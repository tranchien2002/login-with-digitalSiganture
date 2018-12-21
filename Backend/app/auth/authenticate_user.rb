class AuthenticateUser
  require "eth"
  def initialize(address, signature)
    @address = address
    @signature = signature
  end

  def call
    JsonWebToken.encode(id: user.id) if user
  end

  private

  attr_reader :address, :signature

  def user
    user = User.find_by(address: address)
    return user if user && verify_signature(user.nonce)
    raise(ExceptionHandler::AuthenticationError, Message.invalid_credentials)
  end

  def verify_signature nonce
    msg = "Log in with #{nonce}"
    address_owner = Eth::Utils.public_key_to_address(Eth::Key.personal_recover(msg, signature))
    if (address_owner.downcase! == address)
      return true
    else
      return false
    end
  end
end