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

export default function Main() {
  const [showModal, setShowModal] = useState(false);
  const [tag, setTag] = useState("")
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("");
  const [cookies, setCookie] = useCookies(["uid", "uname", "ghost"]);
  const navigate = useNavigate()

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
      body: JSON.stringify({"title": title,"body": body, "tag": tag, uid: cookies.uid, "posted_time": currdate, "username": cookies.uname, "icon": cookies.icon, "likes": 0})
    };
    fetch("http://localhost:3001/create-post", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        handleSubmitModal()
        navigate("/")
      });
    
  }

  return (
    <>
      <div style={{ paddingTop: "100px", margin: "0em 3em" }}>
        <Sort />
        <div className="app_main">
          <Post />
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
          <textarea className='body_input' name="Text1" cols="40" rows="5" value={body} placeholder='Body (Optional)' onChange={(e)=>setBody(e.target.value)}></textarea>
          <input className='tag_input' type="text" placeholder='Add a Tag' value={tag} onChange={(e)=>setTag(e.target.value)}></input>
        </div>
        <div onClick={handleCloseModal}>close</div>
        <div onClick={createPost}>Submit</div>
      </ReactModal>
    </>
  );
}
