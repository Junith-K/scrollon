import { useCookies } from "react-cookie";
import React, { useState, useEffect } from "react";
import "./Profile.css"
import Post from "../HomePage/Post/Post";
import link from "../../constants";
import Viewed from "../HomePage/Viewed/Viewed";
import Loader from "../Loader/Loader";
import getToastError from "../Toast/Toast";

function Profile(){
    const [cookies, setCookie] = useCookies(["uid", "uname", "ghost", "sortBy", "recent_posts"]);
    const [sort, setSort] = useState("myposts");
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true);
    const [rev, setRev] = useState(false)
    useEffect(()=>{
        setLoading(true)
        getPosts()
        if(rev){
            setPosts([...posts].reverse())
        }
    },[sort])

    const getPosts = () => {
        setRev(false)
        const requestOptions = {
            method: "get",
            headers: { "Content-Type": "application/json" },
        };
        fetch(`${link}/profile/${sort}/${cookies.uid}`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
            getToastError(data.error);
            } else {
                let temp = data
                let targetKey;
                if(sort=="lastviewed"){
                    targetKey = "viewedBy"
                }else if(sort=="liked"){
                    targetKey = "likedBy"
                }else if(sort=="disliked"){
                    targetKey = "dislikedBy"
                }else if(sort=="saved"){
                    targetKey = "saved_by"
                }
                temp.sort((a, b) => sortBy(a, b, targetKey))
                console.log(temp)
                setPosts(temp)
                setLoading(false)
            }
        })
        .catch((error) => {
            getToastError("An error occurred while fetching data");
        });
    }

    const sortBy = (a,b,key) => {
        const aViewedTime = a[key].find(item => item.userid === cookies.uid)?.viewed_time || "";
        const bViewedTime = b[key].find(item => item.userid === cookies.uid)?.viewed_time || "";

        return new Date(bViewedTime).getTime() - new Date(aViewedTime).getTime();
    }

    const swapVert = () => {
        setPosts([...posts].reverse())
        setRev(!rev)
    }

    if(!loading){
        return (
            <div className="profiles">
                <div className="sort">
                    <div className="sort_title">
                        <div style={sort=="myposts"?{backgroundColor: "white", color: "black"}:{}} onClick={()=>{setSort("myposts")}} className="sort_name">My Posts</div>
                        <div style={sort=="lastviewed"?{backgroundColor: "white", color: "black"}:{}} onClick={()=>{setSort("lastviewed")}} className="sort_name">Last Viewed</div>
                        <div style={sort=="liked"?{backgroundColor: "white", color: "black"}:{}} onClick={()=>{setSort("liked")}} className="sort_name">Liked</div>
                        <div style={sort=="disliked"?{backgroundColor: "white", color: "black"}:{}} onClick={()=>{setSort("disliked")}} className="sort_name">Disliked</div>
                        <div style={sort=="saved"?{backgroundColor: "white", color: "black"}:{}} onClick={()=>{setSort("saved")}} className="sort_name">Saved</div>
                    </div>
                    <span onClick={swapVert} style={rev?{backgroundColor: "white", color: "black"}:{}} class="material-symbols-outlined swap_ver">swap_vert</span>
                </div>
                <div className="app_main">
                    <Post posts={posts} search={sort}/>
                    <Viewed />
                </div>
            </div>
        );
    }
    return <Loader height={600}/>

    
}

export default Profile;
