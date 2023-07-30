import React, { useEffect, useState } from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../../Icons/B_64.png";
import Icons from "../../Icons/Icons.js";
import "./Nav.css";
import { useCookies } from "react-cookie";

export default function Nav() {
  const [cookies, setCookie, removeCookie] = useCookies([
    "uid",
    "uname",
    "email",
    "icon",
    "ghost",
  ]);
  const navigate = useNavigate();
  const [empty, setEmpty] = useState();

  const logOut = () => {
    removeCookie("uid", { path: "/" });
    removeCookie("uname", { path: "/" });
    removeCookie("email", { path: "/" });
    removeCookie("icon", { path: "/" });
    removeCookie("sortBy", { path: "/" });
    removeCookie("recent_posts", { path: "/" });
    navigate("/");
  };

  const ghostMode = () => {
    setCookie("ghost", "ghost", { path: "/" });
    setEmpty("");
    navigate("/");
  };

  const logGhostOut = () => {
    removeCookie("ghost", { path: "/" });
    navigate("/");
  };

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
          {cookies.ghost ? (
            <div className="profile">
              <div className="profile_body">
                <img src={Icons["profile"]} alt="bloggy"></img>
                <div className="profile_name">Anonymous</div>
              </div>
              <span class="material-symbols-outlined">keyboard_arrow_down</span>
              <div class="dropdown">
                <div className="logout" onClick={logGhostOut}>
                  Logout
                </div>
              </div>
            </div>
          ) : (
            <>
              <Link style={{ textDecoration: "none" }} to="/register">
                <div className="nav_regis1">Register</div>
              </Link>
              <Link style={{ textDecoration: "none" }} to="/sign-in">
                <div className="nav_sign">Sign In</div>
              </Link>
              <div className="nav_ghost" onClick={ghostMode}>
                <img src={Icons["profile"]} alt="bloggy"></img>Ghost
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
