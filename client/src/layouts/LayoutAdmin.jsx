import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const LayoutAdmin = () => {
  return (
    <div>
      {/* Encabezado */}
      <header>
        <h1>Mi Aplicación administrativa</h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/Extras">Extras</Link></li>
            <li><Link to="/Listas">Listas</Link></li>
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

export default LayoutAdmin;