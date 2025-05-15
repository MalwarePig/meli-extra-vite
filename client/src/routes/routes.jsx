import React,{useState,useEffect} from "react";
import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";
import LayoutUser from "../layouts/LayoutUser";
import LayoutAdmin from "../layouts/LayoutAdmin";
import {decodeToken} from '../utils/functions'
import Login from "../pages/Login/Login";
import Perfil from "../pages/Perfil/Perfil";
import Admin from "../pages/Admin/Admin";
import "../index.scss";

// Definimos el componente Navigation
export default function Navigation({ onAuthChange }) {

    const [typeUser, setTypeUser] = useState('')
 
  useEffect(()=> {
    const {level} = decodeToken()
    setTypeUser(level)
  },[]) 
 
  return (
    <Router>
      <Routes>
        {typeUser === "user" ? (
          <Route element={<LayoutUser onAuthChange={onAuthChange}/>}>
            <Route path="/" element={<Perfil/>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        ) : (
          <Route element={<LayoutAdmin onAuthChange={onAuthChange}/>}>
            <Route path="/admin" element={<Admin />} />
             <Route path="*" element={<Navigate to="/admin" replace />} />{/* Cuando un usuario visita cualquier ruta que no esté definida en tu <Routes>, automáticamente lo redirige a /admin. */}
          </Route>
        )}
      </Routes>
    </Router>
  );
}

/* usando react-router-dom sin layout 
const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Login />} />
        <Route path="/contact" element={<Perfil />} />
      </Routes>
    </Router>
  );
}; */
