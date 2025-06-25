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
    <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-sm shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="w-full flex justify-center">
        <div
          id="menu"
          className="flex bg-[#D5DEE3] rounded-full shadow-lg px-4 sm:px-6 py-2 gap-2 sm:gap-4"
        >
          <button
            onClick={() => handleNavigation("/facturacion")}
            id="facturacion"
            className="flex flex-col items-center justify-center rounded-full px-3 sm:px-4 py-2 text-[#2C3E50] bg-[#9ACFE2] text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 sm:h-6 sm:w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21 8V7l-3 2-3-2v1l3 2 3-2zm-6 4v1l3 2 3-2v-1l-3 2-3-2zm-6 3h5v2H9v-2zm0-4h8v2H9v-2zm0-4h8v2H9V7zm-6 3h2v10H3V10z" />
            </svg>
            {!isMobile && (
              <span className="text-xs sm:text-sm font-medium">Facturación</span>
            )}
          </button>

          <button
            onClick={() => handleNavigation("/metodo-de-pago")}
            id="metodo-de-pago"
            className="flex flex-col items-center justify-center rounded-full px-3 sm:px-4 py-2 text-[#2C3E50]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 sm:h-6 sm:w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M4 6h16v2H4zm0 4h16v10H4zm2 2v2h4v-2H6z" />
            </svg>
            {!isMobile && (
              <span className="text-xs sm:text-sm font-medium">Método de pago</span>
            )}
          </button>

          <button
            onClick={() => handleNavigation("/clientes")}
            id="clientes"
            className="flex flex-col items-center justify-center rounded-full px-3 sm:px-4 py-2 text-[#2C3E50]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 sm:h-6 sm:w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V20h14v-3.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V20h6v-3.5c0-2.33-4.67-3.5-7-3.5z" />
            </svg>
            {!isMobile && (
              <span className="text-xs sm:text-sm font-medium">Clientes</span>
            )}
          </button>

          <button
            onClick={() => handleNavigation("/historial")}
            id="historial"
            className="flex flex-col items-center justify-center rounded-full px-3 sm:px-4 py-2 text-[#2C3E50]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 sm:h-6 sm:w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M13 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9h-2c0 3.87-3.13 7-7 7s-7-3.13-7-7 3.13-7 7-7V3zm0 5h-1v5h5v-1h-4V8z" />
            </svg>
            {!isMobile && (
              <span className="text-xs sm:text-sm font-medium">Historial</span>
            )}
          </button>

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