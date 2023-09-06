import React, { useState, useRef, useEffect } from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../Icons/hebbaadh.png";
import Icons from "../../Icons/Icons.js";
import "./Nav.css";
import { useCookies } from "react-cookie";



export default function Nav({inputRef, search, setSearch,isTyping, setIsTyping}) {
  const [cookies, setCookie, removeCookie] = useCookies([
    "uid",
    "uname",
    "email",
    "icon",
    "ghost",
  ]);
  const navigate = useNavigate();
  const [empty, setEmpty] = useState();
  const location = useLocation();
  

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

  useEffect(() => {
    let typingTimer;

    if (search) {
      setIsTyping(true);

      clearTimeout(typingTimer);
      typingTimer = setTimeout(() => {
        setIsTyping(false);
      }, 1500);
    } else {
      setIsTyping(false);
    }

    return () => {
      clearTimeout(typingTimer);
    };
  }, [search]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const gotoProfile = () => {
    navigate("/profile")
  }


  return (
    <div className="nav">
      <Link style={{ textDecoration: "none" }} to="/">
        <div className="nav_main">
          <img style={{width: "175px", padding: "0 1em"}} src={logo} alt="Scrollon"></img>
        </div>
      </Link>
      {location.pathname==="/" && <div class="box">
        <span class="material-symbols-outlined">search</span>
        <input ref={inputRef} type="text" name="search" value={search} onChange={(e)=>{handleSearchChange(e)}} placeholder="Search Scrollon (Ctrl+Q)" />
      </div>}
      {cookies.uid ? (
        <div className="profile">
          <div className="profile_body">
            <img src={Icons[cookies.icon]} alt="Scrollon"></img>
            <div className="profile_name">{cookies.uname}</div>
          </div>
          <span class="material-symbols-outlined">keyboard_arrow_down</span>
          <div class="dropdown">
            <div onClick={gotoProfile} className="logout">
              <span class="material-symbols-outlined profilebut">person</span>
              <span>Profile</span>
            </div>
            <div className="logout" onClick={logOut}>
              <span class="material-symbols-outlined profilebut">logout</span>
              <span >Logout</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="nav_foot">
          {cookies.ghost ? (
            <div className="profile">
              <div className="profile_body">
                <img src={Icons["profile"]} alt="Scrollon"></img>
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
                <img src={Icons["profile"]} alt="Scrollon"></img>Ghost
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
