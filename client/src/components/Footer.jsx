import React from 'react';
import Logo from '../img/logo.png';

const Footer = () => {
  return (
    <footer>
      <img src={Logo} alt="Kimi blog" />
      <span>Made with Nodejs and <b>React.js</b></span>
    </footer>
  )
}

export default Footer