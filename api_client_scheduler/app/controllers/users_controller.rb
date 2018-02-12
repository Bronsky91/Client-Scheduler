class UsersController < ApplicationController
  before_action :logged_in_user, only: %i[current get_timeslots update_timeslots update_user]

  def logged_in_user
    @user = User.find_by_auth_token(request.headers['token'])
  end

  # GET /user
  def current
    render json: @user
  end

  # POST /user
  def update_user
    @user.update(name: params[:name], email: params[:email], link: params[:link])
    render json: @user
  end

  # GET /timeslots
  def get_timeslots
    if request.headers['token']
      render json: @user.timeslots
    else
      @user = User.find_by_link(request.headers['link'])
      headers = {'Authorization'  => 'Userkeyauth '+ Base64.strict_encode64(API_KEY+':'+@user.userkey),
        'Content-Type' => 'application/json', 'Accept' => 'application/json'}
      data = [{Field: 21, Operand: 0, Value: @user.userid},
              {Field: 4, Operand: 1, Value: Time.now.strftime('%m-%d-%Y')}]
      @calData = HTTParty.post(
        'http://dev.api2.redtailtechnology.com/crm/v1/rest/calendar/search', 
        :headers => headers,
        :body => data.to_json)

      returnBody = { slots: @user.timeslots, name: @user.name, email: @user.email, redtailCal: clean_redtail_data(@calData) }
      render json: returnBody
    end
  end

  # POST /timeslots
  def update_timeslots
    # conditional to remove timeslot if ID is present
    if params[:id]
      remove_slot = Timeslot.find_by_id(params[:id])
      remove_slot.destroy
      render json: params[:id]
    else
      given_timeslot = {
        day: params[:day],
        show: params[:show],
        start: params[:start],
        end: params[:end],
        cutoff: params[:cutoff],
        meridiem: params[:meridiem],
        length: params[:length]
      }
      @user.timeslots.new(given_timeslot)
      @user.save!
      render json: @user.timeslots
    end
  end

  # POST /schedule
  def schedule_appointment
    @user = User.find_by_id(params[:timeslotObj]['user_id'])
    d = Date.parse(params[:dateObj])
    sHour = 0
    sMin = 0
    eHour = 0
    eMin = 0
    if params[:timeslotObj]['start'] >= 1000
      sHour = params[:timeslotObj]['start'].to_s[0..1].to_i
      sMin = params[:timeslotObj]['start'].to_s[2..3].to_i
    else
      sHour = params[:timeslotObj]['start'].to_s[0].to_i
      sMin = params[:timeslotObj]['start'].to_s[1..2].to_i
    end
    if params[:timeslotObj]['end'] >= 1000
      eHour = params[:timeslotObj]['end'].to_s[0..1].to_i
      eMin = params[:timeslotObj]['end'].to_s[2..3].to_i
    else
      eHour = params[:timeslotObj]['end'].to_s[0].to_i
      eMin = params[:timeslotObj]['end'].to_s[1..2].to_i
    end

    unixTime = (Time.new(d.year, d.month, d.day, sHour, sMin).to_f * 1000).to_i
    unixEndTime = (Time.new(d.year, d.month, d.day, eHour, eMin).to_f * 1000).to_i

    headers = {
      'Authorization' => 'Userkeyauth ' + Base64.strict_encode64(API_KEY + ':' + @user.userkey),
      'Content-Type' => 'application/json'
    }
    @client = HTTParty.post(
      'http://dev.api2.redtailtechnology.com/crm/v1/rest/contacts/search',
      headers: headers,
      body: [{ Field: 16, Operand: 0, Value: params[:clientInput]['email'] }].to_json
    )

    data = { ActivityOwnerID: @user.userid, StartDate: "\/Date(#{unixTime})\/", EndDate: "\/Date(#{unixEndTime})\/", TypeID: 2, AllDayEvent: false, Subject: params[:clientInput]['subject'], Note: params[:clientInput]['details'] }

    if @client['Contacts']
      data['ClientID'] = @client['Contacts'][0]['ClientID']
      @actData = HTTParty.put(
        'http://dev.api2.redtailtechnology.com/crm/v1/rest/calendar/activities/0',
        headers: headers,
        body: data.to_json
      )
    else
      @actData = HTTParty.put(
        'http://dev.api2.redtailtechnology.com/crm/v1/rest/calendar/activities/0',
        headers: headers,
        body: data.to_json
      )
    end
    if @actData['RecID'] > 0
      render json: 'Schedule Successful'
    else
      render json: 'Unable to Schedule'
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_user
    @user = User.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def user_params
    params.require(:user).permit(:name, :email, :link, :userkey)
  end
end
