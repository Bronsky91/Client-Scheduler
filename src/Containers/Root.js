import React from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import advisorDashboard from '../Reducers/advisorDashboard';
import clientDatepicker from '../Reducers/clientDatepicker';
import App from './App';
import thunk from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  form: formReducer,
  advisorDashboard,
  clientDatepicker
})

let store = createStore(
  rootReducer, /* preloadedState, */
  composeWithDevTools(applyMiddleware(thunk))
);

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
)
