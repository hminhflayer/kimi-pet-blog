import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Menu = () => {
  const [posts, setPosts] = useState([]);

  const idPage = useLocation().search;
  useEffect(() => {
    axios.get(`/post`)
      .then((res) => {
        setPosts(res.data.results);
      })
      .catch((err)=>{
        console.log(err);
      })
  }, [idPage]);

    return (
        <div className='menu'>
            <h1>Pther posts you may like</h1>
            {posts.map((post) => (
                <div className='post' key={post.id}>
                  <Link className='link' to={`/post/${post.id}`}>
                    <img src={post.img} alt={post.des} />
                    <h2>{post.title}</h2>
                    <button>Read more</button>
                  </Link>
                </div>
            ))}
        </div>
    );
}

export default Menu
