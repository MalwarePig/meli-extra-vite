import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LayoutUser from '../layouts/LayoutUser';
import LayoutAdmin from '../layouts/LayoutAdmin'; 
import Login from '../pages/Login/Login';
import Perfil from '../pages/Perfil/Perfil';
import Admin from '../pages/Admin/Admin';  
import '../index.scss';

// Definimos el componente Navigation
export default function Navigation() {
  return (
    <Router>
      <Routes>
        {/* Envuelve todas las rutas con el layout */}
        <Route path="/">{/* Ruta principal */}
          <Route index element={  <Login/> } /> 
        </Route>

        <Route element={<LayoutUser />}> 
          <Route path="Perfil" element={<Perfil />} /> 
        </Route>

        {/* Rutas con LayoutAdmin */}
        <Route element={<LayoutAdmin />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </Router>
  );
};
 








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