import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [posts, setPosts] = useState([]);

  const cat = useLocation().search;
  useEffect(() => {
    axios.get(`/post${cat}`)
      .then((res) => {
        setPosts(res.data.results);
      })
      .catch((err)=>{
        console.log(err);
      })
  }, [cat]);

  return (
    <div className='home'>
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              <img src={post.img} alt={post.des} />
            </div>
            <div className="content">
              <Link className='link' to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
                <p>{post.desc}</p>
                <button>Read more</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home