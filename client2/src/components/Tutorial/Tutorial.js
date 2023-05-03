import "./Tutorial.css"



const Tutorial=()=>{

    return (
        <>
            <div className="tut-parent">
                <div className="tut-section">
                    <h3>TUTORIAL</h3>
                    <h2>Want some help? Let us guide you</h2>
                    <iframe className="video" src="https://www.youtube.com/embed/ifuQPe2xEow" title="PSL Pakistan Sign Language || Class 73 ||" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
                </div>
                <div className="quote-section">
                    <h1>Say 'NO' to more ISOLATION!</h1>
                </div>

            </div>
            
        </>
    );

}

export default Tutorial;
