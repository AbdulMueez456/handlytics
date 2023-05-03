import "./Footer.css"
import contact from "./contact.png"
const Footer=()=>{

    return(
        <>
            <div className="footer-parent">
                <div className="content-parent">
                    <div className="content-container">
                        <img src={contact} alt="" />
                        <h1>Got some queries?<br/>Contact us!</h1>
                    </div>
                    <div className="content-right-container"></div>
                </div>
                <div className="bottom-container">
                    <p>@{new Date().getFullYear()}</p>
                    <p>TERMS OF USE</p>
                    <p>PRIVACY POLICY</p>
                    <p>COOKIES POLICY</p>
                </div>
            </div>
        </>
    );
}



export default Footer;