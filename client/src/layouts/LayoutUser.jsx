import React, { useState,useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Button } from "semantic-ui-react"; // Componentes de Semantic UI
import './LayoutUser.scss';

const Layout = () => { 

  const [menuAbierto, setMenuAbierto] = useState(false);
  const [menuActive, setmenuActive] = useState('');
  useEffect(() => {
    setSharedData(menuActive)
 
    // Opcional: cleanup para efectos secundarios
    return () => {
      console.log('Cleanup antes del próximo efecto');
    };
  }, [menuActive]); // Solo se ejecuta cuando `contador` cambia


  const toggleMenu = () => setMenuAbierto(!menuAbierto);

  const cerrarMenu = () => setMenuAbierto(false); // Cierra el menú al hacer clic en una opción

  const [sharedData, setSharedData] = useState({
    // Aquí defines los datos que quieres compartir
    menuActiv : menuActive
  });

  // Función para actualizar los datos desde los componentes hijos
  const updateSharedData = (newData) => {
    setSharedData(prev => ({ ...prev, ...newData }));
  };

  function OptionMenu(params) {
     if (menuActive == 'Perfil') {
        setmenuActive(params)
     }else{
      setmenuActive(params)
     }
  }

  return (
    <div className="layout-container">
      {
      /* Barra superior solo visible en móvil */}
      <div className="topbar">
        <div className={`menu-toggle ${menuAbierto ? 'open' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <h1 className="app-title">Mi Aplicación</h1>
      </div>

      {/* Menú lateral */}
      <aside className={`sidebar ${menuAbierto ? 'abierto' : ''}`}>
        <h2>Menú</h2>
        <nav>
          <ul>
            <li><Button onClick={()=>OptionMenu('Perfil')}>Perfil</Button></li>
            <li><Button onClick={()=>OptionMenu('QRS')}>QR'S</Button></li>  
            <li><Link to="/Salir" onClick={cerrarMenu}>Salir</Link></li>
          </ul>
        </nav>
      </aside>

      {/* Contenido principal */}
      <div className="main-content">
        <main>
           {/* Pasa las props al Outlet */}
          <Outlet context={{ sharedData, updateSharedData }} />
        </main> 
      </div>
    </div>
  );
};

export default Layout;
