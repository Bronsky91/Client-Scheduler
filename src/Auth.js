import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStatus } from './Reducers/advisorDashboard';
import { fetchUser, fetchTimeslotData } from '/Actions/dashboardActions';
import { Redirect } from 'react-router-dom';
import AuthForm from './AuthForm';

class Auth extends Component {

  submit = values => {
    this.props.fetchAuth(values.username, values.password);
  }
  render = () => {
    if (this.props.authStatus.token) {
      return (
        <Redirect to='/settings' />
      )
    }
    return (
      <AuthForm onSubmit={this.submit} />
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