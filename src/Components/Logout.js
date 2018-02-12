import React from 'react';
import { Link } from 'react-router-dom';

const Logout = () => 
  <div className='logout-page'>
   <p>You've been Logged out!</p>
   <br/>
   <Link to='/'>Return to Login Page</Link>
  </div>

export default Logout;