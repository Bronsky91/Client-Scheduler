import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTimeslots, getSelectedDays, getStatus } from '../Reducers/advisorDashboard';
import { removeTimeslotData, toggleDay } from '../Actions/dashboardActions';
import SlotTime from '../Components/SlotTime'
import '../App.css';

const TimeslotDay = ({ day, slotsValue, removeTimeslotData, toggleDay, selectedDay, authStatus }) =>
  <div className={`slotdays ${selectedDay.includes(day) ? 'selected' : 'week'} `}>
    <button onClick={() => toggleDay(day)} className='day'>{day}</button>
      {
        slotsValue
          .filter(slot => slot.day.includes(day))
          .sort((a, b) => {
            return a.start - b.start
          })
          .map((slot, index) =>
            <div key={index} className='slotbox'>
              <SlotTime timeslot={slot} />
              <button className='remove' onClick={() => { removeTimeslotData(authStatus.token, slot.id) }}>x</button>
            </div>
          )
      }
  </div>

TimeslotDay.propTypes = {
  day: PropTypes.string.isRequired,
  slotsValue: PropTypes.array,
  removeTimeslotData: PropTypes.func,
  authStatus: PropTypes.string
}

const mapStateToProps = state => ({
  slotsValue: getTimeslots(state),
  selectedDay: getSelectedDays(state),
  authStatus: getStatus(state)
});

const mapDispatchToProps = {
  removeTimeslotData,
  toggleDay
};

export default connect(mapStateToProps, mapDispatchToProps)(TimeslotDay);
