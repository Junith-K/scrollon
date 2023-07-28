import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import "./Post.css"
import getTime from '../../../Time/Time';
import moment from 'moment/moment';
import { useCookies } from "react-cookie";
import getToastError from '../../Toast/Toast';

export default function Post() {

  const [posts, setPost] = useState([])
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["ghost"]);


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
        console.log(data);
        setPost(data)
      });

  }

  const goToPost = (id) => {
    if(cookies.ghost){
      getToastError("You have to login to view the entire post!")
    }else{
      navigate(`/post/${id}`)
    }
  }

  return (
    <div className="post">
        {
          posts.map((post)=>{
            return (
              <div onClick={()=>goToPost(post._id)} className="post_main">
                <div className="post_body">
                  <span class="material-symbols-outlined">image</span>
                  <div style={{width: "95%"}}>
                    <div className="post_title">
                      {post?.title}
                    </div>
                    <div className="post_content">{`Posted by ${post?.username} ${getTime(moment(),moment(post?.posted_time))} ago`}</div>
                  </div>
                </div>
                <div className="post_foot">
                  <span class="material-symbols-outlined">comment</span>
                  <div className="foot_body">{post?.comment?post?.comment.length:0}</div>
                </div>
              </div>
            );
          })
        }
    </div>
  );
}
