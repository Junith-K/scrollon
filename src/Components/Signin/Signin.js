import React from 'react'
import "../Register/Register.css"
import { useState } from 'react';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";


export default function Signin() {
    const [email, setEmail] = useState("");
    const [cookies, setCookie] = useCookies(["uid"]);
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
                setCookie('uid', data._id, { path: '/' })
                setCookie('email', email, { path: '/' })
                setCookie("uname", data.uname, { path: "/" });
                setCookie('icon', data.icon, { path: "/" })
                navigate("/");
                }
                else{
                    console.log("nope")
                    toast.error('Wrong details!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
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
        <ToastContainer />
      </div>
    </div>
  );
}
