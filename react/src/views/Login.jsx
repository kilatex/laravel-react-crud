import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { setUser, setToken } = useStateContext();
  const [errors, setErrors] = useState(null);
  const showErrors = () => {
    if(!errors) return null;
    if (errors.length > 1) {
      return (
        <div className='alert'>
            {errors}
        </div>
      )
    } else {
      return ( <div className='alert'> 
        {Object.keys(errors).map(key => (
          <p key={key}>{errors[key]}</p>
        ))}  
       </div>)
    }
  }
  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }

    axiosClient.post('/login', payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
        if (data.message) {
          setErrors(data.message);
        }
      })
      .catch(err => {
        console.log(err);
        const response = err.response;
        if (response && response.status == 422) {
          setErrors(response.data.errors);
          console.log(errors);
        }
      })
  }
  return (
    <>
      <form onSubmit={onSubmit}>
        <h1 className='title'>Login</h1>
        {showErrors()}
        <input ref={emailRef} type="email" placeholder='Email Address' />
        <input ref={passwordRef} type="password" placeholder='Password' />
        <button className="btn btn-block">Login</button>
        <p className='message'>Not Registered?  <Link to="/signup">Create an account</Link> </p>
      </form>
    </>

  )
}
