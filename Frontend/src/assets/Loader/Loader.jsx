import React from 'react';
import "./Loader.css";

export const Loader = () => {
  return (
    <div className="dots-container">
      <div className="dot" style={{backgroundColor:"red"}} ></div>
      <div className="dot" style={{backgroundColor:"orange"}}></div>
      <div className="dot" style={{backgroundColor:"green"}}></div>
    </div>
  )
}
