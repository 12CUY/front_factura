import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUserPlus } from "react-icons/fi";
import Swal from "sweetalert2";

const Registro = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [navigatingTo, setNavigatingTo] = useState("");

  const handleNavigation = (route) => {
    setNavigatingTo(route);
    setLoading(true);
    setTimeout(() => {
      navigate(route);
    }, 1000);
  };

  const handleRegistro = (e) => {
    e.preventDefault();

    if (!email || !password || !username || !phoneNumber) {
      Swal.fire({
        title: "Error",
        text: "Todos los campos son requeridos",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    setLoading(true);
    setNavigatingTo("/dashboard");

    // Simulación de registro
    setTimeout(() => {
      Swal.fire({
        title: "Registro Exitoso",
        text: "Te has registrado correctamente",
        icon: "success",
        confirmButtonText: "Ir al Dashboard",
      }).then(() => {
        navigate("/dashboard");
      });
    }, 1500);
  };

  if (loading) {
    let loadingText = "Procesando...";
    if (navigatingTo === "/") loadingText = "Redirigiendo a login...";
    if (navigatingTo === "/dashboard") loadingText = "Completando registro...";

    return (
      <div className="flex items-center justify-center h-screen bg-[url('/gimnasioregistro.jpg')] bg-cover bg-center px-4">
        <div className="text-center bg-white bg-opacity-90 p-8 rounded-lg">
          <div className="border-t-4 border-[#2C3E50] border-solid w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg sm:text-xl md:text-2xl text-[#2C3E50]">
            {loadingText}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-cover bg-center bg-[url('/gimnasioregistro.jpg')]">
      <motion.div
        className="flex w-full max-w-4xl bg-[#D5DEE3] rounded-lg shadow-xl"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      >
        <div
          className="hidden lg:block w-full lg:w-1/2 h-[300px] lg:h-auto bg-cover bg-center bg-no-repeat rounded-lg overflow-hidden"
          style={{ backgroundImage: "url('/gimnasioregistro.jpg')" }}
        ></div>

        <div className="w-full lg:w-1/2 p-8">
          <h2 className="text-4xl font-bold text-center text-[#2C3E50] mb-6">
            Regístrate
          </h2>
          <form onSubmit={handleRegistro}>
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            >
              <label
                htmlFor="username"
                className="block text-sm font-medium text-[#2C3E50]"
              >
                Nombre de Usuario
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ingresa tu nombre de usuario"
                className="w-full p-3 border-none bg-white rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
              />
            </motion.div>
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            >
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#2C3E50]"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu correo electrónico"
                className="w-full p-3 border-none bg-white rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
              />
            </motion.div>
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            >
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-[#2C3E50]"
              >
                Número de Teléfono
              </label>
              <input
                type="tel"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Ingresa tu número de teléfono"
                className="w-full p-3 border-none bg-white rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
              />
            </motion.div>
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            >
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#2C3E50]"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Crea una contraseña"
                className="w-full p-3 border-none bg-white rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
              />
            </motion.div>
            <button
              type="submit"
              className="w-full py-3 bg-[#2C3E50] text-white rounded-lg flex items-center justify-center gap-2 hover:bg-[#1F2C3C] transition duration-200 font-bold"
            >
              <FiUserPlus /> Registrar
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-[#2C3E50]">
              ¿Ya tienes una cuenta?{" "}
              <button
                onClick={() => handleNavigation("/")}
                className="text-[#2C3E50] hover:text-[#1F2C3C] font-semibold"
              >
                Inicia sesión aquí
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Registro;