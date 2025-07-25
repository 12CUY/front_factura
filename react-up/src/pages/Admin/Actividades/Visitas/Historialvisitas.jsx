import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
// Importa los iconos necesarios de react-icons
import { FaTrash, FaInfoCircle, FaSearch, FaTimes } from 'react-icons/fa';

const HistorialV = () => {
  const navigate = useNavigate();
  const [visitas, setVisitas] = useState([]); // Todas las visitas originales
  const [filteredVisitas, setFilteredVisitas] = useState([]); // Visitas después de aplicar filtros
  const [filtro, setFiltro] = useState({
    busqueda: '', // Búsqueda combinada por nombre o número de documento
    tipoDocumento: ''
  });
  const [selectedVisita, setSelectedVisita] = useState(null); // Estado para la visita seleccionada para el modal de detalles

  // Datos de ejemplo - En una aplicación real, esto vendría de una API
  useEffect(() => {
    const datosEjemplo = [
      {
        id: 1,
        nombre: 'Juan Pérez',
        tipoDocumento: 'DNI',
        numeroDocumento: '12345678',
        tipoVisita: 'Diaria',
        fecha: '2023-06-15',
        hora: '08:30',
        observaciones: 'Visita de prueba y primera interacción con el sistema. Todo en orden.'
      },
      {
        id: 2,
        nombre: 'María García',
        tipoDocumento: 'Pasaporte',
        numeroDocumento: 'AB123456',
        tipoVisita: 'Membresía',
        fecha: '2023-06-15',
        hora: '10:15',
        observaciones: 'Cliente frecuente, vino a renovar su membresía anual. Interesada en las nuevas ofertas.'
      },
      {
        id: 3,
        nombre: 'Carlos López',
        tipoDocumento: 'DNI',
        numeroDocumento: '87654321',
        tipoVisita: 'Invitado',
        fecha: '2023-06-14',
        hora: '17:45',
        observaciones: 'Invitado por Juan Pérez para una demostración de producto. Mostró interés en la suscripción.'
      },
      {
        id: 4,
        nombre: 'Ana Rodríguez',
        tipoDocumento: 'Carnet Extranjería',
        numeroDocumento: 'CE123789',
        tipoVisita: 'Evento',
        fecha: '2023-06-13',
        hora: '14:00',
        observaciones: 'Asistente a la conferencia "Innovación 2023". Muy participativa y con buenas preguntas.'
      },
      {
        id: 5,
        nombre: 'Pedro Gómez',
        tipoDocumento: 'DNI',
        numeroDocumento: '98765432',
        tipoVisita: 'Servicio',
        fecha: '2023-06-12',
        hora: '09:00',
        observaciones: 'Visita para mantenimiento de equipo. Problema resuelto satisfactoriamente en 45 minutos.'
      }
    ];
    setVisitas(datosEjemplo);
    setFilteredVisitas(datosEjemplo); // Inicializa la lista filtrada con todos los datos
  }, []);

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltro(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const aplicarFiltros = () => {
    let currentFilteredVisitas = [...visitas]; // Empieza con todas las visitas

    // Filtra por búsqueda general (nombre o número de documento)
    if (filtro.busqueda) {
      const busquedaLower = filtro.busqueda.toLowerCase();
      currentFilteredVisitas = currentFilteredVisitas.filter(visita =>
        visita.nombre.toLowerCase().includes(busquedaLower) ||
        visita.numeroDocumento.toLowerCase().includes(busquedaLower)
      );
    }

    // Filtra por tipo de documento
    if (filtro.tipoDocumento) {
      currentFilteredVisitas = currentFilteredVisitas.filter(visita =>
        visita.tipoDocumento === filtro.tipoDocumento
      );
    }

    setFilteredVisitas(currentFilteredVisitas);

    Swal.fire({
      title: 'Filtros aplicados',
      text: 'Se han aplicado los criterios de búsqueda',
      icon: 'success',
      confirmButtonText: 'Entendido'
    });
  };

  const limpiarFiltros = () => {
    setFiltro({
      busqueda: '',
      tipoDocumento: ''
    });
    setFilteredVisitas(visitas); // Restablece a la lista completa original
    Swal.fire({
      title: 'Filtros limpiados',
      text: 'Se han eliminado los criterios de búsqueda',
      icon: 'info',
      confirmButtonText: 'Entendido'
    });
  };

  const eliminarVisita = (id) => {
    Swal.fire({
      title: '¿Eliminar visita?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Eliminar de ambas listas: la original y la filtrada
        setVisitas(prevVisitas => prevVisitas.filter(visita => visita.id !== id));
        setFilteredVisitas(prevFilteredVisitas => prevFilteredVisitas.filter(visita => visita.id !== id));
        Swal.fire(
          'Eliminada',
          'La visita ha sido eliminada del registro',
          'success'
        );
      }
    });
  };

  const mostrarDetalles = (visita) => {
    setSelectedVisita(visita);
  };

  const cerrarDetalles = () => {
    setSelectedVisita(null);
  };

  return (
    <div
      className="min-h-screen pt-16 bg-gray-50"
      style={{
        backgroundImage: "url('/login.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center sm:text-4xl lg:text-5xl">
          Historial de Visitas
        </h1>

        ---

        {/* Sección de Filtros */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Filtrar visitas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <label htmlFor="busqueda" className="block text-sm font-medium text-gray-700 mb-1">
                Buscar por Nombre o Documento
              </label>
              <input
                type="text"
                id="busqueda"
                name="busqueda"
                value={filtro.busqueda}
                onChange={handleFiltroChange}
                placeholder="Ej. Juan Pérez o 12345678"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg pr-10 focus:ring-blue-500 focus:border-blue-500"
              />
              <FaSearch className="absolute right-3 top-9 text-gray-400" /> {/* Ícono de búsqueda */}
            </div>
            <div>
              <label htmlFor="tipoDocumento" className="block text-sm font-medium text-gray-700 mb-1">
                Tipo documento
              </label>
              <select
                id="tipoDocumento"
                name="tipoDocumento"
                value={filtro.tipoDocumento}
                onChange={handleFiltroChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Todos</option>
                <option value="DNI">DNI</option>
                <option value="Pasaporte">Pasaporte</option>
                <option value="Carnet Extranjería">Carnet Extranjería</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 mt-6">
            <button
              onClick={limpiarFiltros}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200 ease-in-out"
            >
              <FaTimes className="inline-block mr-2" /> Limpiar
            </button>
            <button
              onClick={aplicarFiltros}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out"
            >
              <FaSearch className="inline-block mr-2" /> Aplicar filtros
            </button>
          </div>
        </div>

        ---

        {/* Tabla de visitas */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documento</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo visita</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hora</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredVisitas.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      No hay visitas que coincidan con los filtros aplicados.
                    </td>
                  </tr>
                ) : (
                  filteredVisitas.map((visita) => (
                    <tr key={visita.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(visita.fecha).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {visita.nombre}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {visita.tipoDocumento}: {visita.numeroDocumento}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {visita.tipoVisita}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {visita.hora}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        {/* Botón de Eliminar con icono */}
                        <button
                          onClick={() => eliminarVisita(visita.id)}
                          className="text-red-600 hover:text-red-800 mx-1 p-2 rounded-full hover:bg-red-100 transition duration-200 ease-in-out"
                          aria-label="Eliminar visita"
                          title="Eliminar visita"
                        >
                          <FaTrash size={18} />
                        </button>
                        {/* Botón de Detalles con icono */}
                        <button
                          onClick={() => mostrarDetalles(visita)}
                          className="text-blue-600 hover:text-blue-800 mx-1 p-2 rounded-full hover:bg-blue-100 transition duration-200 ease-in-out"
                          aria-label="Ver detalles de la visita"
                          title="Ver detalles de la visita"
                        >
                          <FaInfoCircle size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        ---

        {/* Botón de volver */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out text-lg font-medium"
          >
            Volver al Panel
          </button>
        </div>
      </div>

      {/* Modal de Detalles */}
      {selectedVisita && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-auto relative transform transition-all sm:my-8 sm:w-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">Detalles de la Visita</h2>
            <div className="space-y-3 text-gray-700 text-base">
              <p><strong>Fecha:</strong> {new Date(selectedVisita.fecha).toLocaleDateString()}</p>
              <p><strong>Hora:</strong> {selectedVisita.hora}</p>
              <p><strong>Nombre:</strong> {selectedVisita.nombre}</p>
              <p><strong>Documento:</strong> {selectedVisita.tipoDocumento} - {selectedVisita.numeroDocumento}</p>
              <p><strong>Tipo de Visita:</strong> {selectedVisita.tipoVisita}</p>
              <p>
                <strong>Observaciones:</strong> <br />
                <span className="block mt-1 text-sm bg-gray-50 p-3 rounded-lg border border-gray-200">
                  {selectedVisita.observaciones || 'No hay observaciones.'}
                </span>
              </p>
            </div>
            <div className="mt-6 text-right">
              <button
                onClick={cerrarDetalles}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistorialV;