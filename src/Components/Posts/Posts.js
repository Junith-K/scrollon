import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Posts.css";
import Icons from "../../Icons/Icons";
import { useCookies } from "react-cookie";
import getTime from "../../Time/Time";
import moment from "moment";
import link from '../../constants'
import Clipboard from "../Copy/Copy";
import LoaderPost, { LoaderPostBody } from "../Loader/LoaderPost";
import getToastError from '../Toast/Toast'
import ReactModal from "react-modal";
import { useNavigate } from 'react-router-dom'


export default function Posts() {
  const params = useParams();
  const [postData, setPostData] = useState();
  const [body, setBody] = useState("")
  const [cookies, setCookie] = useCookies(["uid","uname","icon","recent_posts"]);
  const [comments, setComment] = useState([])
  const [like, setLike] = useState(0)
  const navigate = useNavigate()
  const [isLiked,setIsLiked] = useState(false);
  const [isDisLiked,setIsDisLiked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [copied, setCopied] = useState(false)
  const [loader, isLoader] = useState(true);
  const [book, setBook] = useState(false);
  const [tag, setTag] = useState("")
  const [title, setTitle] = useState("")
  const [body1, setBody1] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (copied) setCopied(false)
    }, 1000)

    return () => clearTimeout(timeout)
  }, [copied])

  useEffect(() => {
    isLoader(true)
    getPostData()
  }, []);

  useEffect(()=>{
    console.log(book)
  },[book])

  const getPostData = () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`${link}/post/${params.id}?uid=${cookies.uid}`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        getToastError(data.error);
      } else {
        setPostData(data);
        setComment(data.comment)
        setIsLiked(data.likedBy?.some((liked) => liked.userid === cookies.uid))
        setIsDisLiked(data.dislikedBy?.some((disliked) => disliked.userid === cookies.uid))
        setLike(data.likes)
        console.log(data["saved_by"])
        setBook(data["saved_by"]?.some((saved) => saved.userid === cookies.uid))
        const foundIndex = cookies.recent_posts.findIndex(item => item.post_title === data.title && item.post_id === data._id);
        let temp = [...cookies.recent_posts];
        console.log(temp)
        isLoader(false)
        if (foundIndex !== -1) {
          const foundObject = temp[foundIndex];
          temp.splice(foundIndex, 1);
          temp.unshift(foundObject);
          setCookie("recent_posts", [...temp])
        }
        else if(cookies.recent_posts.length>=10){
          temp.pop()
          setCookie("recent_posts", [{"post_title": data.title, "post_id": data._id}, ...temp])
        }
        else{
          setCookie("recent_posts", [{"post_title": data.title, "post_id": data._id},...cookies.recent_posts])
        }
      }
    })
    .catch((error) => {
      getToastError("An error occurred while fetching data");
    });
  }


  const postComment = () => {
    var today = moment()
    const requestOptions = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({"comment": body, "uid": cookies.uid, "username": cookies.uname, "icon": cookies.icon, "commented_time": today})
    };
    fetch(`${link}/comment/${postData._id}`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        getToastError(data.error);
      } else {
        setBody("")
      }
    })
    .catch((error) => {
      getToastError("An error occurred while fetching data");
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
      body: JSON.stringify({"uid": cookies.uid, "isLiked": isLiked, "isDisLiked": isDisLiked, "viewed_time": new Date().toISOString()})
    };
    fetch(`${link}/post/like/${params.id}`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        getToastError(data.error);
      } else {
        if(isDisLiked){
          setIsDisLiked(false)
        }
        setIsLiked(!isLiked)
      }
    })
    .catch((error) => {
      getToastError("An error occurred while fetching data");
    });
  }

  const dislikePost = () => {
    if(isDisLiked){
      setLike(like+1);
    }else{
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
      body: JSON.stringify({"uid": cookies.uid, "isDisLiked": isDisLiked, "isLiked": isLiked, "viewed_time": new Date().toISOString()})
    };
    fetch(`${link}/post/dislike/${params.id}`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        getToastError(data.error);
      } else {
        if(isLiked){
          setIsLiked(false)
        }
        setIsDisLiked(!isDisLiked)
      }
    })
    .catch((error) => {
      getToastError("An error occurred while fetching data");
    });
  }

  const savePost = () => {
    const requestOptions = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({"post_id": postData._id, "post_title": postData.title, "saved_time": new Date().toISOString()})
    };
    fetch(`${link}/post/save/${cookies.uid}/${!book}`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        getToastError(data.error);
      } else {
        setBook(!book)
        console.log(data)
      }
    })
    .catch((error) => {
      getToastError("An error occurred while fetching data");
    });
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
      setTag(postData?.tag)
      setTitle(postData?.title)
      setBody1(postData?.body)
    }
  }

  function handleCloseModal1() {
    setShowModal1(false);
  }

  function handleOpenModal1() {
    if(cookies.ghost){
      getToastError("Ghosts cant post anything")
    }
    else{
      setShowModal1(true);
    }
  }

  const updatePostEarly = () => {
    isLoader(true)
    updatePost()
    isLoader(false)
  }

  const updatePost = () => {
    const requestOptions = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({"body": body1, "title": title, "tag": tag})
    };
    fetch(`${link}/post/update/${postData._id}`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        getToastError(data.error);
      } else {
        handleSubmitModal()
        setPostData(data.value)
        let temp = [...cookies.recent_posts]
        temp.shift()
        setCookie("recent_posts", [{"post_title": data.value.title, "post_id": data.value._id}, ...temp])
      }
    })
    .catch((error) => {
      getToastError("An error occurred while fetching data");
    });
  }

  const deletePost = () => {
    let temp = [...cookies.recent_posts]
    temp = temp.filter(item => item.post_id != postData._id)
    setCookie("recent_posts",[...temp])
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`${link}/post/delete/${postData._id}`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        getToastError(data.error);
      } else {
        console.log(data)
        navigate("/")
      }
    })
    .catch((error) => {
      getToastError("An error occurred while fetching data");
    });
  }
  console.log(comments)

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
            {loader?
            <LoaderPost/>:
            <>
              <div className="tit_bottom">
                <div className="tit_top">
                  <img key={postData?.icon} src={Icons[postData?.icon?postData?.icon:"profile"]} alt="Scrollon"></img>
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
            </>
            }
          </div>
        </div>
        {loader?<LoaderPostBody/>:<div className="posts_body">{postData?.body}</div>}
        <div className="options">
          <div className="views">
            <span class="material-symbols-outlined">visibility</span>
            <div>{postData?.viewedBy.length}</div>
          </div>
          <Clipboard className="share" copied={copied} setCopied={setCopied} text={`http://localhost:3000/post/${postData?._id}`} color='white'/>
          <div style={postData?.uid!=cookies.uid?{borderRadius: "0 10px 10px 0"}:{}} onClick={savePost} className="bookmark">
            <span style={book?{"font-variation-settings": "'FILL' 1"}:{}} class="material-symbols-outlined">bookmark</span>
          </div>
          {postData?.uid==cookies.uid?
          <>
            <div onClick={handleOpenModal} className="edit">
              <span class="material-symbols-outlined">edit</span>
            </div>
            <div onClick={handleOpenModal1} className="delete">
              <span class="material-symbols-outlined">delete</span>
            </div>
          </>:
          <></>}
        </div>
        <div className="comment_p">
          <textarea className='body_input' name="Text1" cols="40" rows="4" value={body} placeholder='Comment' onChange={(e)=>setBody(e.target.value)}></textarea>
        </div>
        <div className="com_but" onClick={postComment}>Comment</div>
      </div>
      <div className="posts_comments scroll-container">
        <div className="comment_head">
          <div className="comment_title">Comments</div>
          <div>{`• ${!comments?.length?"0":comments?.length }`}</div>
        </div>
        <div>
          { comments?.length?
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
            }):<div className="first_comment">Be the first person to comment!</div>
          }
        </div>
      </div>
      <ReactModal
          isOpen={showModal}
          contentLabel="onRequestClose Example"
          onRequestClose={handleCloseModal}
          className="modal"
          overlayClassName="overlay"
        >
          <div className='createpost'>Update Post</div>
          <div className='inputs'>
            <input className='title_input' type="text" placeholder='Title' value={title} onChange={(e)=>setTitle(e.target.value)}></input>
            <textarea className='body_input1' rows={5} cols={40} value={body1} placeholder='Body' onChange={(e)=>setBody1(e.target.value)}></textarea>
            <input className='tag_input' type="text" placeholder='Add a Tag' value={tag} onChange={(e)=>setTag(e.target.value)}></input>
          </div>
          <div className='createbutton'>
            <div className='close'onClick={handleCloseModal}>Close</div>
            <div className='submit'onClick={updatePostEarly}>Submit</div>
          </div>
        </ReactModal>
        <ReactModal
          isOpen={showModal1}
          contentLabel="onRequestClose Example"
          onRequestClose={handleCloseModal1}
          className="modal modal1"
          overlayClassName="overlay"
        >
          <div className='createpost1'>Delete Post</div>
          <div>This post will be permanantely deleted!</div>
          <div className='createbutton'>
            <div className='close'onClick={handleCloseModal1}>Close</div>
            <div className='deletemodal'onClick={deletePost}><span class="material-symbols-outlined">warning</span>Delete</div>
          </div>
        </ReactModal>
    </div>
  );
}
