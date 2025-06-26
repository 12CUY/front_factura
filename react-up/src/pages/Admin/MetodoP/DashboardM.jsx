import { useNavigate } from "react-router-dom";

const DashboardM = () => {
  const navigate = useNavigate();

  // Datos de las cards
  const paymentCards = [
    {
      id: 1,
      title: "Pagos con PayPal",
      description: "Listado completo de transacciones exitosas",
      icon: "https://cdn-icons-png.flaticon.com/512/2504/2504801.png",
      route: "/metodo-pago/paypal",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-500",
    },
    {
      id: 2,
      title: "Pagos Cancelados/Devueltos",
      description: "Transacciones rechazadas o devueltas",
      icon: "https://cdn-icons-png.flaticon.com/512/1828/1828843.png",
      route: "/metodo-pago/cancelados",
      bgColor: "bg-red-50",
      iconColor: "text-red-500",
    },
  ];

  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <div 
      className="min-h-screen pt-16"
      style={{
        backgroundImage: "url('/DetalleP.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed"
      }}
    >
      {/* Fondo semitransparente para mejorar legibilidad */}
      <div className="absolute inset-0 bg-black/10"></div>
      
      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Título simplificado */}
        <div className="mb-8 text-center lg:text-left">
          <h1 className="text-3xl font-bold text-gray-900">Métodos de Pago</h1>
        </div>

        {/* Grid de contenido */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Columna 1 - Sección con imagen */}
          <div className="space-y-6">
            <section className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center h-full transition-all duration-500 hover:shadow-xl backdrop-blur-sm bg-white/80">
              <div
                className="animate-pulse mb-4"
                style={{
                  animationDuration: "2s",
                  animationIterationCount: "infinite",
                  animationTimingFunction: "ease-in-out",
                }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2489/2489756.png"
                  alt="Métodos de pago"
                  className="h-24 w-24 object-contain drop-shadow-md"
                />
              </div>
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                Gestión de Pagos
              </h2>
              <p className="text-gray-600">
                Administración de transacciones y métodos
              </p>
            </section>
          </div>

          {/* Columna 2 - Cards animadas */}
          <div className="space-y-6">
            {paymentCards.map((card) => (
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
};

export default DashboardM;