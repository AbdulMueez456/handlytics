import Banner from "../components/Banner/Banner";
import Features from "../components/Features/Features";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Pricing from "../components/Pricing/Pricing";
import Tutorial from "../components/Tutorial/Tutorial";
import "./Home.css"
import { useCallback} from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import FloatingBtn from "../components/FloatingBtn/FloatingBtn";
import BannerImage from "../components/BannerImage/BannerImage";
import Contributors from "../components/Contributors/Contributors";

import image from './bg6.jpg'
import image2 from './image2.jpg'


const Home = ({featureRef,pricingRef}) => {
    const particlesInit = useCallback(async engine => {
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);

    // useEffect(()=>{
    //     const fetchData = async () => {
    //         const response = await fetch('http://localhost:5000/');
    //         const data = await response.text();
    //         return data;
    //       }
    //     console.log(fetchData());
    // },[]);


    return (
        <>
            <div className="particles-container">
                <Particles
                    id="tsparticles"
                    init={particlesInit}
                    loaded={particlesLoaded}
                    options={{
                        background: {
                            color: {
                                value: "none",
                            },
                        },
                        fpsLimit: 120,
                        interactivity: {
                            events: {
                                onClick: {
                                    enable: false,
                                    mode: "push",
                                },
                                onHover: {
                                    enable: true,
                                    mode: "repulse",
                                },
                                resize: true,
                            },
                            modes: {
                                push: {
                                    quantity: 3,
                                },
                                repulse: {
                                    distance: 200,
                                    duration: 0.4,
                                },
                            },
                        },
                        particles: {
                            color: {
                                value: "#ffffff",
                            },
                            links: {
                                color: "#ffffff",
                                distance: 150,
                                enable: true,
                                opacity: 0.5,
                                width: 1,
                            },
                            collisions: {
                                enable: false,
                            },
                            move: {
                                directions: "none",
                                enable: true,
                                random: false,
                                speed: 3,
                                straight: false,
                                bounce: false,
                            },
                            number: {
                                density: {
                                    enable: true,
                                    area: 800,
                                },
                                value: 50,
                            },
                            opacity: {
                                value: 0.5,
                            },
                            shape: {
                                type: "circle",
                            },
                            size: {
                                value: { min: 1, max: 5 },
                            },
                        },
                        detectRetina: true,
                    }}
                />
            </div>

            
            <Header />
            <Features featureRef={featureRef} />
            <BannerImage image={image}/>
            <Banner />
            <Pricing pricingRef={pricingRef}/>
            <BannerImage image={image2}/> 
            <Contributors/>
            <hr style={{width:'30%', marginBottom:'30px',border:'0',height:'1px',backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0))'}} />
            <Tutorial />
            
            <Footer />
            <FloatingBtn/>

        </>
    );

}

export default Home;