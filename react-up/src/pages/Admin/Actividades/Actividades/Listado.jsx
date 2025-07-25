import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit2, FiTrash2, FiEye, FiX, FiClock, FiUser } from "react-icons/fi";

// Datos de ejemplo (en una app real vendrían de una API)
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
      especialidad: "Yoga Terapéutico",
    },
    imagen:
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    horarios: ["Lunes 8:00 AM", "Miércoles 8:00 AM"],
  },
  {
    id: 2,
    nombre: "Crossfit Intenso",
    categoria: "Crossfit",
    descripcion:
      "Entrenamiento funcional de alta intensidad para todos los niveles",
    duracion: 45,
    capacidad: 15,
    dificultad: "alta",
    instructor: {
      nombre: "Carlos Méndez",
      cedula: "987654321",
      especialidad: "Entrenamiento Funcional",
    },
    imagen:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    horarios: ["Martes 6:00 PM", "Jueves 6:00 PM", "Sábado 9:00 AM"],
  },
  {
    id: 3,
    nombre: "Natación Terapéutica",
    categoria: "Natación",
    descripcion:
      "Clases para mejorar movilidad y reducir estrés en piscina temperada",
    duracion: 50,
    capacidad: 10,
    dificultad: "baja",
    instructor: {
      nombre: "Ana Torres",
      cedula: "456123789",
      especialidad: "Natación Terapéutica",
    },
    imagen:
      "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    horarios: ["Lunes 4:00 PM", "Miércoles 4:00 PM", "Viernes 4:00 PM"],
  },
];

const ListaActividades = () => {
  const navigate = useNavigate();
  const [actividades, setActividades] = useState([]);
  const [actividadSeleccionada, setActividadSeleccionada] = useState(null);
  const [mostrarModalDetalles, setMostrarModalDetalles] = useState(false);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [actividadAEliminar, setActividadAEliminar] = useState(null);

  useEffect(() => {
    // Simular carga de datos
    setActividades(actividadesEjemplo);
  }, []);

  const abrirModalDetalles = (actividad) => {
    setActividadSeleccionada(actividad);
    setMostrarModalDetalles(true);
  };

  const cerrarModalDetalles = () => {
    setMostrarModalDetalles(false);
    setActividadSeleccionada(null);
  };

  const abrirModalEliminar = (actividad) => {
    setActividadAEliminar(actividad);
    setMostrarModalEliminar(true);
  };

  const cerrarModalEliminar = () => {
    setMostrarModalEliminar(false);
    setActividadAEliminar(null);
  };

  const confirmarEliminar = () => {
    if (actividadAEliminar) {
      setActividades(actividades.filter((a) => a.id !== actividadAEliminar.id));
      cerrarModalEliminar();
      alert("Actividad eliminada correctamente");
    }
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
          <h1 className="text-3xl font-bold text-gray-900">
            Listado de Actividades
          </h1>
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
            actividades.map((actividad) => (
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
                    <h2 className="text-xl font-bold text-gray-800">
                      {actividad.nombre}
                    </h2>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        actividad.dificultad === "alta"
                          ? "bg-red-100 text-red-800"
                          : actividad.dificultad === "media"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {actividad.dificultad}
                    </span>
                  </div>

                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <FiUser className="mr-2" />
                    <span>
                      {actividad.instructor.nombre} (CI:{" "}
                      {actividad.instructor.cedula})
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {actividad.descripcion}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {actividad.horarios.slice(0, 2).map((horario, index) => (
                      <span
                        key={index}
                        className="flex items-center text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded"
                      >
                        <FiClock className="mr-1" /> {horario}
                      </span>
                    ))}
                    {actividad.horarios.length > 2 && (
                      <span className="text-xs text-gray-500">
                        +{actividad.horarios.length - 2} más
                      </span>
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
                        onClick={() =>
                          navigate(`/dashboardA/editar/${actividad.id}`)
                        }
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition"
                        title="Editar"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => abrirModalEliminar(actividad)}
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

      {/* Modal de Detalles */}
      {mostrarModalDetalles && actividadSeleccionada && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto backdrop-blur-sm bg-white/90">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">
                {actividadSeleccionada.nombre}
              </h3>
              <button
                onClick={cerrarModalDetalles}
                className="text-gray-500 hover:text-gray-700 transition"
              >
                <FiX size={24} />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="md:col-span-2">
                  <img
                    src={actividadSeleccionada.imagen}
                    alt={actividadSeleccionada.nombre}
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-700">Categoría</h4>
                    <p className="text-gray-600">
                      {actividadSeleccionada.categoria}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Dificultad</h4>
                    <p className="capitalize text-gray-600">
                      {actividadSeleccionada.dificultad}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Duración</h4>
                    <p className="text-gray-600">
                      {actividadSeleccionada.duracion} minutos
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Capacidad</h4>
                    <p className="text-gray-600">
                      {actividadSeleccionada.capacidad} personas
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-2">
                  Descripción
                </h4>
                <p className="text-gray-600">
                  {actividadSeleccionada.descripcion}
                </p>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-2">Instructor</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium">
                    {actividadSeleccionada.instructor.nombre}
                  </p>
                  <p className="text-sm text-gray-600">
                    Cédula: {actividadSeleccionada.instructor.cedula}
                  </p>
                  <p className="text-sm text-gray-600">
                    Especialidad:{" "}
                    {actividadSeleccionada.instructor.especialidad}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Horarios</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {actividadSeleccionada.horarios.map((horario, index) => (
                    <div
                      key={index}
                      className="bg-indigo-50 text-indigo-800 p-3 rounded-lg flex items-center"
                    >
                      <FiClock className="mr-2" />
                      <span>{horario}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t flex justify-end gap-3">
              <button
                onClick={cerrarModalDetalles}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Cerrar
              </button>
              <button
                onClick={() => {
                  navigate(`/dashboardA/editar/${actividadSeleccionada.id}`);
                  cerrarModalDetalles();
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Editar Actividad
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Eliminar */}
      {mostrarModalEliminar && actividadAEliminar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full backdrop-blur-sm bg-white/90">
            <div className="p-6">
              <div className="text-center">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  Confirmar Eliminación
                </h3>
                <p className="text-gray-600 mb-4">
                  ¿Estás seguro de que deseas eliminar la actividad{" "}
                  <span className="font-semibold">
                    "{actividadAEliminar.nombre}"
                  </span>
                  ?
                </p>
                <p className="text-sm text-gray-500">
                  Esta acción no se puede deshacer.
                </p>
              </div>

              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={cerrarModalEliminar}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmarEliminar}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaActividades;
