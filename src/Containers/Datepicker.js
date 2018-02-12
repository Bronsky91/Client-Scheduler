import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../App.css';
import { fetchUserByLink, currentDay, selectionFromDatepicker, scheduleAppointment } from '../Actions/datepickerActions';
import { getTimeslots, getCurrentDay, getDatepickerSelection, getScheduledAppointment } from '../Reducers/clientDatepicker';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import '../App.css';
import ScheduleForm from '../Components/ScheduleForm';

const today = new Date();

const weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

class Datepicker extends Component {

  selectedDay = (date, dashSlots, redtailSlots) =>
    dashSlots
      .filter(slot => {
        let noConflict = true;
        const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        if (slot.day === weekday[date.getDay()]) {
          redtailSlots.map(rtSlot => {
            if (dateString === rtSlot.date) {
              if (rtSlot.end <= slot.start || rtSlot.start >= slot.end) {
                noConflict = true
              } else {
                noConflict = false
              }
            }
            return noConflict
          })
          if (noConflict === true) {
            return true
          } else {
            return false
          }
        }
        return false
      })
      .sort((a, b) =>
        a.start - b.start)
      .map((slot, index) =>
        <div key={index}
          className={this.props.timeSelected.id === slot.id ?
            'selectedTime picker-timeSlot' :
            'picker-timeSlot'}
          onClick={() => this.props.selectionFromDatepicker(slot)}>
          {slot.show}
        </div>
      )

  submit = (values) => {
    if (this.props.timeSelected.length > 0) {
      this.props.scheduleAppointment(values, this.props.currentDateObj, this.props.timeSelected)
    }
    else {
      alert('Please select a timeslot to schedule');
    }
  }

  render = () => {
    const { match: { params } } = this.props
    if (this.props.timeslots.slots === undefined) {
      this.props.fetchUserByLink(params.link)
      return (
        <div className='noAdvisor'>
          We're sorry, we can't find the Advisor you're looking for!
          </div>
      )
    } else {
      return (
        <div className='pickerTable'>
          {this.props.scheduledConfirmation['RecID'] ?
            alert('Appointment Scheduled!') :
            null
          }
          <div className='calWindow'>
            <InfiniteCalendar
              width={400}
              height={300}
              selected={today}
              minDate={today}
              disabledDays={[0, 6]}
              onSelect={(date) =>
                this.props.currentDay(date)
              }
            />
            <p>{this.props.scheduledConfirmation}</p>
          </div>
          <div className='dayWindow'>
            <p className='slotsTitle'> Preferred TimeSlots for Date Selected:</p>
            <div>
              {this.selectedDay(this.props.currentDateObj, this.props.timeslots.slots, this.props.timeslots.redtailCal)}
            </div>
          </div>
          <ScheduleForm onSubmit={this.submit} advisorName={this.props.timeslots.name} />
        </div>
      )
    }
  }
}

Datepicker.propTypes = {
  currentDay: PropTypes.func,
  timeslots: PropTypes.object,
  fetchUserByLink: PropTypes.func,
  currentDateObj: PropTypes.instanceOf(Date),
  selectionFromDatepicker: PropTypes.func,
  timeSelected: PropTypes.object,
  scheduleAppointment: PropTypes.func,
  scheduledConfirmation: PropTypes.string
}

const mapStateToProps = state => ({
  timeslots: getTimeslots(state),
  currentDateObj: getCurrentDay(state),
  timeSelected: getDatepickerSelection(state),
  scheduledConfirmation: getScheduledAppointment(state),
});

const mapDispatchToProps = {
  fetchUserByLink,
  currentDay,
  selectionFromDatepicker,
  scheduleAppointment,
};

export default connect(mapStateToProps, mapDispatchToProps)(Datepicker);