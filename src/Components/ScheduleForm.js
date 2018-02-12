import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

let ScheduleForm = props => {
  const { handleSubmit } = props
  return (
    <div className='pickerForm'>
    <p className='slotsTitle'>Schedule an appointment with {props.advisorName}:</p>
    <form onSubmit={handleSubmit}>
    <p>
        <label htmlFor="subject">Subject:</label>
        <Field name="subject" component="input" type="text" />
      </p>
      <p>
        <label htmlFor="email">Email:</label>
        <Field name="email" component="input" type="text" />
      </p>
      <p>
        <label htmlFor="details">Additional Details:</label>
        <Field name="details" component="textarea" type="text" />
      </p>
      <button type="submit">Schedule</button>
    </form>
    </div>
  )
}

ScheduleForm.propTypes = {
advisorName: PropTypes.string,
}

ScheduleForm = reduxForm({
  form: 'schedule'
})(ScheduleForm)

export default ScheduleForm;