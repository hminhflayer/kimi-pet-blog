import React, { useContext } from 'react';
import {Link} from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import Logo from '../img/logo.png';

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className='navbar'>
      <div className='container'>
        <div className='logo'>
          <Link to="/">
            <img src={Logo} alt="Kimi blog"/>
          </Link>
        </div>
        <div className='links'> 
          <Link className='link' to="/">
            <h6>HOME</h6>
          </Link>
          <Link className='link' to="/?cat=code">
            <h6>CODE</h6>
          </Link>
          <Link className='link' to="/?cat=share">
            <h6>SHARE</h6>
          </Link>
          <Link className='link' to="/?cat=technology">
            <h6>TECHNOLOGY</h6>
          </Link>
          <span>{currentUser?.username}</span>
          { currentUser ? <span onClick={logout}>Logout</span> : <Link to="/login">Login</Link>}
          { currentUser ? <span className='write'> <Link className='link' to="/write">Write</Link></span> :""}
        </div>
      </div>
    </div>
  );
}

export default Navbar