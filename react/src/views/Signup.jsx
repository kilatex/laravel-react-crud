import React, { useRef } from 'react'
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';

export default function Signup() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfRef = useRef();

  const {setUser, setToken} = useStateContext()
  
  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name : nameRef.current.value,
      email : emailRef.current.value,
      password : passwordRef.current.value,
      password_confirmation : passwordConfRef.current.value
    }

    axiosClient.post('/signup',payload)
      .then(({data}) => {
          setToken(data.token);
          setUser(data.user);
      })
      .catch(err => {
        console.log(err);
        const response = err.response;
        if(response && response.status == 422){
          console.log(response.data.errors);
        }
      })
  }
  return (
    <>
      <form onSubmit={onSubmit}>
        <h1 className='title'>Signup for free</h1>
        <input ref={nameRef} type="text" placeholder='Full Name' />
        <input ref={emailRef} type="email" placeholder='Email Address' />
        <input ref={passwordRef} type="password" placeholder='Password' />
        <input ref={passwordConfRef} type="password" placeholder='Password Confirmation' />
        <button className="btn btn-block">Signup</button>
        <p className='message'>Already Registered?  <Link to="/login">Login</Link> </p>
      </form>
    </>
  )
}
