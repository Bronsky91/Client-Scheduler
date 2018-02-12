class SessionsController < ApplicationController
  require 'base64'
  require 'securerandom'
  # POST /auth
  def create
    headers = {
      'Authorization' => 'Basic '+ Base64.strict_encode64(API_KEY + ':' + params[:username] + ':' + params[:password]),
      'Content-Type' => 'application/json'
      }
    # Receives login data by POST and calls Redtail API returning Succes or Failure
    @auth = HTTParty.get(
        'http://dev.api2.redtailtechnology.com/crm/v1/rest/authentication',
        headers: headers)
    user_key = @auth['UserKey']
    # Creates auth payload back to frontend
    # Checks if auth was successful
    if @auth['Message'] == 'Success'
      user = User.find_by_userkey(user_key)
      auth_token = p SecureRandom.hex(10)
      # adds auth token to payload
      payload = { message: @auth['Message'], token: auth_token}
      if user
        # updates token in api DB
        user.auth_token = auth_token
        user.save!
      else
        link = p SecureRandom.hex(5)
        # Creates new user in api DB w/ token
        new_user = User.new(userid: @auth['UserID'], userkey: user_key, link: link, auth_token: auth_token)
        new_user.save!
      end
      render json: payload
    else 
      render status: 500
    end
    # Message returned if API auth was Successful or Failed
  end

  def destroy
    user = User.find_by_auth_token(request.headers['token'])
    user.auth_token = nil
    user.save!
    payload = {message: 'Logged Out'}
    if user.auth_token == nil
      render json: payload
    end 
  end
end
