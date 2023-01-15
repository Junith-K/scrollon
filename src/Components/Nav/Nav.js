import React from "react";
import logo from "../../Icons/B_64.png";
import profile from "../../Icons/profile_50.png";
import "./Nav.css";

export default function Nav() {
  return (
    <div className="nav">
      <div className="nav_main">
        <img src={logo} alt="bloggy"></img>
        <div className="title">Bloggy</div>
      </div>
      <div>
        <div class="box">
          <span class="material-symbols-outlined">search</span>
          <input type="text" name="" placeholder="Search Bloggy" />
        </div>
      </div>
      <div className="profile">
        <div className="profile_body">
          <img src={profile} alt="bloggy"></img>
          <div className="profile_name">Username</div>
        </div>
        <span class="material-symbols-outlined">keyboard_arrow_down</span>
      </div>
    </div>
  );
}
