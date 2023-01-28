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


function App() {
  const [cookies, setCookie] = useCookies(["uid", "uname", "icon", "ghost"]);

  return (
    <Router>
      <Nav />
      <ToastContainer />
      {cookies.uid || cookies.ghost ? (
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route path="/post/:id" element={<Posts />} />
        </Routes>
      ) : (
        <Routes>
          <Route exact path="/" element={<MainUnAuth />} />
          <Route path="/register" element={<Register />} />
          <Route path="/sign-in" element={<Signin />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
