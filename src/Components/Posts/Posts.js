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
        console.log(data);
      });
  }, []);

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

  return (
    <div className="posts">
      <div className="posts_content">
        <div className="posts_title">
          <div className="posts_tit">
            <div className="tit_main">{postData?.title}</div>
            <div className="tit_name">Posted By {postData?.username}</div>
          </div>
          <div className="posts_posted">
            <div className="posted_tag">
              <span>Tag : </span>
              {postData?.tag}
            </div>
            <div className="posted_time">{`${getTime(moment(),moment(postData?.posted_time))}`+` ago`}</div>
          </div>
        </div>
        <div className="posts_body">{postData?.body}</div>
        <div className="comment_p">
          <textarea className='body_input' name="Text1" cols="40" rows="4" value={body} placeholder='Comment' onChange={(e)=>setBody(e.target.value)}></textarea>
        </div>
        <div className="com_but" onClick={postComment}>Comment</div>
      </div>
      <div className="posts_comments">
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
                      <div className="top_time">{`${getTime(moment(),moment(comment?.commented_time))}`+` ago`}</div>
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
