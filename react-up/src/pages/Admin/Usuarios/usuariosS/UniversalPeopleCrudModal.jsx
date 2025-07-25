import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  FaTimes,
  FaEdit,
  FaTrash,
  FaUser,
  FaUsers,
  FaChalkboardTeacher,
  FaBriefcase,
  FaUserTie,
  FaSave,
  FaPlus,
} from "react-icons/fa";

const UniversalPeopleCrudModal = ({
  isOpen,
  onClose,
  initialTab = "clientes",
}) => {
  if (!isOpen) return null;

  // Estados iniciales para cada tipo de persona (datos de ejemplo)
  const [clientes, setClientes] = useState([
    {
      id: 1,
      nombre: "Ana García",
      email: "ana.g@example.com",
      telefono: "111-222-3333",
      membresia: "Premium",
      estado: "activo",
    },
    {
      id: 2,
      nombre: "Luis Pérez",
      email: "luis.p@example.com",
      telefono: "444-555-6666",
      membresia: "Básica",
      estado: "activo",
    },
    {
      id: 3,
      nombre: "Sofía Martínez",
      email: "sofia.m@example.com",
      telefono: "777-888-9999",
      membresia: "Anual",
      estado: "inactivo",
    },
  ]);

  const [usuariosGenerales, setUsuariosGenerales] = useState([
    {
      id: 1,
      nombre: "Juan Delta",
      email: "juan.d@example.com",
      rolAsignado: "usuario",
      estado: "activo",
    },
    {
      id: 2,
      nombre: "Marta Epsilon",
      email: "marta.e@example.com",
      rolAsignado: "usuario",
      estado: "inactivo",
    },
    {
      id: 3,
      nombre: "Roberto Zeta",
      email: "roberto.z@example.com",
      rolAsignado: "usuario",
      estado: "activo",
    },
  ]);

  const [instructores, setInstructores] = useState([
    {
      id: 1,
      nombre: "María López",
      email: "maria.l@example.com",
      telefono: "555-123-4567",
      especialidad: "Yoga",
      estado: "activo",
    },
    {
      id: 2,
      nombre: "Carlos Méndez",
      email: "carlos.m@example.com",
      telefono: "555-987-6543",
      especialidad: "Crossfit",
      estado: "inactivo",
    },
    {
      id: 3,
      nombre: "Ana Torres",
      email: "ana.t@example.com",
      telefono: "555-456-7890",
      especialidad: "Natación",
      estado: "activo",
    },
  ]);

  const [empleados, setEmpleados] = useState([
    {
      id: 1,
      nombre: "Sofía Bravo",
      email: "sofia.b@example.com",
      telefono: "333-111-2222",
      cargo: "Recepción",
      estado: "activo",
    },
    {
      id: 2,
      nombre: "Roberto Castro",
      email: "roberto.c@example.com",
      telefono: "333-444-5555",
      cargo: "Mantenimiento",
      estado: "activo",
    },
    {
      id: 3,
      nombre: "Laura Fuentes",
      email: "laura.f@example.com",
      telefono: "333-777-8888",
      cargo: "Limpieza",
      estado: "inactivo",
    },
  ]);

  const [gerentes, setGerentes] = useState([
    {
      id: 1,
      nombre: "Elena Ruiz",
      email: "elena.r@example.com",
      telefono: "999-000-1111",
      departamento: "Operaciones",
      estado: "activo",
    },
    {
      id: 2,
      nombre: "Pedro Gómez",
      email: "pedro.g@example.com",
      telefono: "999-222-3333",
      departamento: "Finanzas",
      estado: "activo",
    },
  ]);

  // Estado para la pestaña activa
  const [activeTab, setActiveTab] = useState(initialTab);

  // Estados para la edición/creación
  const [editingPerson, setEditingPerson] = useState(null); // La persona que se está editando
  const [isAddingNew, setIsAddingNew] = useState(false); // Si se está añadiendo una nueva persona

  useEffect(() => {
    // Si el modal se abre con una pestaña inicial específica, actívala.
    if (isOpen) {
      setActiveTab(initialTab);
      // Reiniciar estados de edición/adición al abrir el modal
      setEditingPerson(null);
      setIsAddingNew(false);
    }
  }, [isOpen, initialTab]);

  // --- Funciones CRUD Genéricas ---
  const alternarEstadoPersona = (lista, setLista, id) => {
    setLista(
      lista.map((persona) =>
        persona.id === id
          ? {
              ...persona,
              estado: persona.estado === "activo" ? "inactivo" : "activo",
            }
          : persona
      )
    );
  };

  const eliminarPersona = (lista, setLista, id, nombreTipo) => {
    Swal.fire({
      title: `¿Eliminar ${nombreTipo}?`,
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setLista(lista.filter((persona) => persona.id !== id));
        Swal.fire("Eliminado", `${nombreTipo} ha sido eliminado`, "success");
      }
    });
  };

  const iniciarEdicion = (persona) => {
    setEditingPerson({ ...persona }); // Clonar para no modificar el estado original directamente
    setIsAddingNew(false);
  };

  const iniciarCreacion = () => {
    setEditingPerson({}); // Objeto vacío para el nuevo registro
    setIsAddingNew(true);
  };

  const manejarCambioCampo = (e) => {
    const { name, value } = e.target;
    setEditingPerson((prev) => ({ ...prev, [name]: value }));
  };

  const guardarCambios = (currentList, setCurrentList, typeName) => {
    if (!editingPerson.nombre || !editingPerson.email) {
      // Validación básica
      Swal.fire("Error", "Nombre y Email son campos requeridos.", "error");
      return;
    }

    if (isAddingNew) {
      const newId = currentList.length
        ? Math.max(...currentList.map((p) => p.id)) + 1
        : 1;
      setCurrentList([...currentList, { ...editingPerson, id: newId }]);
      Swal.fire("¡Agregado!", `${typeName} añadido correctamente.`, "success");
    } else {
      setCurrentList(
        currentList.map((p) => (p.id === editingPerson.id ? editingPerson : p))
      );
      Swal.fire(
        "¡Actualizado!",
        `${typeName} actualizado correctamente.`,
        "success"
      );
    }
    setEditingPerson(null); // Salir del modo edición/adición
    setIsAddingNew(false);
  };

  const cancelarEdicion = () => {
    setEditingPerson(null);
    setIsAddingNew(false);
  };

  // --- Renderizado del Formulario de Edición/Creación ---
  const renderFormFields = (data, type) => {
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nombre
          </label>
          <input
            type="text"
            name="nombre"
            value={data.nombre || ""}
            onChange={manejarCambioCampo}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={data.email || ""}
            onChange={manejarCambioCampo}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Teléfono
          </label>
          <input
            type="text"
            name="telefono"
            value={data.telefono || ""}
            onChange={manejarCambioCampo}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        {type === "clientes" && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Membresía
            </label>
            <input
              type="text"
              name="membresia"
              value={data.membresia || ""}
              onChange={manejarCambioCampo}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        )}
        {type === "usuariosGenerales" && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Rol Asignado
            </label>
            <input
              type="text"
              name="rolAsignado"
              value={data.rolAsignado || ""}
              onChange={manejarCambioCampo}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        )}
        {type === "instructores" && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Especialidad
            </label>
            <input
              type="text"
              name="especialidad"
              value={data.especialidad || ""}
              onChange={manejarCambioCampo}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        )}
        {type === "empleados" && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cargo
            </label>
            <input
              type="text"
              name="cargo"
              value={data.cargo || ""}
              onChange={manejarCambioCampo}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        )}
        {type === "gerentes" && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Departamento
            </label>
            <input
              type="text"
              name="departamento"
              value={data.departamento || ""}
              onChange={manejarCambioCampo}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Estado
          </label>
          <select
            name="estado"
            value={data.estado || "activo"}
            onChange={manejarCambioCampo}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>
      </div>
    );
  };

  // --- Renderizado de cada pestaña del CRUD ---
  const renderCrudTab = (type) => {
    let currentList, setCurrentList, columns, typeName;
    let Icon;

    switch (type) {
      case "clientes":
        currentList = clientes;
        setCurrentList = setClientes;
        columns = ["nombre", "email", "telefono", "membresia", "estado"];
        typeName = "cliente";
        Icon = FaUsers;
        break;
      case "usuariosGenerales":
        currentList = usuariosGenerales;
        setCurrentList = setUsuariosGenerales;
        columns = ["nombre", "email", "rolAsignado", "estado"];
        typeName = "usuario";
        Icon = FaUser;
        break;
      case "instructores":
        currentList = instructores;
        setCurrentList = setInstructores;
        columns = ["nombre", "email", "especialidad", "telefono", "estado"];
        typeName = "instructor";
        Icon = FaChalkboardTeacher;
        break;
      case "empleados":
        currentList = empleados;
        setCurrentList = setEmpleados;
        columns = ["nombre", "email", "cargo", "telefono", "estado"];
        typeName = "empleado";
        Icon = FaBriefcase;
        break;
      case "gerentes":
        currentList = gerentes;
        setCurrentList = setGerentes;
        columns = ["nombre", "email", "departamento", "telefono", "estado"];
        typeName = "gerente";
        Icon = FaUserTie;
        break;
      default:
        return null;
    }

    if (editingPerson && (editingPerson.id || isAddingNew)) {
      // Modo edición o adición
      return (
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Icon className="mr-2" />{" "}
            {isAddingNew ? `Agregar ${typeName}` : `Editar ${typeName}`}
          </h3>
          {renderFormFields(editingPerson, type)}
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={cancelarEdicion}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center"
            >
              <FaTimes className="mr-2" /> Cancelar
            </button>
            <button
              onClick={() =>
                guardarCambios(currentList, setCurrentList, typeName)
              }
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center"
            >
              <FaSave className="mr-2" /> Guardar
            </button>
          </div>
        </div>
      );
    }

    // Modo lista
    return (
      <div className="p-4">
        <div className="flex justify-end mb-4">
          <button
            onClick={iniciarCreacion}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
          >
            <FaPlus className="mr-2" /> Agregar {typeName}
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {col
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}{" "}
                    {/* Formatear nombres de columnas */}
                  </th>
                ))}
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentList.map((item) => (
                <tr key={item.id}>
                  {columns.map((col) => (
                    <td
                      key={`${item.id}-${col}`}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {item[col]}
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <button
                      onClick={() => iniciarEdicion(item)}
                      className="text-blue-600 hover:text-blue-900 mr-3 p-1 rounded-full hover:bg-blue-100 transition"
                      title="Editar"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() =>
                        eliminarPersona(
                          currentList,
                          setCurrentList,
                          item.id,
                          typeName
                        )
                      }
                      className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-100 transition"
                      title="Eliminar"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col">
        {/* Encabezado del Modal */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gray-50 rounded-t-xl">
          <h2 className="text-2xl font-bold text-gray-900">
            Gestión de Personas del Sistema
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Navegación de Pestañas */}
        <div className="flex border-b border-gray-200 bg-white">
          <button
            onClick={() => setActiveTab("clientes")}
            className={`flex-1 py-3 text-center text-lg font-medium transition-colors duration-200 ${
              activeTab === "clientes"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <FaUsers className="inline-block mr-2" /> Clientes
          </button>
          <button
            onClick={() => setActiveTab("usuariosGenerales")}
            className={`flex-1 py-3 text-center text-lg font-medium transition-colors duration-200 ${
              activeTab === "usuariosGenerales"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <FaUser className="inline-block mr-2" /> Usuarios Generales
          </button>
          <button
            onClick={() => setActiveTab("instructores")}
            className={`flex-1 py-3 text-center text-lg font-medium transition-colors duration-200 ${
              activeTab === "instructores"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <FaChalkboardTeacher className="inline-block mr-2" /> Instructores
          </button>
          <button
            onClick={() => setActiveTab("empleados")}
            className={`flex-1 py-3 text-center text-lg font-medium transition-colors duration-200 ${
              activeTab === "empleados"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <FaBriefcase className="inline-block mr-2" /> Empleados
          </button>
          <button
            onClick={() => setActiveTab("gerentes")}
            className={`flex-1 py-3 text-center text-lg font-medium transition-colors duration-200 ${
              activeTab === "gerentes"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <FaUserTie className="inline-block mr-2" /> Gerentes
          </button>
        </div>

        {/* Contenido del Modal (Cuerpo del CRUD) */}
        <div className="flex-grow overflow-y-auto p-4 bg-gray-50">
          {activeTab === "clientes" && renderCrudTab("clientes")}
          {activeTab === "usuariosGenerales" &&
            renderCrudTab("usuariosGenerales")}
          {activeTab === "instructores" && renderCrudTab("instructores")}
          {activeTab === "empleados" && renderCrudTab("empleados")}
          {activeTab === "gerentes" && renderCrudTab("gerentes")}
        </div>
      </div>
    </div>
  );
};

export default UniversalPeopleCrudModal;
