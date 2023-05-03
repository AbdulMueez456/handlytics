import "./Features.css"
import feature_image from "./urdualphabets.jpg"




const Features = ({featureRef}) => {
    

    return (
        <>
            <div ref={featureRef} className="f-container1">       
                <div className="content-div">
                    <h3 className="main-heading">FEATURES</h3>
                    <h2 className="feature-heading">Effecient Services</h2>
                    <p className="f-explanation">Thanks to our advanced ML algorithm, detect and recognizes accurates signs and gestures. Our solution can be used with any cameras directly integrated within your
                        platforms. Our solution not only recognizes Pakistan Sign Language(PSL) on words and sentence level but also converts the predicted sentences to speech as well.</p>
                </div>
                <div className="img-div">
                    <img className="f-image" src={feature_image} alt="" />
                </div>
            </div>
        </>


    );

}


export default Features;