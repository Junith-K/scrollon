import React from 'react'
import "../Register/Register.css"
import { useState } from 'react';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import link from '../../constants'
import getToastError from '../Toast/Toast';
import { useHotkeys } from 'react-hotkeys-hook'


export default function Signin() {
    const [email, setEmail] = useState("");
    const [cookies, setCookie, removeCookie] = useCookies(["uid"]);
    const [pass, setPass] = useState("");
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    useHotkeys('enter', () => {
      signIn()
    },{enableOnFormTags: ['INPUT']});

    const signIn = () => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"email": email.toString(), "password":pass.toString()})
      };
      fetch(`${link}/sign-in`, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (!data.error) {
          removeCookie("ghost", { path: "/" });
          setCookie('uid', data._id, { path: '/' });
          setCookie('email', email, { path: '/' });
          setCookie("uname", data.uname, { path: "/" });
          setCookie('icon', data.icon, { path: "/" });
          setCookie('sortBy', "latest", { path: '/' });
          setCookie('recent_posts', [], { path: '/' });
          navigate("/");
        } else {
          getToastError(data.error);
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        getToastError("Some Error Occured")
      });
    }

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

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
            // ref={ref}
            autoFocus={true}
            type="text"
            name=""
            placeholder="Email"
          />
        </div>
        <div class="box">
          <span class="material-symbols-outlined" style={{cursor: "pointer"}} onClick={togglePasswordVisibility}>key</span>
          <input
            onChange={(e) => {
              setPass(e.target.value);
            }}
            // ref={ref}
            type={showPassword ? 'text' : 'password'}
            name=""
            placeholder="Password"
          />
        </div>
        <div onClick={signIn} className="nav_regis">Login</div>
      </div>
    </div>
  );
}
