import "./App.css";
import Post from "./Components/HomePage/Post/Post";
import Sort from "./Components/HomePage/Sort/Sort";
import Viewed from "./Components/HomePage/Viewed/Viewed";
import Nav from "./Components/Nav/Nav";
import add from "./Icons/add_100.png"

function App() {
  return (
    <>
      <Nav />
      <div style={{ paddingTop: "100px", margin: "0em 3em" }}>
        <Sort />
        <div className="app_main">
          <Post />
          <Viewed />
        </div>
      </div>
      <img className="floating_button" src={add}/>
    </>
  );
}

export default App;
