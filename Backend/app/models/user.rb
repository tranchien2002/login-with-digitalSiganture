class User < ApplicationRecord
  validates :address, uniqueness: true
end
