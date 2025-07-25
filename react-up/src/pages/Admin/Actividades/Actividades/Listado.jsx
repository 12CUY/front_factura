import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit2, FiTrash2, FiEye, FiClock, FiUser, FiX } from "react-icons/fi";
import Swal from "sweetalert2";

// Datos de ejemplo
const actividadesEjemplo = [
  {
    id: 1,
    nombre: "Yoga Matutino",
    categoria: "Yoga",
    descripcion: "Clase de yoga para empezar el día con energía y flexibilidad",
    duracion: 60,
    capacidad: 20,
    dificultad: "media",
    instructor: {
      nombre: "María López",
      cedula: "123456789",
      especialidad: "Yoga Terapéutico"
    },
    imagen: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    horarios: ["Lunes 8:00 AM", "Miércoles 8:00 AM"]
  },
  // ... más actividades de ejemplo
];

const ListaActividades = () => {
  const navigate = useNavigate();
  const [actividades, setActividades] = useState([]);
  const [actividadSeleccionada, setActividadSeleccionada] = useState(null);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);

  useEffect(() => {
    // Simular carga de datos
    setActividades(actividadesEjemplo);
  }, []);

  const abrirModalDetalles = (actividad) => {
    setActividadSeleccionada(actividad);
  };

  const abrirModalEditar = (actividad) => {
    setActividadSeleccionada(actividad);
    setMostrarModalEditar(true);
  };

  const cerrarModalEditar = () => {
    setMostrarModalEditar(false);
    setActividadSeleccionada(null);
  };

  const confirmarEliminar = (actividad) => {
    Swal.fire({
      title: '¿Eliminar actividad?',
      html: `¿Estás seguro de eliminar la actividad <strong>"${actividad.nombre}"</strong>?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      background: 'white',
      backdrop: `
        rgba(0,0,0,0.5)
        url("/images/trash-icon.gif")
        left top
        no-repeat
      `
    }).then((result) => {
      if (result.isConfirmed) {
        setActividades(actividades.filter(a => a.id !== actividad.id));
        Swal.fire(
          '¡Eliminada!',
          'La actividad ha sido eliminada.',
          'success'
        );
      }
    });
  };

  const guardarCambios = (e) => {
    e.preventDefault();
    // Lógica para guardar cambios
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Cambios guardados',
      showConfirmButton: false,
      timer: 1500
    });
    cerrarModalEditar();
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
      <div className="absolute inset-0 bg-black/10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Listado de Actividades</h1>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/dashboardA/crear")}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              + Nueva Actividad
            </button>
            <button
              onClick={() => navigate("/dashboardA")}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              Volver
            </button>
          </div>
        </div>

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {actividades.length === 0 ? (
            <div className="col-span-full text-center py-10 text-gray-500 bg-white rounded-xl shadow-lg p-6 backdrop-blur-sm bg-white/80">
              No hay actividades registradas
            </div>
          ) : (
            actividades.map(actividad => (
              <div 
                key={actividad.id} 
                className="bg-white rounded-xl shadow-lg overflow-hidden backdrop-blur-sm bg-white/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                {/* Imagen */}
                <div className="h-48 overflow-hidden">
                  <img 
                    src={actividad.imagen} 
                    alt={actividad.nombre}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Contenido */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold text-gray-800">{actividad.nombre}</h2>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      actividad.dificultad === "alta" ? "bg-red-100 text-red-800" :
                      actividad.dificultad === "media" ? "bg-yellow-100 text-yellow-800" :
                      "bg-green-100 text-green-800"
                    }`}>
                      {actividad.dificultad}
                    </span>
                  </div>

                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <FiUser className="mr-2" />
                    <span>{actividad.instructor.nombre} (CI: {actividad.instructor.cedula})</span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{actividad.descripcion}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {actividad.horarios.slice(0, 2).map((horario, index) => (
                      <span key={index} className="flex items-center text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                        <FiClock className="mr-1" /> {horario}
                      </span>
                    ))}
                    {actividad.horarios.length > 2 && (
                      <span className="text-xs text-gray-500">+{actividad.horarios.length - 2} más</span>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {actividad.duracion} min • {actividad.capacidad} pers.
                    </span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => abrirModalDetalles(actividad)}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full transition"
                        title="Ver detalles"
                      >
                        <FiEye />
                      </button>
                      <button 
                        onClick={() => abrirModalEditar(actividad)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition"
                        title="Editar"
                      >
                        <FiEdit2 />
                      </button>
                      <button 
                        onClick={() => confirmarEliminar(actividad)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full transition"
                        title="Eliminar"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal de Edición */}
      {mostrarModalEditar && actividadSeleccionada && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto backdrop-blur-sm bg-white/90">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">Editar Actividad: {actividadSeleccionada.nombre}</h3>
              <button 
                onClick={cerrarModalEditar}
                className="text-gray-500 hover:text-gray-700 transition"
              >
                <FiX size={24} />
              </button>
            </div>

            <form onSubmit={guardarCambios} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Columna izquierda */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                    <input
                      type="text"
                      defaultValue={actividadSeleccionada.nombre}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Categoría *</label>
                    <select
                      defaultValue={actividadSeleccionada.categoria}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    >
                      <option value="fitness">Fitness</option>
                      <option value="yoga">Yoga</option>
                      <option value="crossfit">Crossfit</option>
                      <option value="natacion">Natación</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripción *</label>
                    <textarea
                      defaultValue={actividadSeleccionada.descripcion}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                </div>

                {/* Columna derecha */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duración (min) *</label>
                    <input
                      type="number"
                      defaultValue={actividadSeleccionada.duracion}
                      min="1"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Capacidad *</label>
                    <input
                      type="number"
                      defaultValue={actividadSeleccionada.capacidad}
                      min="1"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dificultad *</label>
                    <div className="grid grid-cols-3 gap-2">
                      {["baja", "media", "alta"].map((nivel) => (
                        <label 
                          key={nivel}
                          className={`flex items-center justify-center p-2 rounded-lg border cursor-pointer transition ${
                            actividadSeleccionada.dificultad === nivel 
                              ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                              : "border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          <input
                            type="radio"
                            name="dificultad"
                            defaultChecked={actividadSeleccionada.dificultad === nivel}
                            className="hidden"
                            required
                          />
                          <span className="capitalize">{nivel}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6 mt-6 border-t">
                <button
                  type="button"
                  onClick={cerrarModalEditar}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaActividades;