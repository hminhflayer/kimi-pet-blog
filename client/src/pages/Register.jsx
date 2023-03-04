import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [err, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = e => {
    setInputs(pre => ({...pre, [e.target.name]: e.target.value }));
  }

  const handleSubmit = e => {
    e.preventDefault();
    axios.post("/auth/register", inputs)
      .then((res) => {
        navigate('/login');
      })
      .catch((error) => {
        setError(error.response.data);
      });; 
  }

  return (
    <div className='auth'>
      <h1>Login</h1>
      <form>
        <input type="text" name='username' placeholder='username' onChange={handleChange} required/>
        <input type="email" name='email' placeholder='email' onChange={handleChange} required/>
        <input type="password" name='password' placeholder='password' onChange={handleChange} required/>
        <button onClick={handleSubmit}>Register</button>
        {err && <p>{err}</p>}
        <span>Do you have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  )
}

export default Register