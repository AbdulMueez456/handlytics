import "./Header.css"
import bg from "./bg2.png"

import {Link} from "react-router-dom"


const Header = () => {

    return (
        <>
            <div className="header-parent">
                <div className="header-wrapper">
                    <div>
                        <p className="header-text">Pakistan's first ever sign language recognition <br />service</p>
                        <p className="header-subtext">FOR URDU LANGUAGE</p>
                    </div>

                    <div className="header-btn-container">
                        <Link style={{ color: 'none', textDecoration: 'inherit', display:"flex",alignItems:"center"  }} to="/solution">
                            <button className="header-btn">SOLUTION</button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="header2-parent">
                <div>
                    <p className="header2-text">Pakistan's first ever sign language recognition service</p>
                    <p className="header2-subtext">FOR URDU LANGUAGE</p>
                </div>
                <div>
                    <img style={{ width: "100%" }} src={bg} alt="bg" />
                </div>
                <div className="header2-text">
                    <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to="/solution">
                         <p>TRY NOW FOR FREE</p>
                    </Link>
                </div>
            </div>
        </>

    );


}

export default Header;

