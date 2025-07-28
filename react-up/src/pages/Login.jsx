import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false); // Consider renaming this for clarity, as it's not just about data loading but auth success
  const [navigatingTo, setNavigatingTo] = useState("");

  const handleNavigation = (route) => {
    setNavigatingTo(route);
    setLoading(true);

    setTimeout(() => {
      navigate(route);
    }, 1000);
  };

  const handleLogin = async (e) => { // Made async
    e.preventDefault();

    if (!email || !password) {
      Swal.fire({
        title: "Error",
        text: "Por favor, ingresa tu correo y contraseña.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    setLoading(true);
    setNavigatingTo("/dashboard"); // Indicate login attempt

    try {
      const response = await fetch('http://localhost:3000/api/auth/signin', { // Your backend login endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correo: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Assuming your backend sends a success message or user data on successful login
        Swal.fire({
          title: "Bienvenido",
          text: data.message || "Has iniciado sesión correctamente.",
          icon: "success",
          confirmButtonText: "Continuar",
        }).then(() => {
          setLoading(false);
          setDataLoaded(true); // Indicate successful authentication

          // Short delay before navigating to dashboard for visual feedback
          setTimeout(() => {
            navigate("/dashboard");
          }, 200);
        });
      } else {
        // Handle login errors from the backend
        Swal.fire({
          title: "Error de Credenciales",
          text: data.message || "Correo o contraseña incorrectos. Por favor, inténtalo de nuevo.",
          icon: "error",
          confirmButtonText: "Intentar de nuevo",
        });
        setLoading(false);
        setNavigatingTo("");
      }
    } catch (error) {
      console.error('Error during login:', error);
      Swal.fire({
        title: "Error de Conexión",
        text: "No se pudo conectar con el servidor. Por favor, inténtalo de nuevo más tarde.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      setLoading(false);
      setNavigatingTo("");
    }
  };

  if (loading) {
    let loadingText = "Cargando...";
    if (navigatingTo === "/registro") loadingText = "Redirigiendo a registro...";
    if (navigatingTo === "/recuperar") loadingText = "Redirigiendo a recuperación...";
    if (navigatingTo === "/dashboard") loadingText = "Iniciando sesión...";

    return (
      <div className="flex items-center justify-center h-screen bg-[url('/gimnasiologin.jpg')] bg-cover bg-center px-4">
        <div className="text-center bg-white bg-opacity-90 p-8 rounded-lg">
          <div className="border-t-4 border-[#2C3E50] border-solid w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg sm:text-xl md:text-2xl text-[#2C3E50]">
            {loadingText}
          </p>
        </div>
      </div>
    );
  }

  // This `dataLoaded` state might be redundant if `loading` handles all transitions.
  // Consider if you really need a separate "Datos cargados con éxito!" screen,
  // or if navigating directly to dashboard after success is sufficient.
  if (dataLoaded) {
    return (
      <div className="flex items-center justify-center h-screen bg-[url('/gimnasiologin.jpg')] bg-cover bg-center px-4">
        <div className="text-center bg-white bg-opacity-90 p-8 rounded-lg">
          <p className="text-lg sm:text-xl md:text-2xl text-[#2C3E50]">
            ¡Inicio de sesión exitoso!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-cover bg-center bg-[url('/gimnasiologin.jpg')]">
      <motion.div
        className="flex w-full max-w-4xl bg-[#D5DEE3] rounded-lg shadow-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div
          className="hidden lg:block w-full lg:w-1/2 h-[300px] lg:h-auto bg-cover bg-center bg-no-repeat rounded-lg overflow-hidden"
          style={{ backgroundImage: "url('/gimnasiologin.jpg')" }}
        ></div>

        <div className="w-full lg:w-1/2 p-8">
          <h2 className="text-4xl font-bold text-center text-[#2C3E50] mb-6">
            Iniciar Sesión
          </h2>
          <form onSubmit={handleLogin}>
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
                placeholder="Ingresa tu contraseña"
                className="w-full p-3 border-none bg-white rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
              />
            </motion.div>
            <button
              type="submit"
              className="w-full py-3 bg-[#2C3E50] text-white rounded-lg hover:bg-[#1F2C3C] transition duration-200 font-bold"
            >
              Iniciar Sesión
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-[#2C3E50]">
              ¿No tienes una cuenta?{" "}
              <button
                onClick={() => handleNavigation("/registro")}
                className="text-[#2C3E50] hover:text-[#1F2C3C] font-semibold"
              >
                Regístrate aquí
              </button>
            </p>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-[#2C3E50]">
              <button
                onClick={() => handleNavigation("/recuperar")}
                className="text-[#2C3E50] hover:text-[#1F2C3C] font-semibold"
              >
                Recuperar contraseña
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;