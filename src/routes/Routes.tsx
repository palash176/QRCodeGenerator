import React from "react";
import { Route, Routes,  } from "react-router-dom";
import GenerateQR from "../components/GenerateQR";

const AppRoutes: React.FC = () => {

 
  return (
    <>
      <Routes>
       
        <Route path="/" element={<GenerateQR/>} />
       
       
      </Routes>
    </>
  );
};

export default AppRoutes;
