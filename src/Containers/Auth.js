import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStatus } from '../Reducers/advisorDashboard';
import { fetchUser, fetchTimeslotData } from '../Actions/dashboardActions';
import { Redirect } from 'react-router-dom';
import AuthForm from '../Components/AuthForm';

class Auth extends Component {

  submit = values => {
    this.props.fetchAuth(values.username, values.password);
  }
  render = () => {
    if (this.props.authStatus.token) {
      return (
        <Redirect to='/dashboard' />
      )
    }
    return (
      <AuthForm onSubmit={this.submit} authStatus={this.props.authStatus} />
    );
  }
}

Auth.propTypes = {
  fetchAuth: PropTypes.func,
  fetchUser: PropTypes.func,
  fetchTimeslotData: PropTypes.func
}

const mapStateToProps = state => ({
  authStatus: getStatus(state)
});

const mapDispatchToProps = {
  fetchUser,
  fetchTimeslotData
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);