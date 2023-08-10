import React from 'react';
import { useCookies } from "react-cookie";
import "./Sort.css";

export default function Sort(props) {

  const [cookies, setCookie] = useCookies(["sortBy"]);
  const {setSort, sort, setSwap, rev} = props;

  const sorting = (sort) => {
    setSort(sort)
    setCookie('sortBy', sort, { path: '/' })
  }

  return (
    <div className="sort">
      <div className="sort_title">
        <div style={sort=="latest"?{backgroundColor: "white", color: "black"}:{}} onClick={()=>{sorting("latest")}} className="sort_name">Latest</div>
        <div style={sort=="top"?{backgroundColor: "white", color: "black"}:{}} onClick={()=>{sorting("top")}} className="sort_name">Top</div>
        <div style={sort=="liked"?{backgroundColor: "white", color: "black"}:{}} onClick={()=>{sorting("liked")}} className="sort_name">Most Liked</div>
        <div style={sort=="disliked"?{backgroundColor: "white", color: "black"}:{}} onClick={()=>{sorting("disliked")}} className="sort_name">Disliked</div>
      </div>
      <span onClick={setSwap} style={rev?{backgroundColor: "white", color: "black"}:{}} class="material-symbols-outlined swap_ver">swap_vert</span>
    </div>
  );
}
