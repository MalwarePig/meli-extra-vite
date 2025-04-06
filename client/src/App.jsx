import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Layout from './layouts/LayoutUser';
import LayoutAdmin from './layouts/LayoutAdmin';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Perfil from './pages/Perfil/Perfil';
import Admin from './pages/Admin/Admin';
import './App.css'

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Envuelve todas las rutas con el layout */}
        <Route path="/">
          <Route index element={<Login />} /> {/* Ruta principal */}
        </Route>

        <Route element={<Layout />}>
          <Route element={<Home />} />
          <Route path="contact" element={<Perfil />} /> 
        </Route>

        {/* Rutas con LayoutAdmin */}
        <Route element={<LayoutAdmin />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;


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
