Rails.application.routes.draw do
  get 'user', to: 'users#current'
  get 'timeslots', to: 'users#get_timeslots'
  post 'user', to: 'users#update_user'
  post 'timeslots', to: 'users#update_timeslots'
  post 'auth', to: 'sessions#create'
  post 'logout', to: 'sessions#destroy'
  post 'schedule', to: 'users#schedule_appointment'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
