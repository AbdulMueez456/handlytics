import "./ToolPane.css"
import video from "./video.png"
import more from "./more.png"
import startVideo from './zoom.png'
import React from 'react'

const ToolPane = ({camera,cameraHandler}) => {
return (
  <div id="toolpane-container" className="container">
    <button className="btn-links" onClick={cameraHandler}><img src={camera? video:startVideo} style={{ width: '80%' }} alt="video" /></button>
    <button className="btn-links"><img src={more} style={{ width: '80%' }} alt="more" /> </button>

  </div>
)
}


export default ToolPane;