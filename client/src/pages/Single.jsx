import React, { useContext } from 'react';
import Menu from '../components/Menu';
import Edit from '../img/edit.png';
import Delete from '../img/delete.png';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useEffect } from 'react';
import { AuthContext } from '../context/authContext';

const Single = () => {
  const [post, setPost] = useState({});

  const location = useLocation();
  const postId = location.pathname.split('/')[2];
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`/post/${postId}`)
      .then((res) => {
        setPost(res.data.results);
      })
      .catch((err)=>{
        console.log(err);
      })
  }, [postId]);

  const handleDelete = e => {
    e.preventDefault();
    axios.delete(`/post/${postId}`)
      .then((res) => {
        navigate('/');
      })
      .catch((error) => {
        setError(error.response.data);
      });; 
  }

  return (
    <div className='single'>
      <div className='content'>
        <img src={post?.img} alt={post.title} />
        <div className='user'>
          <img src={post?.avt} alt="" />
          <div className='info'>
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          { currentUser?.username === post?.username && <div className='edit'>
              <Link to={`/write?edit=123`}>
                <img src={Edit} alt="Edit" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="Delete" />
            </div>}
        </div>
        <h2>{post.title}</h2>
        <span>{post.desc}</span>
      </div>
      <Menu />
    </div>
  )
}

export default Single