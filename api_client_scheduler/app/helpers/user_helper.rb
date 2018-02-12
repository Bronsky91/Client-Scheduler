module UserHelper
  def clean_redtail_data(calData)
    redtail_data = []
    calData['Activities'].each { |activties_array|
      end_time = activties_array['EndDate'].gsub(/[^0-9]/, '')
      start_time = activties_array['StartDate'].gsub(/[^0-9]/, '')
      start_time = (start_time.to_f / 1000)
      end_time = (end_time.to_f / 1000)
      end_time_int = Time.at(end_time).strftime('%k%M').to_i
      start_time_int = Time.at(start_time).strftime('%k%M').to_i
      start_date = Time.at(start_time).strftime('%Y-%-m-%-d')
      redtail_data << {start: start_time_int, end: end_time_int, date: start_date}
    }
    return redtail_data
  end
end