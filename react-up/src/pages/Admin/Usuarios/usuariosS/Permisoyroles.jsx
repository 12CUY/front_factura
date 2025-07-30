// src/components/usuariosS/Permisoyroles.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  FaUserShield,
  FaSave,
  FaTimes,
  FaArrowLeft,
  FaEdit,
  FaTrash,
} from "react-icons/fa"; // Se agregó FaEye y FaPlus
import UniversalPeopleCrudModal from "./UniversalPeopleCrudModal"; // Importar el nuevo modal

const Permisoyroles = () => {
  const navigate = useNavigate();

  // --- Estado para gestionar Roles del Sistema y Permisos ---
  const [rolesDelSistema, setRolesDelSistema] = useState([
    {
      id: 1,
      nombre: "Administrador",
      permisos: [
        "gestionar_usuarios",
        "ver_reportes",
        "registrar_visitas",
        "gestionar_configuracion",
        "gestionar_roles",
      ],
    },
    {
      id: 2,
      nombre: "Gerente",
      permisos: [
        "ver_reportes",
        "gestionar_empleados",
        "gestionar_instructores",
        "gestionar_clientes",
      ],
    },
    {
      id: 3,
      nombre: "Empleado",
      permisos: ["registrar_visitas", "ver_clientes", "ver_instructores"],
    },
    {
      id: 4,
      nombre: "Instructor",
      permisos: ["gestionar_clases_propias", "ver_horario"],
    },
    {
      id: 5,
      nombre: "Cliente",
      permisos: ["ver_propias_visitas", "reservar_clases"],
    },
  ]);

  const [nombreNuevoRol, setNombreNuevoRol] = useState("");
  const [permisosSeleccionados, setPermisosSeleccionados] = useState([]);
  const [idRolEditando, setIdRolEditando] = useState(null);

  const permisosDisponibles = [
    "gestionar_usuarios",
    "gestionar_roles",
    "ver_reportes",
    "registrar_visitas",
    "gestionar_configuracion",
    "gestionar_empleados",
    "gestionar_instructores",
    "gestionar_clientes",
    "ver_clientes",
    "ver_instructores",
    "gestionar_clases_propias",
    "ver_horario",
    "ver_propias_visitas",
    "reservar_clases",
    "editar_visitas",
    "eliminar_visitas",
  ];

  const manejarCambioPermiso = (permiso) => {
    setPermisosSeleccionados((prev) =>
      prev.includes(permiso)
        ? prev.filter((p) => p !== permiso)
        : [...prev, permiso]
    );
  };

  const manejarAgregarOActualizarRol = (e) => {
    e.preventDefault();
    if (!nombreNuevoRol.trim()) {
      Swal.fire("Error", "El nombre del rol no puede estar vacío.", "error");
      return;
    }

    if (idRolEditando) {
      setRolesDelSistema(
        rolesDelSistema.map((rol) =>
          rol.id === idRolEditando
            ? {
                ...rol,
                nombre: nombreNuevoRol,
                permisos: permisosSeleccionados,
              }
            : rol
        )
      );
      Swal.fire("¡Actualizado!", "Rol actualizado correctamente.", "success");
      setIdRolEditando(null);
    } else {
      const nuevoId = rolesDelSistema.length
        ? Math.max(...rolesDelSistema.map((r) => r.id)) + 1
        : 1;
      setRolesDelSistema([
        ...rolesDelSistema,
        {
          id: nuevoId,
          nombre: nombreNuevoRol,
          permisos: permisosSeleccionados,
        },
      ]);
      Swal.fire("¡Creado!", "Rol creado correctamente.", "success");
    }
    setNombreNuevoRol("");
    setPermisosSeleccionados([]);
  };

  const manejarEditarRol = (rol) => {
    setNombreNuevoRol(rol.nombre);
    setPermisosSeleccionados(rol.permisos);
    setIdRolEditando(rol.id);
  };

  const manejarEliminarRol = (id) => {
    Swal.fire({
      title: "¿Eliminar rol?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setRolesDelSistema(rolesDelSistema.filter((rol) => rol.id !== id));
        Swal.fire("Eliminado", "El rol ha sido eliminado", "success");
      }
    });
  };

  const manejarCancelarEdicion = () => {
    setNombreNuevoRol("");
    setPermisosSeleccionados([]);
    setIdRolEditando(null);
  };

  // --- Estado para el Modal Universal de CRUD de Personas ---
  const [showCrudModal, setShowCrudModal] = useState(false);
  const [modalInitialTab, setModalInitialTab] = useState("clientes"); // Pestaña inicial del modal

  const abrirCrudModal = (tab = "clientes") => {
    setModalInitialTab(tab);
    setShowCrudModal(true);
  };


  return (
    <div
      className="min-h-screen pt-16 pb-8 bg-gray-50"
      style={{
        backgroundImage: "url('/gimnasio_usarios.jpg')", // Asumiendo que login.jpg es tu fondo
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black/10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center sm:text-4xl lg:text-5xl">
          <FaUserShield className="inline-block mr-3 text-blue-600" /> Gestión
          de Permisos y Usuarios
        </h1>

        {/* Botón para abrir el Modal Universal de Gestión de Personas */}
        <div className="text-center mb-10">
          <button
            onClick={() => abrirCrudModal("clientes")} // Abre el modal por defecto en la pestaña de clientes
            className="px-8 py-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300 ease-in-out flex items-center justify-center mx-auto text-lg"
          >
            <FaUserShield className="inline-block mr-3 text-xl" /> Ver y
            Gestionar Todas las Personas
          </button>
        </div>

        {/* --- Primera Sección: Gestión de Roles del Sistema y Permisos --- */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 backdrop-blur-sm bg-white/80">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
            <FaUserShield className="mr-2 text-purple-600" /> Roles del Sistema
            y Permisos
          </h2>

          {/* Contenedor del Grid para Formulario y Lista de Roles */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Formulario para agregar/editar roles */}
            <div className="p-6 bg-gray-100 rounded-lg shadow-inner">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                {idRolEditando ? "Editar Rol Existente" : "Crear Nuevo Rol"}
              </h3>
              <form onSubmit={manejarAgregarOActualizarRol}>
                <div className="mb-4">
                  <label
                    htmlFor="nombreRol"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Nombre del Rol
                  </label>
                  <input
                    type="text"
                    id="nombreRol"
                    value={nombreNuevoRol}
                    onChange={(e) => setNombreNuevoRol(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Permisos
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {" "}
                    {/* Ajustado a 2 columnas para más espacio */}
                    {permisosDisponibles.map((permiso) => (
                      <div key={permiso} className="flex items-center">
                        <input
                          type="checkbox"
                          id={permiso}
                          checked={permisosSeleccionados.includes(permiso)}
                          onChange={() => manejarCambioPermiso(permiso)}
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label
                          htmlFor={permiso}
                          className="ml-2 text-sm text-gray-700"
                        >
                          {permiso.replace(/_/g, " ")}{" "}
                          {/* Muestra los permisos de forma legible */}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end space-x-4">
                  {idRolEditando && (
                    <button
                      type="button"
                      onClick={manejarCancelarEdicion}
                      className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition flex items-center justify-center"
                    >
                      <FaTimes className="inline-block mr-2" /> Cancelar
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center justify-center"
                  >
                    <FaSave className="inline-block mr-2" />{" "}
                    {idRolEditando ? "Actualizar Rol" : "Guardar Rol"}
                  </button>
                </div>
              </form>
            </div>

            {/* Lista de roles existentes */}
            <div className="p-6 bg-gray-100 rounded-lg shadow-inner">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Roles Definidos
              </h3>
              <div className="overflow-x-auto bg-gray-50 p-4 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Nombre del Rol
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Permisos
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {rolesDelSistema.map((rol) => (
                      <tr key={rol.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {rol.nombre}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {rol.permisos.length > 0
                            ? rol.permisos
                                .map((p) => p.replace(/_/g, " "))
                                .join(", ")
                            : "Ninguno"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                          <button
                            onClick={() => manejarEditarRol(rol)}
                            className="text-blue-600 hover:text-blue-900 mr-3 p-1 rounded-full hover:bg-blue-100 transition"
                            title="Editar Rol"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => manejarEliminarRol(rol.id)}
                            className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-100 transition"
                            title="Eliminar Rol"
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
          </div>
        </div>



        {/* Botón de volver */}
        <div className="text-center mt-10">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center justify-center mx-auto"
          >
            <FaArrowLeft className="inline-block mr-2" /> Volver al Panel
          </button>
        </div>
      </div>

      {/* Modal Universal de CRUD de Personas */}
      <UniversalPeopleCrudModal
        isOpen={showCrudModal}
        onClose={() => setShowCrudModal(false)}
        initialTab={modalInitialTab}
      />
    </div>
  );
};

export default Permisoyroles;
