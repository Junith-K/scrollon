import "./App.css";
import Nav from "./Components/Nav/Nav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";  
import Register from "./Components/Register/Register";
import Main from "./Components/Main/Main";
import Signin from "./Components/Signin/Signin";
import Posts from "./Components/Posts/Posts";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path={`/post`} element={<Posts />} />
      </Routes>
    </Router>
  );
}

export default App;
