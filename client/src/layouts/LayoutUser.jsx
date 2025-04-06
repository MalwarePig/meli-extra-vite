import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      {/* Encabezado */}
      <header>
        <h1>Mi Aplicación dentro del principal</h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/Login">Login</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/admin">admin</Link></li>
          </ul>
        </nav>
      </header>

      {/* Contenido de la página */}
      <main>
        <Outlet /> {/* Aquí se renderizarán las páginas */}
      </main>

      {/* Pie de página */}
      <footer>
        <p>© 2023 Mi Aplicación</p>
      </footer>
    </div>
  );
};

export default Layout;