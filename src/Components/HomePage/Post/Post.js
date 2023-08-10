import React from 'react'
import { useNavigate } from "react-router-dom";
import "./Post.css"
import getTime from '../../../Time/Time';
import moment from 'moment/moment';
import { useCookies } from "react-cookie";
import getToastError from '../../Toast/Toast';

export default function Post(props) {

  const { posts, search, profile } = props;
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["ghost", "uid", "sortBy"]);

  const goToPost = (id) => {
    if(cookies.ghost){
      getToastError("You have to login to view the entire post!")
    }else{
      navigate(`/post/${id}`)
    }
  }

  return (
    <div className="post">
        {posts.length!=0?
          posts?.map((post)=>{
            let viewed = post.viewedBy?.some((view) => view.userid === cookies.uid)
            return (
              <div onClick={()=>goToPost(post._id)} className="post_main">
                <div className="post_body">
                  <span class="material-symbols-outlined">image</span>
                  <div style={{width: "95%"}}>
                    <div style={viewed?{color: "#9a9a9a"}:{}} className="post_title">
                      {post?.title}
                    </div>
                    <span className="post_content">Posted By</span><span className="post_content" style={post?.uid==cookies.uid?{color: "#E6ABFF"}:{}}>{` ${post?.username} `}</span><span className="post_content">{getTime(moment(),moment(post?.posted_time))} ago</span>
                  </div>
                </div>
                <div className="post_foot">
                  <span class="material-symbols-outlined">comment</span>
                  <div className="foot_body">{post?.comment?post?.comment.length:0}</div>
                </div>
              </div>
            );
          }):<div style={{textAlign: "center"}}>No posts found - Searched "{search}"</div>
        }
    </div>
  );
}
