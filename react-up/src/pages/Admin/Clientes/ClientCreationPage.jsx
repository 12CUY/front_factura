import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import PropTypes from "prop-types"; // Importamos PropTypes

// Componente InputCard con validación de props
const InputCard = ({ children, title, delay }) => (
  <div
    className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer border border-transparent hover:border-white/30 p-6
      ${delay ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
    style={{
      transitionDelay: `${delay}ms`,
      animation: `${delay ? "fadeInUp 0.5s ease-out" : ""}`,
    }}
  >
    {title && (
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <span className="bg-blue-100 text-blue-500 rounded-full p-2 mr-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        {title}
      </h3>
    )}
    <div className="space-y-4">{children}</div>
  </div>
);

// Validación de props para InputCard
InputCard.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  delay: PropTypes.number.isRequired,
};

const ClientCreationPage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    email: "",
    telefono: "",
    direccion: "",
    fechaNacimiento: "",
    tipoCliente: "regular",
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validación básica
      if (
        !formData.nombre ||
        !formData.apellido ||
        !formData.cedula ||
        !formData.email ||
        !formData.telefono ||
        !formData.direccion
      ) {
        await Swal.fire({
          title: "Campos requeridos",
          text: "Por favor complete todos los campos obligatorios",
          icon: "warning",
          confirmButtonText: "Entendido",
        });
        return;
      }

      console.log("Datos del cliente:", formData);
      // Simulación de éxito en el registro
      await Swal.fire({
        title: "¡Éxito!",
        text: "El cliente ha sido registrado correctamente",
        icon: "success",
        confirmButtonText: "Aceptar",
      });

      navigate("/clientes/lista");
    } catch (error) {
      await Swal.fire({
        title: "Error",
        text: "Ocurrió un error al registrar el cliente",
        icon: "error",
        confirmButtonText: "Entendido",
      });
    }
  };

  return (
    <div
      className="min-h-screen pt-16"
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
        <div className="mb-8 text-center lg:text-left">
          <h1 className="text-3xl font-bold text-gray-900">
            Crear Nuevo Cliente
          </h1>
          <p className="text-gray-600 mt-2">
            Ingrese los datos del nuevo cliente para su registro en el sistema
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Card 1: Información Personal */}
          <InputCard title="Información Personal" delay={isVisible ? 100 : 0}>
            <div>
              <label
                htmlFor="nombre"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nombre*
              </label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                placeholder="Nombre completo"
              />
            </div>
            <div>
              <label
                htmlFor="apellido"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Apellido*
              </label>
              <input
                id="apellido"
                name="apellido"
                type="text"
                value={formData.apellido}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                placeholder="Apellido completo"
              />
            </div>
            <div>
              <label
                htmlFor="cedula"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Cédula/RUC*
              </label>
              <input
                id="cedula"
                name="cedula"
                type="text"
                value={formData.cedula}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                placeholder="Número de identificación"
              />
            </div>
          </InputCard>

          {/* Card 2: Información de Contacto */}
          <InputCard
            title="Información de Contacto"
            delay={isVisible ? 200 : 0}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email*
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                placeholder="correo@ejemplo.com"
              />
            </div>
            <div>
              <label
                htmlFor="telefono"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Teléfono*
              </label>
              <input
                id="telefono"
                name="telefono"
                type="tel"
                value={formData.telefono}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                placeholder="+593 XX XXX XXXX"
              />
            </div>
            <div>
              <label
                htmlFor="direccion"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Dirección*
              </label>
              <input
                id="direccion"
                name="direccion"
                type="text"
                value={formData.direccion}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                placeholder="Dirección completa"
              />
            </div>
          </InputCard>

          {/* Card 3: Información Adicional */}
          <InputCard title="Información Adicional" delay={isVisible ? 300 : 0}>
            <div>
              <label
                htmlFor="fechaNacimiento"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Fecha Nacimiento
              </label>
              <input
                id="fechaNacimiento"
                name="fechaNacimiento"
                type="date"
                value={formData.fechaNacimiento}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              />
            </div>
            <div>
              <label
                htmlFor="tipoCliente"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Tipo de Cliente
              </label>
              <select
                id="tipoCliente"
                name="tipoCliente"
                value={formData.tipoCliente}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              >
                <option value="regular">Regular</option>
                <option value="premium">Premium</option>
                <option value="corporativo">Corporativo</option>
              </select>
            </div>
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
              >
                Registrar Cliente
              </button>
            </div>
          </InputCard>
        </form>
      </div>
    </div>
  );
};

export default ClientCreationPage;
