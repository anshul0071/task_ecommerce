import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";

import { Navbar, Sidebar, Footer } from "./components";
import ConfigRoutes from "./routes/ConfigRoutes";

import GlobalStyle from "./styles/GlobalStyle";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Router>
        <MainContent />
      </Router>
    </>
  );
};

const MainContent = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!isAuthPage && <Navbar />}
      <Sidebar />
      <ConfigRoutes />
      {!isAuthPage && <Footer />}
    </>
  );
};

export default App;
