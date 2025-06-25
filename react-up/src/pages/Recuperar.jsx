import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const RecuperarContraseña = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1 = Ingresar email, 2 = Ingresar nueva contraseña
  const [navigatingTo, setNavigatingTo] = useState("");

  const handleNavigation = (route) => {
    setNavigatingTo(route);
    setLoading(true);
    
    setTimeout(() => {
      navigate(route);
    }, 1000);
  };

  const handleSubmitEmail = (e) => {
    e.preventDefault();

    if (!email) {
      Swal.fire({
        title: "Error",
        text: "Por favor ingresa tu correo electrónico",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    setLoading(true);
    setNavigatingTo("step2");

    // Simulación de verificación de correo
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1500);
  };

  const handleSubmitNewPassword = (e) => {
    e.preventDefault();

    if (!newPassword) {
      Swal.fire({
        title: "Error",
        text: "Por favor ingresa tu nueva contraseña",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    setLoading(true);
    setNavigatingTo("/");

    // Simulación de actualización de contraseña
    setTimeout(() => {
      setLoading(false);
      Swal.fire({
        title: "Contraseña actualizada",
        text: "Tu contraseña ha sido cambiada exitosamente",
        icon: "success",
        confirmButtonText: "Iniciar sesión",
      }).then(() => {
        navigate("/");
      });
    }, 1500);
  };

  if (loading) {
    let loadingText = "Procesando...";
    if (navigatingTo === "/") loadingText = "Redirigiendo a login...";
    if (navigatingTo === "step2") loadingText = "Verificando correo...";
    if (step === 2 && navigatingTo === "/") loadingText = "Actualizando contraseña...";

    return (
      <div className="flex items-center justify-center h-screen bg-[url('/recuperar.jpg')] bg-cover bg-center px-4">
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
    <div className="flex justify-center items-center h-screen bg-cover bg-center bg-[url('/recuperar.jpg')]">
      <motion.div
        className="flex w-full max-w-4xl bg-[#D5DEE3] rounded-lg shadow-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div
          className="hidden lg:block w-full lg:w-1/2 h-[300px] lg:h-auto bg-cover bg-center bg-no-repeat rounded-lg overflow-hidden"
          style={{ backgroundImage: "url('/recuperar.jpg')" }}
        ></div>

        <div className="w-full lg:w-1/2 p-8">
          <h2 className="text-4xl font-bold text-center text-[#2C3E50] mb-6">
            {step === 1 ? "Recuperar Contraseña" : "Nueva Contraseña"}
          </h2>

          {step === 1 ? (
            <form onSubmit={handleSubmitEmail}>
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
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ingresa tu correo electrónico registrado"
                  className="w-full p-3 border-none bg-white rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
                />
              </motion.div>

              <button
                type="submit"
                className="w-full py-3 bg-[#2C3E50] text-white rounded-lg hover:bg-[#1F2C3C] transition duration-200 font-bold"
              >
                Continuar
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmitNewPassword}>
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
              >
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-[#2C3E50]"
                >
                  Nueva Contraseña
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Ingresa tu nueva contraseña"
                  className="w-full p-3 border-none bg-white rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
                />
              </motion.div>

              <button
                type="submit"
                className="w-full py-3 bg-[#2C3E50] text-white rounded-lg hover:bg-[#1F2C3C] transition duration-200 font-bold"
              >
                Cambiar Contraseña
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-[#2C3E50]">
              {step === 1 ? (
                <>
                  ¿Recordaste tu contraseña?{" "}
                  <button
                    onClick={() => handleNavigation("/")}
                    className="text-[#2C3E50] hover:text-[#1F2C3C] font-semibold"
                  >
                    Inicia sesión aquí
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setStep(1)}
                  className="text-[#2C3E50] hover:text-[#1F2C3C] font-semibold"
                >
                  Volver atrás
                </button>
              )}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RecuperarContraseña;