import "./Pricing.css"

const Pricing = ({ pricingRef }) => {

    return (
        <>
            <div ref={pricingRef} className="pricing-parent">
                <h3 style={{color:'#938AB7'}}>PRICING</h3>
                <h2>$0</h2>
                <p>Support us by sharing this free solution with your friends. Help Pakistan's deaf and dumb community by making them aware of this major breakthrough!
                Prices may vary likely in the future. For now, for promotional purposes, you can enjoy this service for free. Feel free to contact us for any collaboration.
                </p>
                
            </div>
        </>
    );
}



export default Pricing;