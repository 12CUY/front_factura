import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [scrolled]);

  const activar = (id) => {
    const botones = document.querySelectorAll("#menu > button:not(#logout)");
    botones.forEach((btn) => {
      btn.classList.remove("bg-[#9ACFE2]", "text-white");
      btn.classList.add("text-[#2C3E50]");
    });

    if (id !== "logout") {
      const activo = document.getElementById(id);
      if (activo) {
        activo.classList.add("bg-[#9ACFE2]", "text-white");
        activo.classList.remove("text-[#2C3E50]");
      }
    }
  };

  const handleNavigation = (route) => {
    navigate(route);
    activar(route.substring(1));
  };

  const handleLogout = () => {
    console.log("Cerrando sesión...");
    navigate("/");
  };

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/30 backdrop-blur-sm shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="w-full flex justify-center">
        <div
          id="menu"
          className="flex bg-[#D5DEE3] rounded-full shadow-lg px-4 sm:px-6 py-2 gap-2 sm:gap-4"
        >
          {/* Dashboard */}
          <button
            onClick={() => handleNavigation("/dashboard")}
            id="dashboard"
            className="flex flex-col items-center justify-center rounded-full px-3 sm:px-4 py-2 text-[#2C3E50] bg-[#9ACFE2] text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 sm:h-6 sm:w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
            </svg>
            {!isMobile && (
              <span className="text-xs sm:text-sm font-medium">Dashboard</span>
            )}
          </button>

          {/* Actividades */}
          <button
            onClick={() => handleNavigation("/dashboardA")}
            id="actividades"
            className="flex flex-col items-center justify-center rounded-full px-3 sm:px-4 py-2 text-[#2C3E50]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 sm:h-6 sm:w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z"/>
            </svg>
            {!isMobile && (
              <span className="text-xs sm:text-sm font-medium">Actividades</span>
            )}
          </button>

          {/* Usuarios */}
          <button
            onClick={() => handleNavigation("/dashboardU")}
            id="usuarios"
            className="flex flex-col items-center justify-center rounded-full px-3 sm:px-4 py-2 text-[#2C3E50]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 sm:h-6 sm:w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            {!isMobile && (
              <span className="text-xs sm:text-sm font-medium">Usuarios</span>
            )}
          </button>

          {/* Gestión Comercial */}
          <button
            onClick={() => handleNavigation("/dashboardC")}
            id="comercial"
            className="flex flex-col items-center justify-center rounded-full px-3 sm:px-4 py-2 text-[#2C3E50]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 sm:h-6 sm:w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M16 6V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4v2h16V6h-4zm-6-2h4v2h-4V4zM4 18v-2h16v2H4zm0-4v-2h16v2H4z"/>
            </svg>
            {!isMobile && (
              <span className="text-xs sm:text-sm font-medium">Comercial</span>
            )}
          </button>

          {/* Entrenamiento
          <button
            onClick={() => handleNavigation("/dashboardE")}
            id="entrenamiento"
            className="flex flex-col items-center justify-center rounded-full px-3 sm:px-4 py-2 text-[#2C3E50]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 sm:h-6 sm:w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.82V9L12 3z"/>
            </svg>
            {!isMobile && (
              <span className="text-xs sm:text-sm font-medium">Entrenamiento</span>
            )}
          </button> */}

          {/* Inventario 
          <button
            onClick={() => handleNavigation("/dashboardI")}
            id="inventario"
            className="flex flex-col items-center justify-center rounded-full px-3 sm:px-4 py-2 text-[#2C3E50]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 sm:h-6 sm:w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20 2H4c-1 0-2 .9-2 2v3.01c0 .72.43 1.34 1 1.69V20c0 1.1 1.1 2 2 2h14c.9 0 2-.9 2-2V8.7c.57-.35 1-.97 1-1.69V4c0-1.1-1-2-2-2zm-5 12H9v-2h6v2zm3-4H6V4h12v6z"/>
            </svg>
            {!isMobile && (
              <span className="text-xs sm:text-sm font-medium">Inventario</span>
            )}
          </button>*/}


          {/* Salir */}
          <button
            onClick={handleLogout}
            id="logout"
            className="flex flex-col items-center justify-center rounded-full px-1 py-1 bg-red-500 text-white hover:bg-red-600 transition-colors"
            title="Cerrar sesión"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-4 h-5 w-5 sm:h-6 sm:w-6"
            >
              <path
                fillRule="evenodd"
                d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6Zm-5.03 4.72a.75.75 0 0 0 0 1.06l1.72 1.72H2.25a.75.75 0 0 0 0 1.5h10.94l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 0 0-1.06 0Z"
                clipRule="evenodd"
              />
            </svg>
            {!isMobile && (
              <span className="text-xs sm:text-sm font-medium">Salir</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;