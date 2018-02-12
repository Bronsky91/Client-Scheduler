import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStatus, getUserData, getSelectedDays } from '../Reducers/advisorDashboard';
import { fetchUpdateUser } from '../Actions/dashboardActions';
import TimeslotSelector from '../Components/TimeslotSelector';
import TimeslotForm from '../Components/TimeslotForm';
import { Link } from 'react-router-dom';
import UserForm from '../Components/UserForm';

class Dashboard extends Component {

  submit = values => {
    this.props.fetchUpdateUser(this.props.authStatus.token, values);
  }

  render = () => {

    return (
      <div>
        <h1 className='dashheader'>Advisor's Dashboard</h1>
        <div className='dash'>
          <div className='dash-user'>
            <h2 className='dash-title'>
              Advisor Information:
          </h2>
            <UserForm initialValues={this.props.userData} onSubmit={this.submit} />
          </div>
          <div className='dash-timeslots'>
            <h2 className='dash-slot-title'>Timeslot Selection:</h2>
            <div className='dash-slot-selector'>
              <TimeslotSelector />
              <TimeslotForm
                updateTimeslotData={this.props.updateTimeslotData}
                authStatus={this.props.authStatus}
                selectedDays={this.props.selectedDays}
              />
            </div>
          </div>
          <div className='logout'>
            <Link to='/logout' onClick={() => this.props.fetchLogout(this.props.authStatus.token)} >Log Out </Link>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  userData: PropTypes.object,
  authStatus: PropTypes.string,
  updateTimeslotData: PropTypes.func,
  fetchLogout: PropTypes.func,
  fetchUpdateUser: PropTypes.func,
  selectedDays: PropTypes.array
}

const mapStateToProps = state => ({
  authStatus: getStatus(state),
  userData: getUserData(state),
  selectedDays: getSelectedDays(state)
});

const mapDispatchToProps = {
  fetchUpdateUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);