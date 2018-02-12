import React from 'react';
import { Field, reduxForm } from 'redux-form';

let AuthForm = props => {
  const { handleSubmit } = props
  return (
    <div className='auth'>
    <form onSubmit={handleSubmit} className='authform'>
    <h3 className='authheader' >Client Scheduler</h3>
      <p>
        <label htmlFor="username">Username:</label>
        <Field name="username" component="input" type="text" />
      </p>
      <p>
        <label htmlFor="password">Password:</label>
        <Field name="password" component="input" type="password" />
      </p>
      <button type="submit" className='authsubmit'>Sign-In</button>
    </form>
    {props.authStatus}
    </div>
  )
}

AuthForm = reduxForm({
  form: 'auth'
})(AuthForm)

export default AuthForm;