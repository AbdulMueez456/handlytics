import "./FloatingBtn.css"
import arrow from "./up-arrow2.png"
import React,{useState,useEffect} from 'react'

const FloatingBtn = () => {
    const [display, setDisplay] = useState(false)
  
    const toggleDisplay = () => {
      const scrolled = document.documentElement.scrollTop;
      if (scrolled > 200){
        setDisplay(true)
      } 
      else{
        setDisplay(false)
      }
    };
    
    const scrollToTop = () =>{
      window.scrollTo({
        top: 0, 
        behavior: 'smooth'
      });
    };
    
    useEffect(() => {
      window.addEventListener('scroll', toggleDisplay);
    }, []);


    return (
        <>
            <button  style={{display:display?"flex":'none'}} className="btn-link" onClick={scrollToTop}>
                <img style={{ width: '80%' }} src={arrow} alt="arrow" />
            </button>
        </>
    )
}

export default FloatingBtn;
