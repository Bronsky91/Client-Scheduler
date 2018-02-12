import fetch from 'cross-fetch';

export const fetchUserByLink = link => {
  let init = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      link
    }
  };
  return function (dispatch) {
    fetch('http://localhost:3000/timeslots', init)
      .then(response => {
        response.json().then(json =>  
          dispatch(userByLink(json)));
      })
  }
}

export const scheduleAppointment = (clientInput, dateObj, timeslotObj) => {
  let init = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      clientInput,
      dateObj,
      timeslotObj
    })
  };
  return function (dispatch) {
    fetch('http://localhost:3000/schedule', init)
      .then(response => {
        response.text().then(text =>  
          dispatch(scheduled(text)));
      })
  }
}

const scheduled = (data) => ({
  type: 'SCHEDULED_APPOINTMENT',
  data
})

export const selectionFromDatepicker = (slot) => ({
  type: 'SELECTION_FROM_DATEPICKER',
  slot
})

const userByLink = data => ({
  type: 'USER_BY_LINK',
  data
})

export const currentDay = date => ({
  type: 'CURRENT_DAY',
  date
})