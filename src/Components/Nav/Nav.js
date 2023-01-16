import React from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import logo from "../../Icons/B_64.png";
import profile from "../../Icons/profile_50.png";
import "./Nav.css";

export default function Nav() {
  return (
    <div className="nav">
      <Link style={{textDecoration: 'none'}} to="/">
        <div className="nav_main">
          <img src={logo} alt="bloggy"></img>
          <div className="title">Bloggy</div>
        </div>
      </Link>
      <div class="box">
        <span class="material-symbols-outlined">search</span>
        <input type="text" name="" placeholder="Search Bloggy" />
      </div>
      <div className="nav_foot">
        <Link style={{textDecoration: 'none'}} to="/register"><div className="nav_regis1">Register</div></Link>
        <Link style={{textDecoration: 'none'}} to="/sign-in"><div className="nav_sign">Sign In</div></Link>
        <div className="nav_ghost">
          <img src={profile} alt="bloggy"></img>Ghost
        </div>
      </div>
      {/* <div className="profile">
        <div className="profile_body">
          <img src={profile} alt="bloggy"></img>
          <div className="profile_name">Username</div>
        </div>
        <span class="material-symbols-outlined">keyboard_arrow_down</span>
      </div> */}
    </div>
  );
}
