// src/components/GestionarVisita.jsx
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { FaSave, FaTimesCircle, FaEdit, FaTrash, FaEye, FaPlus, FaSearch } from 'react-icons/fa';

const GestionarVisita = () => {
  // Estado para almacenar las visitas en localStorage
  const [visitas, setVisitas] = useState(() => {
    const savedVisitas = localStorage.getItem('visitas');
    return savedVisitas ? JSON.parse(savedVisitas) : [];
  });
  
  const [loading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [visitasPerPage] = useState(10);
  const [modalAction, setModalAction] = useState('create');
  const [currentVisitaId, setCurrentVisitaId] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  // Obtener la fecha actual en formato YYYY-MM-DD
  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const initialDate = getCurrentDate();

  const [formData, setFormData] = useState({
    nombre: '',
    tipoDocumento: 'DNI',
    numeroDocumento: '',
    tipoVisita: 'Diaria',
    fecha: initialDate,
    observaciones: ''
  });

  const tiposDocumento = ['DNI', 'Pasaporte', 'Carnet Extranjería'];
  const tiposVisita = ['Diaria', 'Membresía', 'Invitado', 'Evento Especial'];

  // Efecto para guardar en localStorage cuando cambian las visitas
  useEffect(() => {
    localStorage.setItem('visitas', JSON.stringify(visitas));
  }, [visitas]);

  // Validación del formulario
  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!formData.nombre.trim()) {
      errors.nombre = 'El nombre es requerido';
      isValid = false;
    }

    if (!formData.numeroDocumento.trim()) {
      errors.numeroDocumento = 'El número de documento es requerido';
      isValid = false;
    } else if (!/^[0-9]+$/.test(formData.numeroDocumento)) {
      errors.numeroDocumento = 'Solo se permiten números';
      isValid = false;
    }

    if (!formData.fecha) {
      errors.fecha = 'La fecha es requerida';
      isValid = false;
    } else {
      const selectedDate = new Date(formData.fecha);
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

      if (selectedDate > currentDate) {
        errors.fecha = 'La fecha no puede ser futura';
        isValid = false;
      }
    }

    setFormErrors(errors);
    return isValid;
  };

  // Manejar búsqueda con debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const filteredVisitas = visitas.filter(visita => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      visita.nombre.toLowerCase().includes(searchTermLower) ||
      visita.numeroDocumento.toLowerCase().includes(searchTermLower) ||
      visita.tipoVisita.toLowerCase().includes(searchTermLower)
    );
  });

  // Lógica de paginación
  const indexOfLastVisita = currentPage * visitasPerPage;
  const indexOfFirstVisita = indexOfLastVisita - visitasPerPage;
  const currentVisitas = filteredVisitas.slice(indexOfFirstVisita, indexOfLastVisita);
  const totalPages = Math.ceil(filteredVisitas.length / visitasPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Manejar cambios en el formulario con validación
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpiar error cuando el campo es editado
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  // Resetear formulario
  const resetForm = () => {
    setFormData({
      nombre: '',
      tipoDocumento: 'DNI',
      numeroDocumento: '',
      tipoVisita: 'Diaria',
      fecha: getCurrentDate(),
      observaciones: ''
    });
    setFormErrors({});
  };

  // Generar ID único
  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  // Abrir modal para crear nueva visita
  const openCreateModal = () => {
    resetForm();
    setModalAction('create');
    setShowModal(true);
  };

  // Abrir modal para editar visita
  const openEditModal = (visita) => {
    setFormData({
      nombre: visita.nombre,
      tipoDocumento: visita.tipoDocumento,
      numeroDocumento: visita.numeroDocumento,
      tipoVisita: visita.tipoVisita,
      fecha: visita.fecha.split('T')[0],
      observaciones: visita.observaciones || ''
    });

    setCurrentVisitaId(visita.id);
    setModalAction('edit');
    setShowModal(true);
    setFormErrors({});
  };

  // Mostrar animación de éxito
  const showSuccess = () => {
    setShowSuccessAnimation(true);
    setTimeout(() => {
      setShowSuccessAnimation(false);
    }, 2000);
  };

  // Manejar envío de formulario (crear y actualizar)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const visitaData = {
      id: modalAction === 'create' ? generateId() : currentVisitaId,
      nombre: formData.nombre.trim(),
      tipoDocumento: formData.tipoDocumento,
      numeroDocumento: formData.numeroDocumento.trim(),
      tipoVisita: formData.tipoVisita,
      fecha: formData.fecha,
      observaciones: formData.observaciones.trim(),
      estado: 'activa',
      fechaCreacion: new Date().toISOString()
    };

    try {
      if (modalAction === 'create') {
        // Crear nueva visita
        setVisitas(prev => [...prev, visitaData]);
        await Swal.fire({
          title: '¡Éxito!',
          text: 'Visita creada correctamente',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        });
        showSuccess();
      } else {
        // Actualizar visita existente
        setVisitas(prev => 
          prev.map(visita => 
            visita.id === currentVisitaId ? visitaData : visita
          )
        );
        await Swal.fire({
          title: '¡Éxito!',
          text: 'Visita actualizada correctamente',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        });
        showSuccess();
      }

      setShowModal(false);
      resetForm();

    } catch (error) {
      console.error('Error al procesar la visita:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo completar la acción',
        icon: 'error'
      });
    }
  };

  // Manejar eliminación de visita con confirmación
  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: "¡Esta acción no se puede deshacer!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        customClass: {
          popup: 'animate__animated animate__fadeIn'
        }
      });

      if (result.isConfirmed) {
        // Eliminar visita
        setVisitas(prev => prev.filter(visita => visita.id !== id));
        await Swal.fire({
          title: '¡Eliminado!',
          text: 'La visita ha sido eliminada correctamente.',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        });
        showSuccess();
      }
    } catch (error) {
      console.error('Error al eliminar visita:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo eliminar la visita',
        icon: 'error'
      });
    }
  };

  // Ver detalles de la visita en un modal
  const viewVisitaDetails = (visita) => {
    const fecha = new Date(visita.fecha);
    const fechaFormateada = fecha.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const fechaCreacion = new Date(visita.fechaCreacion);
    const fechaCreacionFormateada = fechaCreacion.toLocaleString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    Swal.fire({
      title: 'Detalles de la Visita',
      html: `
        <div class="text-left space-y-2">
          <p><strong>Nombre:</strong> ${visita.nombre}</p>
          <p><strong>Tipo Documento:</strong> ${visita.tipoDocumento}</p>
          <p><strong>Número Documento:</strong> ${visita.numeroDocumento}</p>
          <p><strong>Tipo Visita:</strong> ${visita.tipoVisita}</p>
          <p><strong>Fecha de Visita:</strong> ${fechaFormateada}</p>
          <p><strong>Fecha de Registro:</strong> ${fechaCreacionFormateada}</p>
          <p><strong>Observaciones:</strong> ${visita.observaciones || 'Ninguna'}</p>
          <p><strong>Estado:</strong> <span class="${visita.estado === 'activa' ? 'text-green-600' : 'text-red-600'}">${visita.estado}</span></p>
        </div>
      `,
      confirmButtonText: 'Cerrar',
      customClass: {
        popup: 'rounded-lg animate__animated animate__fadeIn'
      },
      background: '#f8fafc',
      backdrop: `
        rgba(0,0,123,0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `
    });
  };

  // Formatear fecha para mostrar
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50 bg-cover bg-center bg-fixed" style={{
      backgroundImage: "url('/gimnasio_actividades.jpg')"
    }}>
      {/* Animación de éxito */}
      {showSuccessAnimation && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="animate-bounce bg-green-500 text-white p-4 rounded-full shadow-xl">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center sm:text-4xl lg:text-5xl animate__animated animate__fadeInDown">
          Gestión de Visitas
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 animate__animated animate__fadeIn">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="relative w-full md:w-1/2">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar por nombre, documento o tipo..."
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={openCreateModal}
              className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center shadow-md hover:scale-105 transform duration-300"
            >
              <FaPlus className="inline-block mr-2" /> Nueva Visita
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documento</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo Visita</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentVisitas.length > 0 ? (
                      currentVisitas.map((visita) => (
                        <tr key={visita.id} className="hover:bg-gray-50 transition-colors duration-200">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{visita.nombre}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              <span className="font-medium">{visita.tipoDocumento}:</span> {visita.numeroDocumento}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{visita.tipoVisita}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {formatDate(visita.fecha)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                              ${visita.estado === 'activa' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {visita.estado}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-3">
                              <button
                                onClick={() => viewVisitaDetails(visita)}
                                className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50 transition-colors duration-200"
                                title="Ver detalles"
                              >
                                <FaEye className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => openEditModal(visita)}
                                className="text-yellow-600 hover:text-yellow-900 p-1 rounded-full hover:bg-yellow-50 transition-colors duration-200"
                                title="Editar"
                              >
                                <FaEdit className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => handleDelete(visita.id)}
                                className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50 transition-colors duration-200"
                                title="Eliminar"
                              >
                                <FaTrash className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                          {searchTerm ? 'No se encontraron visitas que coincidan con la búsqueda' : 'No hay visitas registradas'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Paginación */}
              {filteredVisitas.length > visitasPerPage && (
                <div className="flex justify-between items-center mt-6 animate__animated animate__fadeIn">
                  <div className="text-sm text-gray-500">
                    Mostrando {indexOfFirstVisita + 1}-{Math.min(indexOfLastVisita, filteredVisitas.length)} de {filteredVisitas.length} visitas
                  </div>
                  <nav className="inline-flex rounded-md shadow">
                    <button
                      onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                      disabled={currentPage === 1}
                      className="px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      Anterior
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`px-4 py-2 border-t border-b border-gray-300 text-sm font-medium ${currentPage === number
                          ? 'bg-blue-50 text-blue-600 border-blue-500'
                          : 'bg-white text-gray-700 hover:bg-gray-50'} transition-colors duration-200`}
                      >
                        {number}
                      </button>
                    ))}
                    <button
                      onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      Siguiente
                    </button>
                  </nav>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modal para crear/editar visitas */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate__animated animate__fadeIn">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {modalAction === 'create' ? 'Registrar Nueva Visita' : 'Editar Visita'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo*</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${formErrors.nombre ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200`}
                    required
                  />
                  {formErrors.nombre && (
                    <p className="mt-1 text-sm text-red-600 animate__animated animate__fadeIn">{formErrors.nombre}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo documento*</label>
                    <select
                      name="tipoDocumento"
                      value={formData.tipoDocumento}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    >
                      {tiposDocumento.map((tipo) => (
                        <option key={tipo} value={tipo}>{tipo}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Número documento*</label>
                    <input
                      type="text"
                      name="numeroDocumento"
                      value={formData.numeroDocumento}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border ${formErrors.numeroDocumento ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200`}
                      required
                    />
                    {formErrors.numeroDocumento && (
                      <p className="mt-1 text-sm text-red-600 animate__animated animate__fadeIn">{formErrors.numeroDocumento}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de visita*</label>
                  <select
                    name="tipoVisita"
                    value={formData.tipoVisita}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  >
                    {tiposVisita.map((tipo) => (
                      <option key={tipo} value={tipo}>{tipo}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha*</label>
                  <input
                    type="date"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleChange}
                    max={getCurrentDate()}
                    className={`w-full px-4 py-2 border ${formErrors.fecha ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200`}
                    required
                  />
                  {formErrors.fecha && (
                    <p className="mt-1 text-sm text-red-600 animate__animated animate__fadeIn">{formErrors.fecha}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Observaciones</label>
                <textarea
                  name="observaciones"
                  value={formData.observaciones}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder="Ingrese observaciones adicionales (opcional)"
                ></textarea>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition flex items-center justify-center shadow-md hover:scale-105 transform duration-300"
                >
                  <FaTimesCircle className="inline-block mr-2" /> Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center shadow-md hover:scale-105 transform duration-300"
                >
                  <FaSave className="inline-block mr-2" /> {modalAction === 'create' ? 'Registrar Visita' : 'Guardar Cambios'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionarVisita;