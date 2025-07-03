import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import invoicesAnimation from "../../../animation/invoces.json"; // Corrige ruta si es necesario


const DashboardF = () => {
  const navigate = useNavigate();
  const cards = [
    {
      id: 1,
      title: "Creación de Factura",
      description: "Generar nueva factura electrónica",
      icon: "https://cdn-icons-png.flaticon.com/512/942/942748.png",
      route: "/facturacion/crear",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-500",
    },
    {
      id: 2,
      title: "Lista de Facturas",
      description: "Visualizar todas las facturas emitidas",
      icon: "https://cdn-icons-png.flaticon.com/512/3132/3132695.png",
      route: "/facturacion/lista",
      bgColor: "bg-green-50",
      iconColor: "text-green-500",
    },
    {
      id: 3,
      title: "Facturas en SRI",
      description: "Consultar facturas registradas en SRI",
      icon: "https://cdn-icons-png.flaticon.com/512/3132/3132697.png",
      route: "/facturacion/sri",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-500",
    },
    {
      id: 4,
      title: "Anulación en SRI",
      description: "Proceso de anulación de facturas",
      icon: "https://cdn-icons-png.flaticon.com/512/3132/3132699.png",
      route: "/facturacion/anulacion",
      bgColor: "bg-red-50",
      iconColor: "text-red-500",
    },
  ];

  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <div
      className="min-h-screen pt-20"
      style={{
        backgroundImage: "url('/login.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed"
      }}
    >

      <div className="absolute inset-0 bg-black/10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="mb-8 text-center lg:text-left">
          <h1 className="text-3xl font-bold text-gray-900">
            Facturación
          </h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center h-full transition-all duration-500 hover:shadow-xl backdrop-blur-sm bg-white/80">
              {/* Aquí está la animación en vez de la imagen */}
              <div className="mb-4 w-24 h-24">
                <Lottie animationData={invoicesAnimation} loop={true} />
              </div>

              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                Módulo de Facturación
              </h2>
              <p className="text-gray-600">
                Gestión completa de facturas electrónicas
              </p>
            </section>
          </div>

          <div className="space-y-6">
            {cards.map((card) => (
              <div
                key={card.id}
                onClick={() => handleCardClick(card.route)}
                className={`${card.bgColor} rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer border border-transparent hover:border-white/30 backdrop-blur-sm bg-opacity-80`}
              >
                <div className="p-6">
                  <div className="flex items-center">
                    <div
                      className={`mr-4 ${card.iconColor}`}
                      style={{
                        animation: `${
                          card.id % 2 === 0 ? "pulse" : "bounce"
                        } 2s infinite ease-in-out`,
                      }}
                    >
                      <img
                        src={card.icon}
                        alt={card.title}
                        className="h-12 w-12 object-contain drop-shadow-sm"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {card.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {card.description}
                      </p>
                    </div>
                    <div className="ml-auto">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
    </div>
    </div>
  );
}

export default DashboardF;