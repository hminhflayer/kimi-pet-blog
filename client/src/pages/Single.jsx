import React, { useContext } from 'react';
import Menu from '../components/Menu';
import Edit from '../img/edit.png';
import Delete from '../img/delete.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useEffect } from 'react';
import { AuthContext } from '../context/authContext';

const Single = () => {
  const [post, setPost] = useState({});
  const [err, setError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
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

  const getHTML = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  }

  return (
    <div className='single'>
      <div className='content'>
        <img src={`../upload/${post?.img}`} alt={post.title} />
        <div className='user'>
          <img src={`..upload/${post?.avt}`} alt="" />
          <div className='info'>
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          { currentUser?.username === post?.username && <div className='edit'>
              <Link to={`/write?edit=${postId}`} state={post}>
                <img src={Edit} alt="Edit" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="Delete" />
            </div>}
        </div>
        <h2>{post.title}</h2>
        <span>{getHTML(post.desc)}</span>
      </div>
      <Menu cat={post.cat}/>
    </div>
  )
}

export default Single