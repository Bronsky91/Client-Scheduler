import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

let UserForm = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={handleSubmit} className='dash-user-form'>
      <p>
        <label htmlFor="name">Name:</label>
        <Field name="name" component="input" type="text" />
      </p>
      <p>
        <label htmlFor="email">Email:</label>
        <Field name="email" component="input" type="text" />
      </p>
      <p>
        <label htmlFor="link">Link: http://localhost:3001/schedulewith/</label>
        <Field name="link" component="input" type="text" />
      </p>
      <button type="submit">Update</button>
    </form>
  )
}

UserForm = reduxForm({
  form: 'user'
})(UserForm)


UserForm.propTypes = {
  userData: PropTypes.object,
}

export default UserForm;