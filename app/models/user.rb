class User < ActiveRecord::Base
  before_save { self.email = email.downcase }
  
  validates :first_name,  presence: true, length: { maximum: 50 }
  validates :last_name,  presence: true, length: { maximum: 50 }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, format: { with: VALID_EMAIL_REGEX }, uniqueness: { case_sensitive: false }
  validates :address_text,  presence: true
  
  #after_save :write_json
end

# def write_json
#   users_json = []
#   User.all.each do |user|
#     user_json = {
#       "id" => user.id,
#       "first" => user.first_name,
#       "last" => user.last_name,
#       "email" => user.email,
#       "address" => user.address_text,
#       "coordinates" => user.address_coords
#     } 
#     users_json << user_json
#   end
#   File.open("public/user.json","w") do |f|
#     f.write(users_json.as_json)
#   end 
# end