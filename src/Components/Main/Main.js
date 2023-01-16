import React from 'react'
import Sort from '../HomePage/Sort/Sort'
import Post from '../HomePage/Post/Post'
import Viewed from '../HomePage/Viewed/Viewed'
import add from "../../Icons/add_100.png"
import "./Main.css"

export default function Main() {
  return (
    <>
        <div style={{ paddingTop: "100px", margin: "0em 3em"}}>
            <Sort />
            <div className="app_main">
              <Post />
              <Viewed />
            </div>
        </div>
        <img className="floating_button" src={add} />
    </>
  )
}
