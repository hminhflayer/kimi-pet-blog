import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const posts =[
    {
      id: 1,
      title: "Hello 1",
      des: "This is Hello 1sfgdhggfdsadfdghgjhgfgdgfdfsdsadsfdgfhgjhgfsdasfdgfhjkjlk;lkjhgfddafsgdhfjgkhl;jlk",
      img: "https://i.pinimg.com/564x/ba/ac/8e/baac8e90fcd499f6299aa8ffe7b32faf.jpg",
    },
    {
      id: 2,
      title: "Hello 2",
      des: "This is Hello 2 This is Hello 1sfgdhggfdsadfdghgjhgfgdgfdfsdsadsfdgfhgjhgfsdasfdgfhjkjlk;lkjhgfddafsgdhfjgkhl;jlk",
      img: "https://i.pinimg.com/564x/8d/2c/f3/8d2cf3e0ae10d89dc33bb75406b444b7.jpg",
    },
    {
      id: 3,
      title: "Hello 3",
      des: "This is Hello 3 This is Hello 1sfgdhggfdsadfdghgjhgfgdgfdfsdsadsfdgfhgjhgfsdasfdgfhjkjlk;lkjhgfddafsgdhfjgkhl;jlk",
      img: "https://i.pinimg.com/736x/4e/f4/ac/4ef4aceb1d06cdaab6f2d5c8d20d14a7.jpg",
    }
  ];
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
                <p>{post.des}</p>
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