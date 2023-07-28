import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Posts.css";
import Icons from "../../Icons/Icons";
import { useCookies } from "react-cookie";
import getTime from "../../Time/Time";
import moment from "moment";


export default function Posts() {
  const params = useParams();
  const [postData, setPostData] = useState();
  const [body, setBody] = useState("")
  const [cookies, setCookie] = useCookies(["uid","uname","icon"]);
  const [comments, setComment] = useState([])
  const [like, setLike] = useState(0)
  const [isLiked,setIsLiked] = useState(false);
  const [isDisLiked,setIsDisLiked] = useState(false);


  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`http://localhost:3001/post/${params.id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setPostData(data);
        setComment(data.comment)
        setIsLiked(data.likedBy.some((liked) => liked === cookies.uid))
        setIsDisLiked(data.dislikedBy.some((disliked) => disliked === cookies.uid))
        setLike(data.likes)
        // console.log(data.likedBy.some((liked) => liked === cookies.uid));
      });
  }, []);

  useEffect(()=>{
    console.log("isLiked : "+isLiked)
  },[isLiked])

  useEffect(()=>{
    console.log("isDisLiked : "+isDisLiked)
  },[isDisLiked])

  const postComment = () => {
    var today = moment()
    const requestOptions = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({"comment": body, "uid": cookies.uid, "username": cookies.uname, "icon": cookies.icon, "commented_time": today})
    };
    fetch(`http://localhost:3001/comment/${postData._id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setBody("")
      });
  }

  const likePost = () => {
    if(isLiked){
      setLike(like-1);
    }else{
      if(isDisLiked){
        setLike(like+2);
      }else{
        setLike(like+1);
      }
    }

    const requestOptions = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({"uid": cookies.uid, "isLiked": isLiked, "isDisLiked": isDisLiked})
    };

    fetch(`http://localhost:3001/post/like/${params.id}`, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      if(isDisLiked){
        setIsDisLiked(false)
      }
      setIsLiked(!isLiked)
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });

  }

  const dislikePost = () => {
    if(isDisLiked){
      setLike(like+1);
    }else{
      console.log(isLiked)
      if(isLiked){
        setLike(like-2);
      }
      else{
        setLike(like-1);
      }
    }

    const requestOptions = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({"uid": cookies.uid, "isDisLiked": isDisLiked, "isLiked": isLiked})
    };

    fetch(`http://localhost:3001/post/dislike/${params.id}`, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      if(isLiked){
        setIsLiked(false)
      }
      setIsDisLiked(!isDisLiked)
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  }

  return (
    <div className="posts">
      <div className="posts_content">
        <div className="posts_title">
          <div className="likes">
            <span onClick={likePost} class={`${isLiked?"material-icons selected-like":"material-symbols-outlined"} like`}>arrow_circle_up</span>
            <div>{like}</div>
            <span onClick={dislikePost} class={`${isDisLiked?"material-icons selected-dislike":"material-symbols-outlined"} dislike`}>arrow_circle_down</span>
          </div>
          <div style={{width: "100%"}}>
            <div className="tit_bottom">
              <div className="tit_top">
                <img key={postData?.icon} src={Icons[postData?.icon?postData?.icon:"profile"]} alt="bloggy"></img>
                <div>
                <div className="tit_name">{`Posted by ${postData?.username}`}</div>
                <div className="tit_name">{`• ${getTime(moment(),moment(postData?.posted_time))} ago`}</div>
                </div>
              </div>
              <div className="posted_tag">
                {postData?.tag?<><span>Tag : </span>
                {postData?.tag}</>:<></>}
              </div>
            </div>
            <div className="tit_main">{postData?.title}</div>
          </div>
        </div>
        <div className="posts_body">{postData?.body}</div>
        <div className="comment_p">
          <textarea className='body_input' name="Text1" cols="40" rows="4" value={body} placeholder='Comment' onChange={(e)=>setBody(e.target.value)}></textarea>
        </div>
        <div className="com_but" onClick={postComment}>Comment</div>
      </div>
      <div className="posts_comments scroll-container">
        <div className="comment_title">Comments</div>
        <div>
          {
            comments?.map((comment)=>{
              return (
                <div className="com_body">
                  <img src={Icons[comment.icon]} alt="genshin" />
                  <div className="com_main">
                    <div className="com_top">
                      <div className="top_username">{comment.username}</div>
                      <div className="top_time">{`• ${getTime(moment(),moment(comment?.commented_time))}`+` ago`}</div>
                    </div>
                    <div className="com_comment">{comment.comment}</div>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
}
