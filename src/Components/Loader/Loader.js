import React, { useState } from "react";
import ContentLoader, { Facebook } from 'react-content-loader'
import "./Loader.css"


export default function Loader(props){
    const {height} = props;
    return (
      <div style={{ paddingTop: "100px", margin: "0em 3em", zIndex: "1"}}>
        <ContentLoader
          speed={1}
          style={{width: "100%",position: 'relative'}}
          height={height}
          backgroundColor="#222222"
          foregroundColor="#4f4f4f"
        >
          <rect x="0" y="0" style={{width: "100%", height: "3.5em"}}/> 
          <rect x="0" y="5.5em" style={{width: "66.5%"}} height="500" /> 
          <rect x="67.5%" y="5.5em" style={{width: "33%"}} height="100" />
        </ContentLoader>
      </div>
  );
}
