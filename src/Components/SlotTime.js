import React from 'react';
import PropTypes from 'prop-types';

const SlotTime = props => (
  <span className='timesspanan'>
    {props.timeslot.show}
  </span>
)

SlotTime.propTypes = {
  timeslot: PropTypes.object.isRequired,
}

export default SlotTime;