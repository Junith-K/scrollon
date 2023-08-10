import React from 'react'
import "./Viewed.css"
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function Viewed() {

  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["recent_posts"]);
  return (
    <div className="viewed">
      <div className="viewed_title">Last Viewed</div>
      <div className="viewed_body">
        {cookies?.recent_posts?.length!=0?cookies?.recent_posts?.map((recent)=>{
          return <div onClick={()=>{navigate(`/post/${recent.post_id}`)}} className="viewed_titles hover-underline-animation">{`• ${recent.post_title}`}</div>;
        }):<div style={{textAlign: "center"}}>No recent posts</div>}
      </div>
    </div>
  );
}
