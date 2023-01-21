import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import "./Post.css"

export default function Post() {

  const [posts, setPost] = useState([])
  const navigate = useNavigate();


  useEffect(()=>{
    getPosts();
  },[])

  const getPosts = () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch("http://localhost:3001/get-posts", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setPost(data)
      });
  }

  const goToPost = (id) => {
    navigate(`/post/${id}`)
  }

  return (
    <div className="post">
        {
          posts.map((post)=>{
            return (
              <div onClick={()=>goToPost(post._id)} className="post_main">
                <div className="post_body">
                  <span class="material-symbols-outlined">image</span>
                  <div>
                    <div className="post_title">
                      {post?.title}
                    </div>
                    <div className="post_content">{post?.body}</div>
                  </div>
                </div>
                <div className="post_foot">
                  <div className="foot_name">{post?.username}</div>
                  <div className="foot_time">Posted 1hr ago</div>
                </div>
              </div>
            );
          })
        }
    </div>
  );
}
