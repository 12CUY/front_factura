import  { useState, useEffect } from 'react';
//import { useNavigate } from 'react-router-dom';
import { FiSearch, FiFilter, FiDownload, FiPrinter, FiEye, FiClock, FiCheckCircle, FiXCircle } from 'react-icons/fi';

const HistorialC = () => {
  //const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const itemsPerPage = 8;

  const [history] = useState([
    { 
      id: 1, 
      clientId: 1, 
      clientName: 'Ana María Gómez Pérez', 
      action: 'Creación de cuenta', 
      date: '2023-05-15 09:30', 
      details: 'Cliente registrado en el sistema', 
      status: 'Completado',
      user: 'admin'
    },
    { 
      id: 2, 
      clientId: 2, 
      clientName: 'Roberto Carlos Díaz Castro', 
      action: 'Actualización de datos', 
      date: '2023-05-16 14:15', 
      details: 'Cambio de dirección y teléfono', 
      status: 'Completado',
      user: 'asesor1'
    },
    { 
      id: 3, 
      clientId: 3, 
      clientName: 'Luisa Fernanda Rojas Mora', 
      action: 'Cambio de estado', 
      date: '2023-05-17 11:45', 
      details: 'Cliente desactivado temporalmente', 
      status: 'Pendiente',
      user: 'supervisor'
    },
    { 
      id: 4, 
      clientId: 4, 
      clientName: 'Javier Andrés Flores Sánchez', 
      action: 'Documentación subida', 
      date: '2023-05-18 16:20', 
      details: 'Copia de cédula y RUC actualizados', 
      status: 'Completado',
      user: 'asesor2'
    },
    { 
      id: 5, 
      clientId: 5, 
      clientName: 'Sofía Isabel Morales Vera', 
      action: 'Eliminación de registros', 
      date: '2023-05-19 10:05', 
      details: 'Borrado de datos personales por solicitud', 
      status: 'Fallido',
      user: 'admin'
    },
    { 
      id: 6, 
      clientId: 6, 
      clientName: 'Diego Alejandro Castro López', 
      action: 'Renovación de membresía', 
      date: '2023-05-20 13:30', 
      details: 'Membresía premium renovada por 1 año', 
      status: 'Completado',
      user: 'asesor1'
    },
    { 
      id: 7, 
      clientId: 7, 
      clientName: 'Valeria Nicole Pérez Torres', 
      action: 'Cambio de categoría', 
      date: '2023-05-21 15:45', 
      details: 'Actualizado a cliente corporativo', 
      status: 'Completado',
      user: 'supervisor'
    },
    { 
      id: 8, 
      clientId: 8, 
      clientName: 'Pablo Andrés Ramírez Quiroz', 
      action: 'Notificación enviada', 
      date: '2023-05-22 08:20', 
      details: 'Recordatorio de pago enviado por email', 
      status: 'Completado',
      user: 'sistema'
    },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredHistory = history
  .filter(item =>
    item.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.user.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .filter(item =>
    selectedFilter === 'all' || item.status.toLowerCase() === selectedFilter.toLowerCase()
  );

  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);
  const currentItems = filteredHistory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusIcon = (status) => {
    switch(status.toLowerCase()) {
      case 'completado':
        return <FiCheckCircle className="text-green-500" />;
      case 'pendiente':
        return <FiClock className="text-yellow-500" />;
      case 'fallido':
        return <FiXCircle className="text-red-500" />;
      default:
        return <FiEye className="text-blue-500" />;
    }
  };

  return (
    <div 
      className="min-h-screen pt-16"
      style={{
        backgroundImage: "url('/login.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed"
      }}
    >
      <div className="absolute inset-0 bg-black/10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="mb-8 text-center lg:text-left">
          <h1 className="text-3xl font-bold text-gray-900">
            Historial Completo de Clientes
          </h1>
          <p className="text-gray-600 mt-2">
            Todos los procesos y cambios registrados en el sistema
          </p>
        </div>

        {/* Filtros y búsqueda */}
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar en historial..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiFilter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                className="block pl-10 pr-10 py-2 border border-gray-300 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="all">Todos los estados</option>
                <option value="completado">Completados</option>
                <option value="pendiente">Pendientes</option>
                <option value="fallido">Fallidos</option>
              </select>
            </div>

            <button className="flex items-center gap-2 px-4 py-2 bg-white/80 border border-gray-300 rounded-lg hover:bg-gray-50">
              <FiDownload className="h-5 w-5 text-gray-600" />
              <span>Exportar</span>
            </button>

            <button className="flex items-center gap-2 px-4 py-2 bg-white/80 border border-gray-300 rounded-lg hover:bg-gray-50">
              <FiPrinter className="h-5 w-5 text-gray-600" />
              <span>Imprimir</span>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {filteredHistory.length > 0 ? (
              <>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50/80">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acción</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detalles</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {currentItems.map((item, index) => (
                          <tr 
                            key={item.id}
                            className={`hover:bg-gray-50 transition-colors ${
                              isVisible ? 'opacity-100' : 'opacity-0'
                            }`}
                            style={{
                              transitionDelay: `${index * 50}ms`,
                            }}
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{item.clientName}</div>
                              <div className="text-sm text-gray-500">ID: {item.clientId}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{item.action}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-900 max-w-xs truncate">{item.details}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{item.date}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                {item.user}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                {getStatusIcon(item.status)}
                                <span className="ml-2 text-sm text-gray-500 capitalize">{item.status}</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {totalPages > 1 && (
                  <div className="mt-6 flex justify-between items-center bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg px-6 py-4">
                    <div className="text-sm text-gray-700">
                      Mostrando <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> a{' '}
                      <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredHistory.length)}</span> de{' '}
                      <span className="font-medium">{filteredHistory.length}</span> resultados
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 border rounded-lg ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white hover:bg-gray-50'}`}
                      >
                        Anterior
                      </button>
                      <button
                        onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 border rounded-lg ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white hover:bg-gray-50'}`}
                      >
                        Siguiente
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12 bg-white/80 rounded-2xl shadow">
                <p className="text-gray-600">No se encontraron registros en el historial</p>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedFilter('all');
                  }}
                  className="mt-4 text-blue-600 hover:text-blue-800"
                >
                  Limpiar filtros
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HistorialC;