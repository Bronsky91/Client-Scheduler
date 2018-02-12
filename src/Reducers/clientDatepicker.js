const initialState = {
  timeslotData: {},
  currentDay: new Date(),
  datepickerSelection: {},
  scheduledAppointment: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'USER_BY_LINK':
      return {
        ...state,
        timeslotData: action.data
      }
    case 'CURRENT_DAY':
      return {
        ...state,
        currentDay: action.date
      }
    case 'SELECTION_FROM_DATEPICKER':
      return {
        ...state,
        datepickerSelection: action.slot
      }
    case 'SCHEDULED_APPOINTMENT':
      return {
        ...state,
        scheduledAppointment: action.data
      }
    default:
      return state;
  }
}

// Selectors
export const getTimeslots = state => state.clientDatepicker.timeslotData;
export const getCurrentDay = state => state.clientDatepicker.currentDay;
export const getDatepickerSelection = state => state.clientDatepicker.datepickerSelection;
export const getScheduledAppointment = state =>
state.clientDatepicker.scheduledAppointment;