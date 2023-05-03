import { useRef} from "react";
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Solution from "./pages/Solution";



function App() {
  const featureRef = useRef(null);

  const handleClickFeature = () => {

    featureRef.current.scrollIntoView({ behavior: 'smooth' });


  };
  const pricingRef = useRef(null);

  const handleClickPricing = () => {

    pricingRef.current.scrollIntoView({ behavior: 'smooth' });


  };

  
  return (
    <>
     


      {/* Pages */}
      <BrowserRouter>
         {/* Standalone component */}
        <Navbar handleClickFeature={handleClickFeature} handleClickPricing={handleClickPricing} />
         {/* Routes */}
        <Routes>
          <Route path="/" element={<Home featureRef={featureRef} pricingRef={pricingRef} />} />
          <Route path="/solution" element={<Solution/>} />
          <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
      </BrowserRouter>

    </>




  );
}

export default App;
