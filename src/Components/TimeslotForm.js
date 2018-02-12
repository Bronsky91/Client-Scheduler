import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TimeslotForm extends Component {
  convertStringToTime = (timeString, length) => {
    let timeArray = timeString.split(/[:\s]/g);
    for (let i = 0; i < 2; i++) {
      timeArray[i] = parseInt(timeArray[i], 10);
    }
    if (timeArray[2] === 'pm' && timeArray[0] !== 12) {
      timeArray[0] = timeArray[0] + 12
    }
    if (timeArray[2] === 'am' && timeArray[0] === 12) {
      timeArray[0] = timeArray[0] - 12
    }
    let hCutOff = timeArray[0];
    let mCutOff = timeArray[1] - 30;
    if (mCutOff < 0) {
      if (timeArray[0] === 0) {
        mCutOff += 30
      } else {
        mCutOff = 60 + mCutOff
        hCutOff -= 1
      }
    }
    let cutoff = hCutOff * 100;
    cutoff = cutoff + mCutOff;
    let timeObj = {};
    timeObj.start = (timeArray[0] * 100) + timeArray[1];
    if (length === 60) {
      timeObj.end = timeObj.start + 100;
    } else {
      timeObj.end = timeObj.start + length
    }
    timeObj.meridiem = timeArray[2];
    timeObj.cutoff = cutoff;

    let msum = parseInt(timeArray[1], 10) + length;
    let mmod = msum % 60;
    let mShow = mmod;
    let hour = parseInt(timeArray[0], 10);
    let hourShow = hour;
    if (msum >= 60) {
      hour += 1;
      hourShow = hour;
    }
    if (mmod === 0) {
      mShow = '00';
    }
    if (hour > 12) {
      hourShow = hour - 12;
    }
    let meridiem = timeObj.meridiem;
    meridiem = ' am';
    if (hour >= 12) {
      meridiem = ' pm';
    }

    timeObj.show = timeString + ' - ' + hourShow + ':' + mShow + meridiem;

    return timeObj
  }


  onSubmit = e => {
    e.preventDefault();
    if (this.props.selectedDays.length === 0) {
      alert('Please select day(s) using buttons')
    }
    let time = this.convertStringToTime(this.time.value, parseInt(this.tLength.value, 10));
    this.props.selectedDays
      .map(selectedDay =>
        this.props.updateTimeslotData(this.props.authStatus.token, selectedDay, time.show, time.start, time.end, time.cutoff, time.meridiem, parseInt(this.tLength.value, 10)))
  }

  render = () => {
    return (
      <form onSubmit={this.onSubmit}>
        <p>
          Time:
            <input ref={el => this.time = el} type="text" />
        </p>
        <p>
          Length:
            <select ref={el => this.tLength = el}>
            <option value='15'> 15 min </option>
            <option value='30'> 30 min </option>
            <option value='45'> 45 min </option>
            <option value='60'> 1 Hr </option>
          </select>
        </p>
        <button className='slotsubmit'type="submit">Add Timeslot</button>
      </form>
    );
  }
}

TimeslotForm.propTypes = {
  updateTimeslotData: PropTypes.func,
  authStatus: PropTypes.string.isRequired,
  selectedDays: PropTypes.array,
}

export default TimeslotForm;