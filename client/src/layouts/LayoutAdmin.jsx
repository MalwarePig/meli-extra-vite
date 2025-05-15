import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { Button } from "semantic-ui-react"; // Componentes de Semantic UI
import "./LayoutAdmin.scss"; // Asegúrate de tener este archivo SCSS

const LayoutAdmin = ({ onAuthChange }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuActive, setmenuActive] = useState("");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    setSharedData(menuActive);

    // Opcional: cleanup para efectos secundarios
    return () => {
      console.log("Cleanup antes del próximo efecto");
    };
  }, [menuActive]); // Solo se ejecuta cuando `contador` cambia

  // Función para actualizar los datos desde los componentes hijos
  const updateSharedData = (newData) => {
    setSharedData((prev) => ({ ...prev, ...newData }));
  };

  const [sharedData, setSharedData] = useState({
    // Aquí defines los datos que quieres compartir
    menuActiv: menuActive,
  });

  function OptionMenu(params) {
    setMenuOpen(!menuOpen);
    if (menuActive == "Perfil") {
      setmenuActive(params);
    } else {
      setmenuActive(params);
    }
  }

  const cerrarSesion = () => { 
    console.log('cerrar sesion');
    localStorage.removeItem("jwt");
    onAuthChange(false); // Actualiza el estado `logged` en App
  };

  return (
    <div className="layout-container-admin">
      {/* Topbar solo visible en móvil */}
      <div className="topbar">
        <div
          className={`menu-toggle ${menuOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <h1 className="app-title">Mi Aplicación</h1>
      </div>

      {/* Sidebar */}
      <aside className={`sidebar ${menuOpen ? "abierto" : ""}`}>
        <h2>Menú</h2>
        <nav>
          <ul>
            <li>
              <Button onClick={() => OptionMenu("Home")}>Inicio</Button>
            </li>
            {/* <li><Button onClick={()=>OptionMenu('Pruebas')}>Pruebas</Button></li> */}
            <li>
              <Button onClick={() => OptionMenu("QR")}>QR</Button>
            </li>
            <li>
              <Button onClick={() => OptionMenu("Activos")}>Activos</Button>
            </li>
            <li>
              <Button onClick={() => OptionMenu("Extras")}>Extras</Button>
            </li>
            <li>
              <Button onClick={() => cerrarSesion()}>Salir</Button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Contenido principal */}
      <div className="main-content-admin">
        <main>
          <Outlet context={{ sharedData, updateSharedData }} />{" "}
          {/* Aquí se renderizarán las páginas */}
        </main>
      </div>
    </div>
  );
};

export default LayoutAdmin;
