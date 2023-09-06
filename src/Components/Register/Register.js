import React, {useState} from 'react'
import "./Register.css"
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import {icons} from "../../Icons/Icons.js";
import ReactModal from 'react-modal';
import moment from 'moment/moment';
import validator from 'validator';
import link from '../../constants'
import getToastError from '../Toast/Toast';
import { useHotkeys } from 'react-hotkeys-hook'



export default function Register() {
const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [uname, setUname] = useState("")
  const [pass, setPass] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [key,setKey] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["uid"]);
  const [showPassword, setShowPassword] = useState(false);

  useHotkeys('enter', () => {
    sendUser()
  },{enableOnFormTags: ['INPUT']});

  const sendUser = async() => {
    if(email.length==0 || pass.length==0 || uname.length==0){
      getToastError("Enter all Details!")
    }
    else if(!validator.isEmail(email)){
      getToastError("Invalid Email!")
    }
    else {
      const requestOptions = {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"email": email.toString(),"uname": uname.toString(), "password":pass.toString(), icon: key!=""?key:"profile", "registered_date": moment()})
      };
      fetch(`${link}/register`, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          getToastError(data.error)
          console.error("Server error:", data.error);
        } else {
          removeCookie("ghost", { path: "/" });
          setCookie('uid', data.insertedId, { path: '/' });
          setCookie('email', email, { path: '/' });
          setCookie("uname", uname, { path: "/" });
          setCookie("icon", key !== "" ? key : "profile", { path: "/" });
          setCookie('sortBy', "latest", { path: '/' });
          setCookie('recent_posts', [], { path: '/' });
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        getToastError("Some Error Occured")
      });
    }
  }

  function handleCloseModal(){
    setShowModal(false)
    setKey("")
  }

  function handleSubmitModal(){
    setShowModal(false)
  }

  function handleOpenModal(){
    setShowModal(true);
  }

  const selectedIcon = (item) => {
    setKey(item)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const keys = Object.keys(icons)

  return (
    <div className="regis_main">
      <div className="register">
        <div className="regi_title">Register</div>
        <div class="box">
          <span class="material-symbols-outlined">mail</span>
          <input onChange={(e)=>{setEmail(e.target.value)}} type="text" name="" placeholder="Email" />
        </div>
        <div class="box">
          <span class="material-symbols-outlined">person</span>
          <input onChange={(e)=>{e.target.value.length<=12 && setUname(e.target.value)}} value={uname} type="text" name="" placeholder="Username" />
        </div>
        <div class="box">
          <span class="material-symbols-outlined" style={{cursor: "pointer"}} onClick={togglePasswordVisibility}>key</span>
          <input onChange={(e)=>{e.target.value.length<=12 && setPass(e.target.value)}} value={pass} type={showPassword ? 'text' : 'password'} name="" placeholder="Password" />
        </div>
        <div className='profile_icon'>
          <div className="profilee">
            <div className="profilee_body">
              <img src={key!=""?icons[key]:icons["profile"]} alt="Scrollon"></img>
              <div className="profilee_name">{uname}</div>
            </div>
          </div>
          <div onClick={handleOpenModal} className='icon_choose'>Choose</div>
          <ReactModal 
           isOpen={showModal}
           contentLabel="onRequestClose Example"
           onRequestClose={handleCloseModal}
           className="modal"
           overlayClassName="overlay"
          >
          <div className='icon_title'>Profile Icon</div>
          <div className='modal_choose'>
            {keys.map((item)=>{
              return <img key={item} className={key==item?`selected_icon`:``} onClick={()=>selectedIcon(item)} src={icons[item]} alt="Scrollon"></img>;
            })}
          </div>
          <div className='modal_buttons'>
            <div className='modal_button' onClick={handleCloseModal}>Close</div>
            <div className='modal_button' onClick={handleSubmitModal}>Submit</div>
          </div>
          </ReactModal>
        </div>
        <div onClick={sendUser} className="nav_regis">Register</div>
      </div>
    </div>
    );
}
