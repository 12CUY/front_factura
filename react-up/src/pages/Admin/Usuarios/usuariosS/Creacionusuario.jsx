// src/components/usuariosS/Creacionusuario.jsx

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaUserPlus, FaSave, FaTimes, FaRedo } from 'react-icons/fa'; // Added FaInfoCircle for the third card

const Creacionusuario = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    cedula: '',
    genero: '',
    rol: '',
    password: '',
    confirmPassword: ''
  });

  const [availableRoles, setAvailableRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      const rolesFromApi = [
        { id: 1, nombre: 'Administrador' },
        { id: 2, nombre: 'Gerente' },
        { id: 3, nombre: 'Empleado' },
        { id: 4, nombre: 'Instructor' },
        { id: 5, nombre: 'Cliente' },
        { id: 6, nombre: 'Visitante' }
      ];
      setAvailableRoles(rolesFromApi);
    };
    fetchRoles();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setUserData({
      nombre: '',
      apellido: '',
      email: '',
      cedula: '',
      genero: '',
      rol: '',
      password: '',
      confirmPassword: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = ['nombre', 'apellido', 'email', 'cedula', 'genero', 'rol', 'password', 'confirmPassword'];
    for (const field of requiredFields) {
      if (!userData[field]) {
        Swal.fire('Error', `El campo "${field}" es obligatorio.`, 'error');
        return;
      }
    }

    if (userData.password !== userData.confirmPassword) {
      Swal.fire('Error', 'Las contraseñas no coinciden.', 'error');
      return;
    }

    if (userData.password.length < 6) {
      Swal.fire('Error', 'La contraseña debe tener al menos 6 caracteres.', 'error');
      return;
    }

    console.log('Datos del nuevo usuario a registrar:', userData);

    Swal.fire({
      title: '¡Usuario Registrado!',
      text: 'El usuario ha sido registrado con éxito (simulado).',
      icon: 'success',
      confirmButtonText: 'Ok'
    }).then(() => {
      resetForm();
    });
  };

  return (
    <div
      className="min-h-screen pt-16 pb- bg-gray-50 flex items-center justify-center"
      style={{
        backgroundImage: "url('/gimnasio_usarios.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay semitransparente */}
      <div className="absolute inset-0 bg-black/10"></div>

      {/* Contenedor principal del formulario, ajustado a max-w-5xl para acomodar 3 columnas */}
      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-4 py-1.5 bg-white/80 rounded-xl shadow-lg relative z-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center sm:text-4xl lg:text-4xl">
          <FaUserPlus className="inline-block mr-3 text-blue-600" /> Creación de Usuario
        </h1>

        <p className="text-gray-600 text-center mb-6">
          Completa los siguientes campos para registrar un nuevo usuario en el sistema.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contenedor de las TRES "cards" principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Ajustado a lg:grid-cols-3 */}

            {/* Card 1: Información Personal */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Datos Personales</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={userData.nombre}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="apellido" className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                  <input
                    type="text"
                    id="apellido"
                    name="apellido"
                    value={userData.apellido}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="genero" className="block text-sm font-medium text-gray-700 mb-1">Género</label>
                  <select
                    id="genero"
                    name="genero"
                    value={userData.genero}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-sm"
                  >
                    <option value="">Selecciona tu género</option>
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Card 2: Contacto y Cédula */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Contacto y Documento</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="cedula" className="block text-sm font-medium text-gray-700 mb-1">Cédula</label>
                  <input
                    type="text"
                    id="cedula"
                    name="cedula"
                    value={userData.cedula}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-sm"
                  />
                </div>
                 {/* Espacio para futuros campos adicionales o dejarlo así */}
                 <div className="h-10"></div> {/* Espacio en blanco para rellenar si es necesario */}
              </div>
            </div>

            {/* Card 3: Configuración de Cuenta y Acciones */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Cuenta y Acceso</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="rol" className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
                  <select
                    id="rol"
                    name="rol"
                    value={userData.rol}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-sm"
                  >
                    <option value="">Selecciona un rol</option>
                    {availableRoles.map(rol => (
                      <option key={rol.id} value={rol.nombre.toLowerCase()}>{rol.nombre}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={userData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirmar Contraseña</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={userData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-sm"
                  />
                </div>
              </div>
            </div>
          </div> {/* Fin del contenedor de las tres cards principales */}

          {/* Botones de acción - Mantenemos la justificación al final del formulario principal */}
          <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 mt-8 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={resetForm}
              className="px-5 py-2 text-sm bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition flex items-center justify-center w-full sm:w-auto"
            >
              <FaRedo className="inline-block mr-2" /> Limpiar
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-5 py-2 text-sm bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition flex items-center justify-center w-full sm:w-auto"
            >
              <FaTimes className="inline-block mr-2" /> Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center w-full sm:w-auto"
            >
              <FaSave className="inline-block mr-2" /> Guardar Usuario
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default Creacionusuario;