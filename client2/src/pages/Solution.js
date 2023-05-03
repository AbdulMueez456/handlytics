import React, { useState,useEffect} from 'react'
import './Solution.css'
import man from "./sollogo.png"
import ToolPane from '../components/ToolPane/ToolPane'



const Solution = () => {
  const [camera, setCamera] = useState(false)
  const [imageSrc, setImageSrc] = useState(null);
  const [label,setLabel] = useState([]);

  useEffect(() => {

    let eventSource;
    if (camera){
      eventSource = new EventSource('http://localhost:5000/');
      eventSource.onmessage = (event) => {
        
        if (event.data.startsWith("data")) {
            setLabel((prevlabel)=>[...prevlabel,event.data.substring(4)]);
        } else {
            
           setImageSrc(`data:image/jpeg;base64,${event.data}`);
        }
    };

    }
    
    return () => {
      if (eventSource){
        eventSource.close();
      }
      
    };
  }, [camera]);

  const toggleCamera = () => {
    setCamera(!camera);
  }
  


  return (
    <>
      <div className='parent'>
        <div className='left'>
          <h2 style={{ fontSize: "1.5vw" }}>Have your voice and say in daily life</h2>
          <h1>Start Now!</h1>
          <img src={man} alt="man" />

        </div>
        <div className='center'>
          <ToolPane camera={camera} cameraHandler={toggleCamera} />
          <img style={{ width: '100%', height: '100%', display: camera ? 'block' :'none' , position: 'absolute', top: '0', zIndex: '19' }} src={camera? imageSrc : "http://localhost:5000/release"} alt="" />

        </div>
        <div className='right'>
          <h3 style={{ alignSelf: 'center' }}>Prediction</h3>
          <hr style={{ border: '0.5px solid #A7A0C1 ', width: '60%' }} />
          {label.join(" ")}

        </div>
      </div>
    </>
  )
}

export default Solution;
