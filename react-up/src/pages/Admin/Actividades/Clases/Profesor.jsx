import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Profesores = () => {
  const navigate = useNavigate();
  const [profesores, setProfesores] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProfesor, setNewProfesor] = useState({
    nombre: "",
    apellido: "Por definir",
    gmail: "",
    telefono: "",
    especialidad: "",
    stateProfesor: "active",
    // Campos adicionales del esquema unificado
    horario_trabajo: "",
    dia: "",
    inicio: "",
    fin: "",
    experiencia: "",
    formacion_academica: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:3000/api/profesores";

  // Fetch Profesores
  useEffect(() => {
    const fetchProfesores = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Error al obtener profesores");
        }
        
        const result = await response.json();
        
        if (!result.success || !Array.isArray(result.data)) {
          throw new Error("Formato de respuesta inválido del servidor");
        }
        
        setProfesores(result.data);
      } catch (err) {
        console.error("Error fetching profesores:", err);
        setError(err.message);
        Swal.fire("Error", err.message, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchProfesores();
  }, []);

  // Toggle Status
  const toggleStatus = async (id, currentStatus) => {
    try {
      const response = await fetch(`${API_URL}/${id}/estado`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stateProfesor: currentStatus === "active" ? "inactive" : "active" }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Error al cambiar estado");
      }

      setProfesores(
        profesores.map((profesor) =>
          profesor.idProfesor === id
            ? { ...profesor, stateProfesor: currentStatus === "active" ? "inactive" : "active" }
            : profesor
        )
      );
      Swal.fire(
        "¡Éxito!",
        `Estado actualizado a "${currentStatus === "active" ? "inactivo" : "activo"}"`,
        "success"
      );
    } catch (err) {
      console.error("Error toggling status:", err);
      Swal.fire("Error", err.message, "error");
    }
  };

  // Add New Profesor
  const handleAddProfesor = async () => {
    if (
      !newProfesor.nombre ||
      !newProfesor.gmail ||
      !newProfesor.especialidad ||
      !newProfesor.telefono
    ) {
      Swal.fire({
        title: "Error",
        text: "Por favor complete todos los campos requeridos (Nombre, Correo, Teléfono, Especialidad)",
        icon: "error",
      });
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProfesor),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Error al agregar profesor");
      }

      setProfesores([...profesores, result.data]);
      setShowAddModal(false);
      setNewProfesor({
        nombre: "",
        apellido: "Por definir",
        gmail: "",
        telefono: "",
        especialidad: "",
        stateProfesor: "active",
        horario_trabajo: "",
        dia: "",
        inicio: "",
        fin: "",
        experiencia: "",
        formacion_academica: ""
      });

      Swal.fire({
        title: "¡Éxito!",
        text: "Profesor agregado correctamente",
        icon: "success",
      });
    } catch (err) {
      console.error("Error adding profesor:", err);
      Swal.fire("Error", err.message, "error");
    }
  };

  // Delete Profesor
  const handleDelete = async (id) => {
    Swal.fire({
      title: "¿Eliminar profesor?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
          });

          const result = await response.json();

          if (!response.ok || !result.success) {
            throw new Error(result.message || "Error al eliminar profesor");
          }

          setProfesores(profesores.filter((profesor) => profesor.idProfesor !== id));
          Swal.fire("Eliminado", "El profesor ha sido eliminado", "success");
        } catch (err) {
          console.error("Error deleting profesor:", err);
          Swal.fire("Error", err.message, "error");
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16 bg-gray-50 flex items-center justify-center">
        <p className="text-xl text-gray-700">Cargando profesores...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-16 bg-gray-50 flex items-center justify-center">
        <p className="text-xl text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gray-50" style={{
      backgroundImage: "url('/gimnasio_actividades.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
    }}>
      <div className="absolute inset-0 bg-black/10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Gestión de Profesores
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-6 backdrop-blur-sm bg-white/80">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Lista de Profesores</h2>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Agregar Profesor
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profesores.length === 0 ? (
              <p className="col-span-full text-center text-gray-600">
                No hay profesores disponibles.
              </p>
            ) : (
              profesores.map((profesor) => (
                <div
                  key={profesor.idProfesor}
                  className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
                >
                  <div className="relative">
                    <img
                      src="/instructor.jpg"
                      alt={`${profesor.nombre} ${profesor.apellido}`}
                      className="w-full h-48 object-cover"
                    />
                    <span
                      className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${
                        profesor.stateProfesor === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {profesor.stateProfesor === "active" ? "Activo" : "Inactivo"}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-1">
                      {profesor.nombre} {profesor.apellido}
                    </h3>
                    <p className="text-indigo-600 mb-2">
                      {profesor.especialidad}
                    </p>
                    <div className="text-gray-600 mb-3">
                      <div className="flex items-center mb-1">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                        {profesor.gmail}
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                        {profesor.telefono}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <button
                        onClick={() => toggleStatus(profesor.idProfesor, profesor.stateProfesor)}
                        className={`px-3 py-1 rounded text-sm ${
                          profesor.stateProfesor === "active"
                            ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                        }`}
                      >
                        {profesor.stateProfesor === "active" ? "Desactivar" : "Activar"}
                      </button>
                      <button
                        onClick={() => handleDelete(profesor.idProfesor)}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Add Profesor Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4">
                Agregar Nuevo Profesor
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg"
                    value={newProfesor.nombre}
                    onChange={(e) =>
                      setNewProfesor({
                        ...newProfesor,
                        nombre: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Apellido
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg"
                    value={newProfesor.apellido}
                    onChange={(e) =>
                      setNewProfesor({
                        ...newProfesor,
                        apellido: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border rounded-lg"
                    value={newProfesor.gmail}
                    onChange={(e) =>
                      setNewProfesor({
                        ...newProfesor,
                        gmail: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border rounded-lg"
                    value={newProfesor.telefono}
                    onChange={(e) =>
                      setNewProfesor({
                        ...newProfesor,
                        telefono: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Especialidad
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg"
                    value={newProfesor.especialidad}
                    onChange={(e) =>
                      setNewProfesor({
                        ...newProfesor,
                        especialidad: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estado
                  </label>
                  <select
                    className="w-full px-3 py-2 border rounded-lg"
                    value={newProfesor.stateProfesor}
                    onChange={(e) =>
                      setNewProfesor({
                        ...newProfesor,
                        stateProfesor: e.target.value,
                      })
                    }
                  >
                    <option value="active">Activo</option>
                    <option value="inactive">Inactivo</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddProfesor}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Guardar Profesor
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Back Button */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Volver al Panel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profesores;