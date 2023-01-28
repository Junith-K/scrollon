import React from 'react'
import "../Register/Register.css"
import { useState } from 'react';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import getToastError from '../Toast/Toast';


export default function Signin() {
    const [email, setEmail] = useState("");
    const [cookies, setCookie, removeCookie] = useCookies(["uid"]);
    const [pass, setPass] = useState("");
    const navigate = useNavigate();

    const signIn = () => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"email": email.toString(), "password":pass.toString()})
      };
      fetch("http://localhost:3001/sign-in", requestOptions)
      .then((response) => response.json())
      .then((data) => {
          if(!data.error){
          removeCookie("ghost",{path: "/"})
          setCookie('uid', data._id, { path: '/' })
          setCookie('email', email, { path: '/' })
          setCookie("uname", data.uname, { path: "/" });
          setCookie('icon', data.icon, { path: "/" })
          navigate("/");
          }
          else{
              getToastError("Wrong Details")
          }
      });
    }

  return (
    <div className="regis_main">
      <div className="register">
        <div className="regi_title">Sign In</div>
        <div class="box">
          <span class="material-symbols-outlined">mail</span>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="text"
            name=""
            placeholder="Email"
          />
        </div>
        <div class="box">
          <span class="material-symbols-outlined">key</span>
          <input
            onChange={(e) => {
              setPass(e.target.value);
            }}
            type="text"
            name=""
            placeholder="Password"
          />
        </div>
        <div onClick={signIn} className="nav_regis">Login</div>
      </div>
    </div>
  );
}
