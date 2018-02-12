import React from 'react';
import { connect } from 'react-redux';
import { updateTimeslotData, fetchAuth, fetchLogout } from '../Actions/dashboardActions';
import Auth from './Auth'
import Dashboard from './Dashboard';
import Logout from '../Components/Logout';
import Datepicker from './Datepicker'
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route} from 'react-router-dom';

const App = props => (
  <Router>
    <div>
      <Route
        exact path='/'
        render={(routeProps) => (
          <Auth
            {...routeProps}
            fetchAuth={props.fetchAuth}
          />
        )}
      />
      <Route
        path='/dashboard'
        render={(routeProps) => (
          <Dashboard
            {...routeProps}
            updateTimeslotData={props.updateTimeslotData}
            fetchLogout={props.fetchLogout}
          />
        )}
      />
      <Route
        path='/logout'
        component={Logout}
        />
      <Route
        path='/schedulewith/:link'
        component={Datepicker}
        />
    </div>
  </Router>
)

App.propTypes = {
  updateTimeslotData: PropTypes.func.isRequired,
  fetchAuth: PropTypes.func,
  fetchLogout: PropTypes.func,
}

const mapStateToProps = state => ({
  
});

const mapDispatchToProps = {
  updateTimeslotData,
  fetchAuth,
  fetchLogout
};

export default connect(mapStateToProps, mapDispatchToProps)(App);