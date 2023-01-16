import "./App.css";
import Nav from "./Components/Nav/Nav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";  
import Register from "./Components/Register/Register";
import Main from "./Components/Main/Main";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
