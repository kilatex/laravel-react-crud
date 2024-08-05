import React from 'react'
import { Link } from 'react-router-dom';

export default function Signup() {
  const onSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <>
      <form onSubmit={onSubmit}>
        <h1 className='title'>Signup for free</h1>
        <input type="name" placeholder='Full Name' />
        <input type="email" placeholder='Email Address' />
        <input type="password" placeholder='Password' />
        <input type="password" placeholder='Password Confirmation' />
        <button className="btn btn-block">Signup</button>
        <p className='message'>Already Registered?  <Link to="/login">Login</Link> </p>
      </form>
    </>
  )
}
