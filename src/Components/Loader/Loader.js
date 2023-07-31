import React, { useState } from "react";
import ContentLoader, { Facebook } from 'react-content-loader'
import "./Loader.css"


export default function Loader(){
    return <ContentLoader 
    speed={2}
    // width={400}
    // height={160}
    // viewBox="0 0 400 160"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    className="loader"
  >
    <rect width="1em" height="100em"/> 
    <rect width="1em" height="100em"/> 
    <rect width="1em" height="100em" />
  </ContentLoader>
}
