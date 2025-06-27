// src/pages/Admin/ClientListPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const ClientListPage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Cantidad de clientes por página (tarjetas)

  const [clients, setClients] = useState([
    { id: 1, firstName: 'Ana María', lastName: 'Gómez Pérez', email: 'ana.gomez@example.com', phone: '+593 99 123 4567', isEnabled: true, ruc: '1792123456001', identification: '1712345678' },
    { id: 2, firstName: 'Roberto Carlos', lastName: 'Díaz Castro', email: 'roberto.diaz@example.com', phone: '+593 98 765 4321', isEnabled: false, ruc: '0992345678001', identification: '0987654321' },
    { id: 3, firstName: 'Luisa Fernanda', lastName: 'Rojas Mora', email: 'luisa.rojas@example.com', phone: '+593 97 111 2233', isEnabled: true, ruc: '0193456789001', identification: '0123456789' },
    { id: 4, firstName: 'Javier Andrés', lastName: 'Flores Sánchez', email: 'javier.flores@example.com', phone: '+593 96 444 5566', isEnabled: true, ruc: '0994567890001', identification: '0998765432' },
    { id: 5, firstName: 'Sofía Isabel', lastName: 'Morales Vera', email: 'sofia.morales@example.com', phone: '+593 95 777 8899', isEnabled: false, ruc: '1795678901001', identification: '1776543210' },
    { id: 6, firstName: 'Diego Alejandro', lastName: 'Castro López', email: 'diego.castro@example.com', phone: '+593 94 000 1122', isEnabled: true, ruc: '1796789012001', identification: '1710987654' },
    { id: 7, firstName: 'Valeria Nicole', lastName: 'Pérez Torres', email: 'valeria.perez@example.com', phone: '+593 93 333 4455', isEnabled: true, ruc: '0997890123001', identification: '0921098765' },
    { id: 8, firstName: 'Pablo Andrés', lastName: 'Ramírez Quiroz', email: 'pablo.ramirez@example.com', phone: '+593 92 111 2233', isEnabled: false, ruc: '1198901234001', identification: '1132109876' },
    { id: 9, firstName: 'María José', lastName: 'Vargas Silva', email: 'maria.vargas@example.com', phone: '+593 91 555 6677', isEnabled: true, ruc: '1799012345001', identification: '1743210987' },
    { id: 10, firstName: 'Carlos David', lastName: 'Ruiz Ortiz', email: 'carlos.ruiz@example.com', phone: '+593 90 888 9900', isEnabled: true, ruc: '0990123456001', identification: '0954321098' },
    { id: 11, firstName: 'Gabriela Estefanía', lastName: 'Nuñez Poveda', email: 'gabriela.nunez@example.com', phone: '+593 99 111 2233', isEnabled: false, ruc: '2491234567001', identification: '2465432109' },
    { id: 12, firstName: 'Juan Fernando', lastName: 'Mendoza Ponce', email: 'juan.mendoza@example.com', phone: '+593 98 777 6655', isEnabled: true, ruc: '1392345678001', identification: '1376543210' },
  ]);

  useEffect(() => {
    const pageLoadTimer = setTimeout(() => {
      setIsVisible(true);
      setLoading(false);
    }, 1200);

    return () => clearTimeout(pageLoadTimer);
  }, []);

  const filteredClients = clients.filter(client =>
    `${client.firstName} ${client.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.ruc.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.identification.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentClients = filteredClients.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEditClient = (clientId) => {
    console.log(`Editar cliente con ID: ${clientId}`);
    // navigate(`/admin/clientes/editar/${clientId}`);
  };

  const handleDeleteClient = (clientId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este cliente? Esta acción no se puede deshacer.')) {
      setClients(clients.filter(client => client.id !== clientId));
      console.log(`Cliente con ID ${clientId} eliminado.`);
      if (currentClients.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  const ClientCard = ({ client, index, onEdit, onDelete, isVisible }) => (
    <div
      key={client.id}
      className={`
        p-6 mb-4
        bg-gris-frio-claro/90  /* CAMBIO AQUÍ: Ahora 90% de opacidad, o simplemente 'bg-gris-frio-claro' para 100% */
        rounded-2xl          /* Bordes más redondeados */
        shadow-lg            /* Sombra más pronunciada */
        transform transition-all duration-700 ease-out origin-center relative
        ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 scale-95'}
        animate-fadeInUpExt
      `}
      style={{ animationDelay: `${index * 0.1 + (isVisible ? 0.3 : 0)}s` }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h3 className="text-xl font-semibold text-azul-oscuro-metalico">
          {client.firstName} {client.lastName}
          <span className="text-sm font-normal text-gray-600 ml-2">(ID: {client.id})</span>
        </h3>
        {/* Contenedor de botones: Apilado en columna */}
        <div className="flex flex-col space-y-2 mt-2 sm:mt-0">
          <button
            onClick={() => onEdit(client.id)}
            className="bg-azul-agua text-blanco-puro px-4 py-2 rounded-lg transition-all duration-300 ease-in-out font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-azul-agua focus:ring-opacity-75 relative overflow-hidden group text-sm"
            title="Editar cliente"
          >
            Editar
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
          </button>
          <button
            onClick={() => onDelete(client.id)}
            className="bg-red-500 text-blanco-puro px-4 py-2 rounded-lg transition-all duration-300 ease-in-out font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 relative overflow-hidden group text-sm"
            title="Eliminar cliente"
          >
            Eliminar
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
          </button>
        </div>
      </div>
      <div className="space-y-2 text-gray-800">
        <p><span className="font-medium text-azul-oscuro-metalico">Estado:</span>
          <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${client.isEnabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {client.isEnabled ? 'Habilitado' : 'No Habilitado'}
          </span>
        </p>
        <p><span className="font-medium text-azul-oscuro-metalico">Cédula:</span> {client.identification}</p>
        <p><span className="font-medium text-azul-oscuro-metalico">RUC:</span> {client.ruc}</p>
        <p>
          <span className="font-medium text-azul-oscuro-metalico">Correo:</span>
          <a href={`mailto:${client.email}`} className="text-azul-oscuro-metalico hover:text-azul-agua no-underline">
            {client.email}
          </a>
        </p>
        <p><span className="font-medium text-azul-oscuro-metalico">Teléfono:</span> {client.phone}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-creacion-cliente flex flex-col items-center py-16 px-4 sm:px-8 lg:px-12 relative overflow-hidden">
      {/* Elementos decorativos de fondo para un toque único (animaciones tipo blob) */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-azul-celeste-claro rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blobOne z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-azul-agua rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blobTwo z-0"></div>

      {/* Título principal con los colores especificados */}
      <h1 className="text-5xl font-extrabold mb-14 mt-6 text-azul-oscuro-metalico drop-shadow-xl animate-fadeInDownExt text-center w-full">
        Gestión de Clientes
      </h1>

      {/* Barra de búsqueda centrada y estilizada */}
      <div className="max-w-xl w-full mb-10 animate-slideInFromLeftExt px-4 sm:px-0">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar cliente..."
            className="mt-1 block w-full pl-12 pr-4 py-3 text-base border-2 border-azul-celeste-claro focus:outline-none focus:ring-azul-agua focus:border-azul-agua sm:text-lg rounded-full bg-gris-frio-claro/70 placeholder-gray-600 transition-all duration-300 ease-in-out shadow-md animate-pulseSearch"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <i className="fas fa-search text-gray-700 text-xl"></i>
          </div>
        </div>
      </div>

      {/* Contenido condicional: Spinner de carga o las tarjetas de clientes */}
      {loading ? (
        <div className="flex flex-col justify-center items-center h-96 w-full max-w-7xl">
          <div className="animate-spinSlow rounded-full h-40 w-40 border-t-4 border-b-4 border-azul-agua"></div>
          <p className="mt-8 text-azul-oscuro-metalico text-3xl font-semibold animate-pulse">Cargando datos de clientes...</p>
        </div>
      ) : (
        <>
          {filteredClients.length > 0 ? (
            // Contenedor Grid para las tarjetas de clientes
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeInUpExt w-full max-w-7xl px-4 sm:px-0">
              {currentClients.map((client, index) => (
                <ClientCard
                  key={client.id}
                  client={client}
                  index={index}
                  onEdit={handleEditClient}
                  onDelete={handleDeleteClient}
                  isVisible={isVisible}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-600 text-xl font-semibold w-full max-w-7xl">
              <p className="mb-4">No se encontraron clientes que coincidan con la búsqueda.</p>
              <p>Intenta con otro término o <span className="text-azul-agua cursor-pointer hover:underline" onClick={() => setSearchTerm('')}>limpia la búsqueda</span>.</p>
            </div>
          )}

          {/* Controles de Paginación mejorados con los colores */}
          {filteredClients.length > itemsPerPage && (
            <nav className="mt-12 flex justify-center animate-fadeInUpExt w-full max-w-7xl" aria-label="Pagination">
              <ul className="flex items-center space-x-2">
                <li>
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-6 py-3 leading-tight border border-gray-300 rounded-xl transition-all duration-300 ease-in-out shadow-md
                               ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-azul-agua hover:text-blanco-puro hover:shadow-lg'}`}
                  >
                    Anterior
                  </button>
                </li>
                {[...Array(totalPages).keys()].map((number) => (
                  <li key={number}>
                    <button
                      onClick={() => paginate(number + 1)}
                      className={`px-6 py-3 leading-tight border border-gray-300 rounded-xl transition-all duration-300 ease-in-out shadow-md
                                 ${currentPage === number + 1 ? 'bg-azul-agua text-blanco-puro shadow-lg' : 'bg-white text-gray-700 hover:bg-azul-agua hover:text-blanco-puro hover:shadow-lg'}`}
                    >
                      {number + 1}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-6 py-3 leading-tight border border-gray-300 rounded-xl transition-all duration-300 ease-in-out shadow-md
                               ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-azul-agua hover:text-blanco-puro hover:shadow-lg'}`}
                  >
                    Siguiente
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </>
      )}
    </div>
  );
};

export default ClientListPage;