import React, {useEffect, useState} from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../../Icons/B_64.png";
import Icons from "../../Icons/Icons.js"
import "./Nav.css";
import { useCookies } from "react-cookie";

export default function Nav() {
    const [cookies, setCookie, removeCookie] = useCookies(["uid","uname","email","icon"]);
    const navigate = useNavigate();

    const logOut = () => {
      removeCookie("uid");
      removeCookie("uname");
      removeCookie("email");
      removeCookie("icon");
      navigate("/")
    }

    // useEffect(()=>{
    //   async function getUser (){
    //     if (cookies.uid) {
    //       var resp = await fetch(`http://localhost:3001/user/${cookies.uid}`);
    //       const respi = await resp.json();
    //       setUser(respi);
    //     }
    //   }
    //   getUser();
    // },[])

    // console.log(user);


    {
      
    }

  return (
    <div className="nav">
      <Link style={{ textDecoration: "none" }} to="/">
        <div className="nav_main">
          <img src={logo} alt="bloggy"></img>
          <div className="title">Bloggy</div>
        </div>
      </Link>
      <div class="box">
        <span class="material-symbols-outlined">search</span>
        <input type="text" name="" placeholder="Search Bloggy" />
      </div>
      {cookies.uid ? (
        <div className="profile">
          <div className="profile_body">
            <img src={Icons[cookies.icon]} alt="bloggy"></img>
            <div className="profile_name">{cookies.uname}</div>
          </div>
          <span class="material-symbols-outlined">keyboard_arrow_down</span>
          <div class="dropdown">
            <div className="logout" onClick={logOut}>
              Logout
            </div>
          </div>
        </div>
      ) : (
        <div className="nav_foot">
          <Link style={{ textDecoration: "none" }} to="/register">
            <div className="nav_regis1">Register</div>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/sign-in">
            <div className="nav_sign">Sign In</div>
          </Link>
          <div className="nav_ghost">
            <img src={Icons["profile"]} alt="bloggy"></img>Ghost
          </div>
        </div>
      )}
    </div>
  );
}
