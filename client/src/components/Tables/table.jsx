import React, { useState, useMemo } from "react";
import "./table.scss";
// Componente principal de tabla con filtrado y ordenamiento
// Props:
// - data: Array de objetos con los datos a mostrar
// - columns: Configuración de columnas (header, accessor, sortable, etc.)
// - defaultSortField: Campo por defecto para ordenar
// - defaultSortDirection: Dirección inicial del ordenamiento (asc/desc)
// - pageSize: Cantidad de filas por página
const TableWithFilterAndSort = ({
  data,
  /* columns,
  defaultSortField = null,
  defaultSortDirection = "asc",
  pageSize = 10, */
}) => {

  const defaultSortField="name" ;//ORdenamiento por default
  const defaultSortDirection = "asc";//Orden ascendente
  const pageSize= 5;


  console.log('data')
  console.log(data)

  //Data para la tabla
/*   var data = [
    { id: 1702861, name: "Juan", celphone: 2856685231, plates: "ASD456", model:'Gol 2020',eta: '13:30',state: 'Vencido'},
    { id: 2655654, name: "María", celphone: 3651618152, plates: "FSD654", model:'Beat 2018',eta: '15:30',state: 'Activo'},
    { id: 3546544, name: "Carlos", celphone: 2545654456, plates: "QEW645", model:'Sonic 2015',eta: '16:40',state: 'Activo'},
    // ... más datos
  ]; */

  //Columnas de la tabla
  const columns = [
    {
      Header: "idDriver",
      accessor: "id",
      //sortable: false // Este campo no será ordenable
    },
    {
      Header: "Nombre",
      accessor: "name",
    },
    {
      Header: "Celular",
      accessor: "celphone",
    },
    {
      Header: "Placas",
      accessor: "plates",
    },
    {
      Header: "Model",
      accessor: "model",
    },
    {
      Header: "ETA",
      accessor: "eta",
    },
    {
      Header: "Estado",
      accessor: "state",
    },

    /* {
      Header: "Email",
      accessor: "email",
      Cell: ({ email }) => <a href={`mailto:${email}`}>{email}</a>,
    }, */
  ];


  // Estado para la configuración de ordenamiento:
  // - key: campo por el que se ordena
  // - direction: dirección (ascendente/descendente)
  const [sortConfig, setSortConfig] = useState({
    key: defaultSortField,
    direction: defaultSortDirection,
  });

  // Estado para el valor del input de filtrado
  const [filterInput, setFilterInput] = useState("");

  // Estado para la página actual en la paginación
  const [currentPage, setCurrentPage] = useState(1);

  // Manejador de cambio en el input de filtrado:
  // - Actualiza el estado del filtro
  // - Reinicia a la página 1 para que el usuario vea resultados desde el inicio
  const handleFilterChange = (e) => {
    setFilterInput(e.target.value);
    setCurrentPage(1); // Resetear a la primera página al filtrar
  };

  // Función para cambiar el ordenamiento cuando se hace clic en un encabezado:
  // - Si ya está ordenado por ese campo, alterna la dirección
  // - Si es un campo nuevo, ordena ascendentemente por defecto
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Memorización de los datos filtrados y ordenados para mejorar rendimiento:
  // - Solo se recalcula cuando cambian data, filterInput, sortConfig o columns
  const filteredAndSortedData = useMemo(() => {
    // Copia los datos originales para no mutar el array original
    let filteredData = [...data];

    // Aplicar filtro si hay texto en el input de filtrado:
    // - Busca en todas las columnas que sean "filtrables" por defecto
    // - Convierte todo a minúsculas para hacer la búsqueda case-insensitive
    if (filterInput) {
      filteredData = filteredData.filter((item) =>
        columns.some((column) => {
          const value = item[column.accessor];
          return (
            value &&
            value.toString().toLowerCase().includes(filterInput.toLowerCase())
          );
        })
      );
    }

    // Aplicar ordenamiento si hay un campo configurado para ordenar:
    // - Compara los valores y ordena según la dirección (asc/desc)
    if (sortConfig.key) {
      filteredData.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0; // Si son iguales, no cambia el orden
      });
    }

    return filteredData;
  }, [data, filterInput, sortConfig, columns]);

  // Cálculo de paginación:
  // - totalPages: calcula el número total de páginas según el tamaño de página
  // - paginatedData: obtiene solo los datos de la página actual
  const totalPages = Math.ceil(filteredAndSortedData.length / pageSize);
  const paginatedData = filteredAndSortedData.slice(
    (currentPage - 1) * pageSize, // Índice de inicio
    currentPage * pageSize // Índice de fin
  );

  // Renderizado del componente:
  return (
    <div className="table-container">
      {/* Controles superiores: filtro y paginación */}
      <div className="table-controls">
        {/* Input de filtrado */}
        <input
          type="text"
          placeholder="Filtrar..."
          value={filterInput}
          onChange={handleFilterChange}
          className="filter-input"
        />

        {/* Controles de paginación */}
        <div className="pagination-controls">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Siguiente
          </button>
        </div>
      </div>

      {/* Tabla de datos */}
      <table className="data-table">
        {/* Encabezados de la tabla */}
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.accessor} // Identificador único para la columna
                onClick={() =>
                  column.sortable !== false && requestSort(column.accessor)
                } // Solo ordenable si no está deshabilitado
                className={column.sortable !== false ? "sortable" : ""} // Clase CSS para indicar que es ordenable
              >
                {/* Nombre de la columna */}
                {column.Header}

                {/* Indicador visual de ordenamiento (flecha) */}
                {sortConfig.key === column.accessor && (
                  <span className="sort-icon">
                    {sortConfig.direction === "asc" ? " ↑" : " ↓"}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>

        {/* Cuerpo de la tabla */}
        <tbody>
          {/* Verifica si hay datos para mostrar */}
          {paginatedData.length > 0 ? (
            // Mapea cada fila de datos
            paginatedData.map((row, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td key={column.accessor}>
                    {/* Renderizado personalizado de celda si se especifica, sino muestra el valor directo */}
                    {column.Cell ? column.Cell(row) : row[column.accessor]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            // Mensaje cuando no hay resultados
            <tr>
              <td colSpan={columns.length} className="no-data">
                No se encontraron resultados
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableWithFilterAndSort;
