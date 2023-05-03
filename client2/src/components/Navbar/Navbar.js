import Mail from "./Mail.png"
import Linkedin from "./Linkedin.png"
import Twitter from "./Twitter.png"
import { Link,useLocation } from "react-router-dom";
import "./Navbar.css"
import { useState, useEffect } from "react";

const Navbar = ({ handleClickFeature, handleClickPricing }) => {
    const [removeLinks, setRemoveLinks] = useState(false);


    const sendMail = () => {
        window.location.href = "mailto:moiz.eafco126@gmail.com";
    }
   
    const location = useLocation();


    useEffect(() => {
        if(location.pathname==="/"){
            setRemoveLinks(false);
        }
        else{
            setRemoveLinks(true);                            //double click same pr error de raha tha
        }
        
    }, [location]);


    return (
        <>
            <div className="nav-parent" style={{position:  removeLinks ? 'relative':'fixed' }}>
                <div className="nav-wrapper">
                    <div className="nav-left">
                        <Link  style={{ color: 'inherit', textDecoration: 'inherit' }} to="/">
                            <p>
                                HAND-LYTICS
                            </p>
                        </Link>
                    </div>
                    <div className="nav-center">
                        {!removeLinks &&
                            <>
                                <button className="btn-links" onClick={() => handleClickFeature()}>FEATURES</button>
                                <button className="btn-links"><Link className="btn-links" to="/solution">SOLUTION</Link></button>

                                <button className="btn-links" onClick={() => handleClickPricing()}>PRICING</button>
                                <button className="btn-links" onClick={sendMail}>CONTACT</button>
                            </>
                        }
                    </div>
                    <div className="nav-right">
                        <button className="btn-links" onClick={sendMail}><img src={Mail} alt="" /></button>
                        <button className="btn-links"><img src={Linkedin} alt="" /></button>
                        <button className="btn-links"><img src={Twitter} alt="" /></button>

                    </div>
                    <div className="nav-right2">
                        <p>Stay tuned with us for more updates!</p>
                    </div>
                </div>

            </div>
        </>
    );

}


export default Navbar;