import React, { useState, useRef } from "react";
import "./App.css";
import Nav from "./Components/Nav/Nav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";  
import Register from "./Components/Register/Register";
import Main from "./Components/Main/Main";
import Signin from "./Components/Signin/Signin";
import Posts from "./Components/Posts/Posts";
import { useCookies } from "react-cookie";
import MainUnAuth from "./Components/Main/MainUnAuth";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Test from "./test";
import { useHotkeys } from 'react-hotkeys-hook'
import Profile from "./Components/Profile/Profile";



function App() {
  const [cookies, setCookie] = useCookies(["uid", "uname", "icon", "ghost"]);
  const inputRef = useRef(null)
  const [search, setSearch] = useState("")
  const [isTyping, setIsTyping] = useState(false);

  useHotkeys('ctrl+q', () => {
    inputRef.current.focus();
  });

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Nav inputRef={inputRef} search={search} setSearch={setSearch} isTyping={isTyping} setIsTyping={setIsTyping}/>
      <ToastContainer />
      {cookies.uid || cookies.ghost ? (
        <Routes>
          <Route exact path="/" element={<Main search={search} setSearch={setSearch} isTyping={isTyping} setIsTyping={setIsTyping}/>} />
          <Route path="/post/:id" element={<Posts />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/test" element={<Test/>}/>
        </Routes>
      ) : (
        <Routes>
          <Route exact path="/" element={<MainUnAuth />} />
          <Route path="/register" element={<Register />} />
          <Route path="/test" element={<Test/>}/>
          <Route path="/sign-in" element={<Signin />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
