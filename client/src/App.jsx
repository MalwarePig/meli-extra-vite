import React, { useState, useEffect } from "react";
import Navigation from "./routes/routes";
import Login from "./pages/Login/Login";
import ThemeToggle from './components/ThemeToggle/ThemeToggle'
import "./index.scss";

const App = () => {
  const TOKEN = localStorage.getItem("jwt");
  const [logged, setLogged] = useState(!!TOKEN); // Inicializa con true si hay token

  const handleLogin = (status) => {
    setLogged(status);
  };

  return logged == false ? (
    <>
      <ThemeToggle />
      <Login onAuthChange={handleLogin} />
    </>
  ) : (
    <>
      <ThemeToggle />
     <Navigation />
    </>
   
  );
};

export default App;
