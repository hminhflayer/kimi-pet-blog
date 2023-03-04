import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [err, setError] = useState(null);
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleChange = e => {
    setInputs(pre => ({...pre, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post("/auth/login", inputs)
      .then((res) => {
        login(inputs);
        navigate('/');
      })
      .catch((error) => {
        setError(error.response.data);
      });; 
  };

  return (
    <div className='auth'>
      <h1>Login</h1>
      <form>
        <input type="text" placeholder='username' name="username" onChange={handleChange} required/>
        <input type="password" placeholder='password' name="password" onChange={handleChange} required/>
        <button onClick={handleSubmit}>Login</button>
        { err && <p>{err}</p>}
        <span>Don't you have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  )
}

export default Login