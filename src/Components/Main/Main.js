import React from 'react'
import Sort from '../HomePage/Sort/Sort'
import Post from '../HomePage/Post/Post'
import Viewed from '../HomePage/Viewed/Viewed'
import add from "../../Icons/add.png"
import "./Main.css"
import { useState } from 'react'
import { useCookies } from "react-cookie";
import ReactModal from "react-modal";
import { useNavigate } from 'react-router-dom'
import moment from 'moment/moment'
import getToastError from '../Toast/Toast'
import link from '../../constants'
import Loader from '../Loader/Loader'
import { useEffect } from 'react'

export default function Main({search, setSearch, isTyping, setIsTyping}) {
  const [showModal, setShowModal] = useState(false);
  const [tag, setTag] = useState("")
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("");
  const [cookies, setCookie] = useCookies(["uid", "uname", "ghost", "sortBy", "recent_posts"]);
  const navigate = useNavigate()
  const [sort, setSort] = useState(cookies.sortBy)
  const [posts, setPost] = useState([])
  const [tempposts, setTempPost] = useState([])
  const [isLoadingPosts, setLoadingPosts] = useState(true);
  const [rev, setRev] = useState(false)

  useEffect(()=>{
    if(!isTyping){
      searchPosts()
    }
  },[isTyping])


  const searchPosts = (temp) => {
    const words = search.toLowerCase().split(' ');
    let pory = temp?temp:posts
    // Filter the array of objects based on the title containing all words
    const filteredObjects = pory.filter(obj => {
      const objTitle = obj.title.toLowerCase();
      return words.every(word => objTitle.includes(word));
    });


    console.log(filteredObjects)
    sortBy(filteredObjects)
    // setTempPost(filteredObjects)
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  function handleSubmitModal() {
    setShowModal(false);
  }

  function handleOpenModal() {
    if(cookies.ghost){
      getToastError("Ghosts cant post anything")
    }
    else{
      setShowModal(true);
    }
  }

  const createPost = () => {
    let currdate = moment()
    const requestOptions = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({"title": title,"body": body, "tag": tag, uid: cookies.uid, "posted_time": currdate, "username": cookies.uname, "icon": cookies.icon, "likes": 0, "likedBy": [], "dislikedBy": [], "viewedBy": [], "saved_by": []})
    };
    fetch(`${link}/create-post`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        getToastError(data.error);
      } else {
        handleSubmitModal();
        navigate("/");
      }
    })
    .catch((error) => {
      getToastError("An error occurred while fetching data");
    });
    
  }

  useEffect(()=>{
    setLoadingPosts(true);
    setSearch("") 
    getPosts();
  },[])

  const sortBy = (filteredObjects) => {
    let temp = filteredObjects?[...filteredObjects]:[...tempposts]
    if(sort=="latest"){
      temp.sort((a, b) => new Date(b.posted_time) - new Date(a.posted_time));
    }else if(sort=="liked"){
      temp.sort((a, b) => b.likes - a.likes);
    }else if(sort=="disliked"){
      temp.sort((a, b) => a.likes - b.likes);
    }else if(sort=="top"){
      temp.sort((a,b) => b.viewedBy.length - a.viewedBy.length)
    }
    if(rev){
      setTempPost([...temp].reverse())
    }
    else{
      setTempPost(temp);
    }
  }

  useEffect(()=>{
    sortBy()
  },[sort])

  const getPosts = () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    };
    fetch(`${link}/get-posts`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        getToastError(data.error);
      } else {
        let temp = [...data];
        if (sort == "latest") {
          temp.sort((a, b) => new Date(b.posted_time) - new Date(a.posted_time));
        } else if (sort == "liked") {
          temp.sort((a, b) => b.likes - a.likes);
        } else if (sort == "disliked") {
          temp.sort((a, b) => a.likes - b.likes);
        } else if (sort == "top") {
          temp.sort((a, b) => b.viewedBy.length - a.viewedBy.length);
        }
        console.log(temp);
        setLoadingPosts(false);
        setPost(temp);
        setTempPost(temp);
        console.log(search);
      }
    })
    .catch((error) => {
      getToastError("An error occurred while fetching data");
    });

  }

  const setSwap = () => {
    setTempPost([...tempposts].reverse())
    setRev(!rev)
  }
  
  if(!isLoadingPosts){
    return (
      <>
        <div style={{ paddingTop: "100px", margin: "0em 3em" }}>
          <Sort setSort={setSort} sort={sort} setSwap={setSwap} rev={rev}/>
          <div className="app_main">
            <Post posts={tempposts} search={search}/>
            <Viewed />
          </div>
        </div>
        <img className="floating_button" onClick={handleOpenModal} src={add} />
        <ReactModal
          isOpen={showModal}
          contentLabel="onRequestClose Example"
          onRequestClose={handleCloseModal}
          className="modal"
          overlayClassName="overlay"
        >
          <div className='createpost'>Create Post</div>
          <div className='inputs'>
            <input className='title_input' type="text" placeholder='Title' value={title} onChange={(e)=>setTitle(e.target.value)}></input>
            <textarea className='body_input' rows={5} cols={40} value={body} placeholder='Body' onChange={(e)=>setBody(e.target.value)}></textarea>
            <input className='tag_input' type="text" placeholder='Add a Tag' value={tag} onChange={(e)=>setTag(e.target.value)}></input>
          </div>
          <div className='createbutton'>
            <div className='close'onClick={handleCloseModal}>Close</div>
            <div className='submit'onClick={createPost}>Submit</div>
          </div>
        </ReactModal>
      </>
    );
  }

  return (
    <Loader height={1000}/>
  );
}
