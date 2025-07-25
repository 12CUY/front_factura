import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Instructores = () => {
  const navigate = useNavigate();
  const [instructors, setInstructors] = useState([
    {
      id: 1,
      name: "María López",
      email: "maria.lopez@example.com",
      phone: "555-123-4567",
      specialty: "Yoga",
      status: "active",
      image: "/instructor.jpg",
    },
    {
      id: 2,
      name: "Carlos Méndez",
      email: "carlos.mendez@example.com",
      phone: "555-987-6543",
      specialty: "Crossfit",
      status: "active",
      image: "/instructor.jpg",
    },
    {
      id: 3,
      name: "Ana Torres",
      email: "ana.torres@example.com",
      phone: "555-456-7890",
      specialty: "Natación",
      status: "inactive",
      image: "/instructor.jpg",
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newInstructor, setNewInstructor] = useState({
    name: "",
    email: "",
    phone: "",
    specialty: "",
    status: "active",
  });

  const toggleStatus = (id) => {
    setInstructors(
      instructors.map((instructor) =>
        instructor.id === id
          ? {
              ...instructor,
              status: instructor.status === "active" ? "inactive" : "active",
            }
          : instructor
      )
    );
  };

  const handleAddInstructor = () => {
    if (
      !newInstructor.name ||
      !newInstructor.email ||
      !newInstructor.specialty
    ) {
      Swal.fire({
        title: "Error",
        text: "Por favor complete todos los campos requeridos",
        icon: "error",
      });
      return;
    }

    const instructorToAdd = {
      id: instructors.length + 1,
      ...newInstructor,
      image: `/instructors/default.jpg`,
    };

    setInstructors([...instructors, instructorToAdd]);
    setShowAddModal(false);
    setNewInstructor({
      name: "",
      email: "",
      phone: "",
      specialty: "",
      status: "active",
    });

    Swal.fire({
      title: "¡Éxito!",
      text: "Instructor agregado correctamente",
      icon: "success",
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Eliminar instructor?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        setInstructors(
          instructors.filter((instructor) => instructor.id !== id)
        );
        Swal.fire("Eliminado", "El instructor ha sido eliminado", "success");
      }
    });
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Gestión de Instructores
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-6 backdrop-blur-sm bg-white/80">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Lista de Instructores</h2>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Agregar Instructor
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {instructors.map((instructor) => (
              <div
                key={instructor.id}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
              >
                <div className="relative">
                  <img
                    src={instructor.image}
                    alt={instructor.name}
                    className="w-full h-48 object-cover"
                  />
                  <span
                    className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${
                      instructor.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {instructor.status === "active" ? "Activo" : "Inactivo"}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-1">
                    {instructor.name}
                  </h3>
                  <p className="text-indigo-600 mb-2">{instructor.specialty}</p>
                  <div className="text-gray-600 mb-3">
                    <div className="flex items-center mb-1">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        ></path>
                      </svg>
                      {instructor.email}
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        ></path>
                      </svg>
                      {instructor.phone}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <button
                      onClick={() => toggleStatus(instructor.id)}
                      className={`px-3 py-1 rounded text-sm ${
                        instructor.status === "active"
                          ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                      }`}
                    >
                      {instructor.status === "active"
                        ? "Desactivar"
                        : "Activar"}
                    </button>
                    <button
                      onClick={() => handleDelete(instructor.id)}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal para agregar instructor */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md mt-20">
              {" "}
              <h3 className="text-xl font-semibold mb-4">
                Agregar Nuevo Instructor
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg"
                    value={newInstructor.name}
                    onChange={(e) =>
                      setNewInstructor({
                        ...newInstructor,
                        name: e.target.value,
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
                    value={newInstructor.email}
                    onChange={(e) =>
                      setNewInstructor({
                        ...newInstructor,
                        email: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border rounded-lg"
                    value={newInstructor.phone}
                    onChange={(e) =>
                      setNewInstructor({
                        ...newInstructor,
                        phone: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Especialidad
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg"
                    value={newInstructor.specialty}
                    onChange={(e) =>
                      setNewInstructor({
                        ...newInstructor,
                        specialty: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estado
                  </label>
                  <select
                    className="w-full px-3 py-2 border rounded-lg"
                    value={newInstructor.status}
                    onChange={(e) =>
                      setNewInstructor({
                        ...newInstructor,
                        status: e.target.value,
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
                  onClick={handleAddInstructor}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Guardar Instructor
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Botón de volver */}
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

export default Instructores;
