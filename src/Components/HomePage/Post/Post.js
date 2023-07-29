import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import "./Post.css"
import getTime from '../../../Time/Time';
import moment from 'moment/moment';
import { useCookies } from "react-cookie";
import getToastError from '../../Toast/Toast';

export default function Post(props) {

  const {sort} = props;
  const [posts, setPost] = useState([])
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["ghost", "uid", "sortBy"]);


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
        console.log(sort)
        let temp = [...data]
        if(sort=="latest"){
          temp.sort((a, b) => new Date(b.posted_time) - new Date(a.posted_time));
        }else if(sort=="liked"){
          temp.sort((a, b) => b.likes - a.likes);
          console.log(temp)
        }else if(sort=="disliked"){
          temp.sort((a, b) => a.likes - b.likes);
        }
        
        setPost(temp);
      });

  }

  const goToPost = (id) => {
    if(cookies.ghost){
      getToastError("You have to login to view the entire post!")
    }else{
      navigate(`/post/${id}`)
    }
  }


  const sortBy = () => {
    let temp = [...posts]
    if(sort=="latest"){
      console.log("latest")
      temp.sort((a, b) => new Date(b.posted_time) - new Date(a.posted_time));
    }else if(sort=="liked"){
      temp.sort((a, b) => b.likes - a.likes);
      console.log("liked")
    }else if(sort=="disliked"){
      temp.sort((a, b) => a.likes - b.likes);
      console.log("disliked")
    }
    console.log(temp)
    setPost(temp);
  }

  useEffect(()=>{
    console.log("sorting")
    sortBy()
  },[sort])

  return (
    <div className="post">
        {
          posts.map((post)=>{
            let viewed = post.viewedBy?.some((view) => view === cookies.uid)
            return (
              <div onClick={()=>goToPost(post._id)} className="post_main">
                <div className="post_body">
                  <span class="material-symbols-outlined">image</span>
                  <div style={{width: "95%"}}>
                    <div style={viewed?{color: "#9a9a9a"}:{}} className="post_title">
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
