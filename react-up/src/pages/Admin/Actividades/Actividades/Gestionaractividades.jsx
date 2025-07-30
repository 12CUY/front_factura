import { useState } from 'react';
import { FiPlus, FiEdit2, FiEye, FiTrash2, FiX, FiClock, FiCalendar, FiUser, FiList } from 'react-icons/fi';

const GestionarActividades = () => {
  // Initial example data
  const [clases, setClases] = useState([
    {
      id: 1,
      nombre: "Yoga Matutino",
      descripcion: "Clase de yoga para principiantes",
      fecha: "28/07/2025",
      hora: "8:00 AM",
      duracion: 60,
      instructor: "Maria López",
      capacidad: 20,
      inscritos: 18,
      actividades: [
        {
          id: 1,
          nombre: "Saludo al sol",
          descripcion: "Secuencia básica de 12 posturas",
          duracion: 15,
          material: "Esterilla",
          dificultad: "Principiante"
        },
        {
          id: 2,
          nombre: "Postura del árbol",
          descripcion: "Trabajo de equilibrio",
          duracion: 10,
          material: "Ninguno",
          dificultad: "Intermedio"
        }
      ]
    },
    {
      id: 2,
      nombre: "Crossfit",
      descripcion: "Entrenamiento funcional intensivo",
      fecha: "30/07/2025",
      hora: "12:00 PM",
      duracion: 45,
      instructor: "Carlos Méndez",
      capacidad: 15,
      inscritos: 12,
      actividades: [
        {
          id: 1,
          nombre: "Burpees",
          descripcion: "Ejercicio completo de cuerpo",
          duracion: 10,
          material: "Ninguno",
          dificultad: "Avanzado"
        },
        {
          id: 2,
          nombre: "Saltos a caja",
          descripcion: "Trabajo de potencia",
          duracion: 8,
          material: "Caja pliométrica",
          dificultad: "Intermedio"
        }
      ]
    }
  ]);

  // States for modals and selection
  const [modalAbierto, setModalAbierto] = useState(null);
  const [claseSeleccionada, setClaseSeleccionada] = useState(null);
  const [actividadSeleccionada, setActividadSeleccionada] = useState(null);
  const [nuevaClase, setNuevaClase] = useState({
    nombre: "",
    descripcion: "",
    fecha: "",
    hora: "",
    duracion: "",
    instructor: "",
    capacidad: "",
    actividades: []
  });
  const [nuevaActividad, setNuevaActividad] = useState({
    nombre: "",
    descripcion: "",
    duracion: "",
    material: "",
    dificultad: ""
  });

  // Handle modals
  const abrirModal = (tipo, clase = null, actividad = null) => {
    setModalAbierto(tipo);
    if (clase) {
      setClaseSeleccionada(clase);
      if (tipo === 'editar-clase') {
        setNuevaClase({ ...clase });
      }
      if (actividad) {
        setActividadSeleccionada(actividad);
        if (tipo === 'editar-actividad') {
          setNuevaActividad({ ...actividad });
        }
      }
    }

    if (tipo === 'crear-clase') {
      setNuevaClase({
        nombre: "",
        descripcion: "",
        fecha: "",
        hora: "",
        duracion: "",
        instructor: "",
        capacidad: "",
        actividades: []
      });
    } else if (tipo === 'crear-actividad' && clase) {
      setNuevaActividad({
        nombre: "",
        descripcion: "",
        duracion: "",
        material: "",
        dificultad: ""
      });
    }
  };

  const cerrarModal = () => {
    setModalAbierto(null);
    setClaseSeleccionada(null);
    setActividadSeleccionada(null);
  };

  // Handle form changes
  const handleClaseChange = (e) => {
    const { name, value } = e.target;
    setNuevaClase(prev => ({ ...prev, [name]: value }));
  };

  const handleActividadChange = (e) => {
    const { name, value } = e.target;
    setNuevaActividad(prev => ({ ...prev, [name]: value }));
  };

  // CRUD Operations for Classes
  const agregarClase = () => {
    const nueva = {
      ...nuevaClase,
      id: clases.length > 0 ? Math.max(...clases.map(c => c.id)) + 1 : 1,
      inscritos: 0,
      actividades: []
    };
    setClases([...clases, nueva]);
    cerrarModal();
  };

  const editarClase = () => {
    setClases(clases.map(c =>
      c.id === claseSeleccionada.id ? { ...nuevaClase, id: c.id, inscritos: c.inscritos, actividades: c.actividades } : c
    ));
    cerrarModal();
  };

  const eliminarClase = (id) => {
    setClases(clases.filter(c => c.id !== id));
    cerrarModal();
  };

  // CRUD Operations for Activities
  const agregarActividad = () => {
    const actividad = {
      ...nuevaActividad,
      id: claseSeleccionada.actividades.length > 0
        ? Math.max(...claseSeleccionada.actividades.map(a => a.id)) + 1
        : 1,
      duracion: parseInt(nuevaActividad.duracion)
    };

    const claseActualizada = {
      ...claseSeleccionada,
      actividades: [...claseSeleccionada.actividades, actividad]
    };

    setClases(clases.map(c => c.id === claseSeleccionada.id ? claseActualizada : c));
    cerrarModal();
  };

  const editarActividad = () => {
    const actividadesActualizadas = claseSeleccionada.actividades.map(a =>
      a.id === actividadSeleccionada.id ? { ...nuevaActividad, id: a.id } : a
    );

    const claseActualizada = {
      ...claseSeleccionada,
      actividades: actividadesActualizadas
    };

    setClases(clases.map(c => c.id === claseSeleccionada.id ? claseActualizada : c));
    cerrarModal();
  };

  const eliminarActividad = (idActividad) => {
    const actividadesActualizadas = claseSeleccionada.actividades.filter(a => a.id !== idActividad);

    const claseActualizada = {
      ...claseSeleccionada,
      actividades: actividadesActualizadas
    };

    setClases(clases.map(c => c.id === claseSeleccionada.id ? claseActualizada : c));
    cerrarModal();
  };

  return (
    <div className="min-h-screen p-6 bg-opacity-90 bg-[url('/gimnasio_actividades.jpg')] bg-cover bg-center bg-blend-overlay">
      <div className="max-w-7xl mx-auto" style={{ marginTop: '100px' }}>
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-700">Gestión de Clases y Actividades</h1>
          <button
            onClick={() => abrirModal('crear-clase')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-all hover:scale-105"
          >
            <FiPlus className="mr-2" /> Nueva Clase
          </button>
        </div>

        {/* Class Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clases.map(clase => (
            <div
              key={clase.id}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <div className="p-6">
                {/* Class Header */}
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-xl font-bold text-gray-800">{clase.nombre}</h2>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {clase.inscritos}/{clase.capacidad}
                  </span>
                </div>

                <p className="text-gray-600 mb-4">{clase.descripcion}</p>

                {/* Class Details */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center">
                    <FiCalendar className="text-gray-500 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Fecha</p>
                      <p className="font-medium">{clase.fecha}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FiClock className="text-gray-500 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Hora</p>
                      <p className="font-medium">{clase.hora}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FiClock className="text-gray-500 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Duración</p>
                      <p className="font-medium">{clase.duracion} min</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FiUser className="text-gray-500 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Instructor</p>
                      <p className="font-medium">{clase.instructor}</p>
                    </div>
                  </div>
                </div>

                {/* Class Activities */}
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <FiList className="text-gray-500 mr-2" />
                    <h3 className="font-medium text-gray-700">Actividades/Tareas:</h3>
                  </div>
                  <ul className="space-y-2">
                    {clase.actividades.map(actividad => (
                      <li key={actividad.id} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                        <span>{actividad.nombre}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">{actividad.duracion} min</span>
                          <button
                            onClick={() => abrirModal('editar-actividad', clase, actividad)}
                            className="text-green-600 hover:text-green-800"
                            title="Editar actividad"
                          >
                            <FiEdit2 size={16} />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between border-t pt-4">
                  <button
                    onClick={() => abrirModal('ver-clase', clase)}
                    className="text-blue-600 hover:text-blue-800 flex items-center transition-colors"
                  >
                    <FiEye className="mr-1" /> Ver
                  </button>
                  <button
                    onClick={() => abrirModal('editar-clase', clase)}
                    className="text-green-600 hover:text-green-800 flex items-center transition-colors"
                  >
                    <FiEdit2 className="mr-1" /> Editar
                  </button>
                  <button
                    onClick={() => abrirModal('eliminar-clase', clase)}
                    className="text-red-600 hover:text-red-800 flex items-center transition-colors"
                  >
                    <FiTrash2 className="mr-1" /> Eliminar
                  </button>
                  <button
                    onClick={() => abrirModal('crear-actividad', clase)}
                    className="text-purple-600 hover:text-purple-800 flex items-center transition-colors"
                  >
                    <FiPlus className="mr-1" /> Actividad
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Viewing Class */}
        {modalAbierto === 'ver-clase' && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 transition-opacity duration-300">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl animate-fadeIn">
              <div className="bg-blue-600 text-white rounded-t-xl p-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold">{claseSeleccionada.nombre}</h3>
                  <button onClick={cerrarModal} className="text-white hover:text-gray-200">
                    <FiX size={24} />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-bold text-gray-700 mb-3">Información de la Clase</h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500">Descripción</p>
                        <p className="font-medium">{claseSeleccionada.descripcion}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Fecha</p>
                          <p className="font-medium">{claseSeleccionada.fecha}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Hora</p>
                          <p className="font-medium">{claseSeleccionada.hora}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Duración</p>
                          <p className="font-medium">{claseSeleccionada.duracion} minutos</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Capacidad</p>
                          <p className="font-medium">{claseSeleccionada.inscritos}/{claseSeleccionada.capacidad}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Instructor</p>
                        <p className="font-medium">{claseSeleccionada.instructor}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-700 mb-3">Actividades/Tareas</h4>
                    <div className="space-y-4">
                      {claseSeleccionada.actividades.length > 0 ? (
                        claseSeleccionada.actividades.map(actividad => (
                          <div key={actividad.id} className="bg-gray-50 p-3 rounded-lg">
                            <div className="flex justify-between items-start">
                              <h5 className="font-medium">{actividad.nombre}</h5>
                              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                {actividad.duracion} min
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{actividad.descripcion}</p>
                            <div className="flex justify-between mt-2">
                              <span className="text-xs text-gray-500">Material: {actividad.material}</span>
                              <span className="text-xs text-gray-500">Dificultad: {actividad.dificultad}</span>
                            </div>
                            <div className="flex justify-end mt-2 space-x-2">
                              <button
                                onClick={() => abrirModal('editar-actividad', claseSeleccionada, actividad)}
                                className="text-xs text-green-600 hover:text-green-800"
                              >
                                Editar
                              </button>
                              <button
                                onClick={() => abrirModal('eliminar-actividad', claseSeleccionada, actividad)}
                                className="text-xs text-red-600 hover:text-red-800"
                              >
                                Eliminar
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 text-center py-4">No hay actividades registradas</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between border-t p-4">
                <button
                  onClick={cerrarModal}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
                >
                  Cerrar
                </button>
                <div className="space-x-3">
                  <button
                    onClick={() => abrirModal('editar-clase', claseSeleccionada)}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    Editar Clase
                  </button>
                  <button
                    onClick={() => abrirModal('crear-actividad', claseSeleccionada)}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                  >
                    Agregar Actividad
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal for Creating/Editing Class */}
        {(modalAbierto === 'crear-clase' || modalAbierto === 'editar-clase') && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 transition-opacity duration-300">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md animate-slideUp">
              <div className="border-b p-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-800">
                    {modalAbierto === 'crear-clase' ? 'Nueva Clase' : 'Editar Clase'}
                  </h3>
                  <button onClick={cerrarModal} className="text-gray-500 hover:text-gray-700">
                    <FiX size={24} />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-500 mb-1">Nombre *</label>
                    <input
                      type="text"
                      name="nombre"
                      value={nuevaClase.nombre}
                      onChange={handleClaseChange}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-500 mb-1">Descripción *</label>
                    <textarea
                      name="descripcion"
                      value={nuevaClase.descripcion}
                      onChange={handleClaseChange}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows="2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Fecha *</label>
                    <input
                      type="date"
                      name="fecha"
                      value={nuevaClase.fecha}
                      onChange={handleClaseChange}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Hora *</label>
                    <input
                      type="time"
                      name="hora"
                      value={nuevaClase.hora}
                      onChange={handleClaseChange}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Duración (min) *</label>
                    <input
                      type="number"
                      name="duracion"
                      value={nuevaClase.duracion}
                      onChange={handleClaseChange}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Capacidad *</label>
                    <input
                      type="number"
                      name="capacidad"
                      value={nuevaClase.capacidad}
                      onChange={handleClaseChange}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                      min="1"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-500 mb-1">Instructor *</label>
                    <input
                      type="text"
                      name="instructor"
                      value={nuevaClase.instructor}
                      onChange={handleClaseChange}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end border-t p-4 space-x-3">
                <button
                  onClick={cerrarModal}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={modalAbierto === 'crear-clase' ? agregarClase : editarClase}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  {modalAbierto === 'crear-clase' ? 'Crear Clase' : 'Guardar Cambios'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal for Deleting Class */}
        {modalAbierto === 'eliminar-clase' && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 transition-opacity duration-300">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md animate-fadeIn">
              <div className="border-b p-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-800">Eliminar Clase</h3>
                  <button onClick={cerrarModal} className="text-gray-500 hover:text-gray-700">
                    <FiX size={24} />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <p className="mb-4">¿Estás seguro que deseas eliminar la clase {claseSeleccionada.nombre}?</p>
                <p className="text-sm text-gray-500">
                  Esta acción eliminará también todas las actividades asociadas y no se puede deshacer.
                </p>
              </div>
              <div className="flex justify-end border-t p-4 space-x-3">
                <button
                  onClick={cerrarModal}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => eliminarClase(claseSeleccionada.id)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  Confirmar Eliminación
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal for Creating/Editing Activity */}
        {(modalAbierto === 'crear-actividad' || modalAbierto === 'editar-actividad') && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 transition-opacity duration-300">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md animate-slideUp">
              <div className="border-b p-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-800">
                    {modalAbierto === 'crear-actividad' ? 'Nueva Actividad' : 'Editar Actividad'}
                  </h3>
                  <button onClick={cerrarModal} className="text-gray-500 hover:text-gray-700">
                    <FiX size={24} />
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-1">Clase: {claseSeleccionada.nombre}</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 gap-4 mb-4">
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Nombre *</label>
                    <input
                      type="text"
                      name="nombre"
                      value={nuevaActividad.nombre}
                      onChange={handleActividadChange}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Descripción *</label>
                    <textarea
                      name="descripcion"
                      value={nuevaActividad.descripcion}
                      onChange={handleActividadChange}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows="3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">Duración (min) *</label>
                      <input
                        type="number"
                        name="duracion"
                        value={nuevaActividad.duracion}
                        onChange={handleActividadChange}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                        min="1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">Dificultad *</label>
                      <select
                        name="dificultad"
                        value={nuevaActividad.dificultad}
                        onChange={handleActividadChange}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        <option value="">Seleccionar</option>
                        <option value="Principiante">Principiante</option>
                        <option value="Intermedio">Intermedio</option>
                        <option value="Avanzado">Avanzado</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Material necesario</label>
                    <input
                      type="text"
                      name="material"
                      value={nuevaActividad.material}
                      onChange={handleActividadChange}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Ej: Esterilla, pesas, etc."
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end border-t p-4 space-x-3">
                <button
                  onClick={cerrarModal}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={modalAbierto === 'crear-actividad' ? agregarActividad : editarActividad}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                >
                  {modalAbierto === 'crear-actividad' ? 'Agregar Actividad' : 'Guardar Cambios'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal for Deleting Activity */}
        {modalAbierto === 'eliminar-actividad' && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 transition-opacity duration-300">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md animate-fadeIn">
              <div className="border-b p-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-800">Eliminar Actividad</h3>
                  <button onClick={cerrarModal} className="text-gray-500 hover:text-gray-700">
                    <FiX size={24} />
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-1">Clase: {claseSeleccionada.nombre}</p>
              </div>
              <div className="p-6">
                <p className="mb-4">¿Estás seguro que deseas eliminar la actividad {actividadSeleccionada.nombre}?</p>
                <p className="text-sm text-gray-500">Esta acción no se puede deshacer.</p>
              </div>
              <div className="flex justify-end border-t p-4 space-x-3">
                <button
                  onClick={cerrarModal}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => eliminarActividad(actividadSeleccionada.id)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  Confirmar Eliminación
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GestionarActividades;