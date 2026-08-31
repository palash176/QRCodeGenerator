// import { Login } from "@mui/icons-material";
// import React, { useEffect, useState } from "react";
import React from "react";
import "./App.scss";
import Layout from "./components/common/Layout";
import AppRoutes from "./routes/Routes";

const App: React.FC = () => {

  return (
    <div className="app">
      <Layout>
        <AppRoutes />
      </Layout>
    </div>
  );
};

export default App;
