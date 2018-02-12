import fetch from 'cross-fetch';

const headers = {
  'Content-Type': 'application/json',
}

export const addSlot = (data) => ({
  type: 'ADD_SLOT',
  data
})

export const updateTimeslotData = (token, day, show, start, end, cutoff, meridiem, length) => {
  let body = {
    day,
    show,
    start,
    end,
    cutoff,
    meridiem,
    length,
  }
  body = JSON.stringify(body);
  let init = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token
    },
    body
  };
  return function (dispatch) {
    fetch('http://localhost:3000/timeslots', init)
      .then(response => {
        response.json().then(json => dispatch(addSlot(json)));
      })
  }
}

const removeSlot = (id) => ({
  type: 'REMOVE_SLOT',
  id
})

export const removeTimeslotData = (token, id) => {
  let body = {
    id
  }
  body = JSON.stringify(body);
  let init = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token
    },
    body
  };
  return function (dispatch) {
    fetch('http://localhost:3000/timeslots', init)
      .then(response => {
        response.json().then(json => dispatch(removeSlot(json)));
      })
  }
}

export const toggleDay = (day) => ({
  type: 'TOGGLE_DAY',
  day
})

export const fetchAuth = (username, password) => {
  let init = {
    method: 'POST',
    body: JSON.stringify({
      username,
      password
    }),
    headers
  };
  return function (dispatch) {
    fetch('http://localhost:3000/auth', init)
      .then(response => {
        if (response.ok) {
          response.json().then(json => {
            // On Success will also gather User and Timeslot Data
            dispatch(fetchUser(json.token));
            dispatch(fetchTimeslotData(json.token));
          })
        } else {
          dispatch(fetchAuthFailure(response.status));
        }
      })
  }
}

export const fetchUser = (token) => {
  let init = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token
    }
  };
  let tokenObj = {
    token
  }
  return function (dispatch) {
    fetch('http://localhost:3000/user', init)
      .then(response => {
        response.json().then(json =>
          dispatch(fetchAuthSuccess(tokenObj, json)));
      })
  }
}

export const fetchTimeslotData = (token) => {
  let init = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token
    }
  };
  return function (dispatch) {
    fetch('http://localhost:3000/timeslots', init)
      .then(response => {
        response.json().then(json => dispatch(apiTimeslotData(json)));
      })
  }
}

export const fetchUpdateUser = (token, userData) => {
  let init = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token
    },
    body: JSON.stringify(userData)
  };
  return function (dispatch) {
    fetch('http://localhost:3000/user', init)
      .then(response => {
        response.json().then(json => dispatch(apiUpdateUser(json)));
      })
  }
}

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

const userByLink = data => ({
  type: 'USER_BY_LINK',
  data
})

export const apiUpdateUser = (userData) => ({
  type: 'API_UPDATE_USER',
  userData
})

const fetchAuthSuccess = (token, userData) => ({
  type: 'AUTH_FETCH_SUCCESS',
  token,
  userData
})

export const apiTimeslotData = (data) => ({
  type: 'API_TIMESLOT_DATA',
  data
})

export const fetchLogout = token => {
  headers['token'] = token
  let init = {
    method: 'POST',
    headers
  };
  return function (dispatch) {
    fetch('http://localhost:3000/logout', init)
      .then(response => {
        response.json().then(json => dispatch(logout(json)));
      })
  }
}

const logout = data => ({
  type: 'LOGOUT',
  data
})

const fetchAuthFailure = status => ({
  type: 'AUTH_FETCH_FAILURE',
  status
})





