const initialState = {
  userData: {},
  timeslotData: [],
  authStatus: '',
  selectedDays: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_SLOT':
      return {
        ...state,
        timeslotData: action.data
      }
    case 'REMOVE_SLOT':
      return {
        ...state,
        timeslotData: state.timeslotData.filter(timeslot => timeslot.id !== action.id)
      }
    case 'API_TIMESLOT_DATA':
      return {
        ...state,
        timeslotData: action.data
      }
    case 'API_UPDATE_USER':
      return {
        ...state,
        userData: {
          ...action.userData
        }
      }
    case 'AUTH_FETCH_SUCCESS':
      return {
        ...state,
        authStatus: action.token,
        userData: action.userData
      }
    case 'AUTH_FETCH_FAILURE':
      return {
        ...state,
        authStatus: 'Sign-in failed retry login, Status: ' + action.status
      }
    case 'LOGOUT':
      return {
        ...initialState,
        authStatus: ''
      }
    case 'TOGGLE_DAY':
      if (state.selectedDays.includes(action.day)) {
        return {
          ...state,
          selectedDays: state.selectedDays.filter(day => day !== action.day)
        }
      }
      return {
        ...state,
        selectedDays: [...state.selectedDays,
        action.day
        ]
      }
    default:
      return state;
  }
}

// Selectors
export const getTimeslots = state => state.advisorDashboard.timeslotData;
export const getStatus = state => state.advisorDashboard.authStatus;
export const getSelectedDays = state => state.advisorDashboard.selectedDays;
export const getUserData = state => state.advisorDashboard.userData;