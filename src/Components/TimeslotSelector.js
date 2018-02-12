import React from 'react';
import TimeslotDay from '../Containers/TimeslotDay'

const DAYS_OF_WEEK = {
  'Monday': 1,
  'Tuesday': 2,
  'Wednesday': 3,
  'Thursday': 4,
  'Friday': 5
};

const displayDaysOfWeek = () => (
  Object
    .keys(DAYS_OF_WEEK)
    .map((day, index) => <TimeslotDay day={day} key={index}  />)
);

const TimeslotSelector = props => (
  <div className='slottable'>
    {displayDaysOfWeek()}
  </div>
)

export default TimeslotSelector;
