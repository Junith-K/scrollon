import React, { useState } from "react";
import ContentLoader, { Facebook } from 'react-content-loader'
import "./Loader.css"


export default function LoaderPost(){
    return (
    <ContentLoader
        speed={1}
        style={{width: "100%"}}
        backgroundColor="#383838"
        foregroundColor="#666666"
    >
        <rect x="0" y="0" rx="10" ry="10" height="50" width="50"/> 
        <rect x="55" y="0.5em" rx="3" ry="3" width="150" height="15" />
        <rect x="55" y="1.75em" rx="3" ry="3" width="150" height="15" />
        <rect x="0" y="4em" rx="5" ry="5" width="100%" height="5em" />
    </ContentLoader>
  );
}

export function LoaderPostBody(){
    return (
    <ContentLoader
        speed={1}
        style={{width: "100%"}}
        backgroundColor="#383838"
        foregroundColor="#666666"
    >
        <rect x="0" y="1.5em" rx="10" ry="10" height="7em" width="100%"/> 
    </ContentLoader>
  );
}
