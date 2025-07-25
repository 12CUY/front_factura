import { useNavigate } from 'react-router-dom';

const DashboardConfiguracion = () => {
  const navigate = useNavigate();

  // Datos de las cards para Configuración del Sistema
  const sections = [
    {
      title: "Configuración",
      cards: [
        {
          id: 1,
          title: "Configuración del Sistema",
          description: "Ajustes generales de la plataforma",
          icon: "https://cdn-icons-png.flaticon.com/512/1265/1265531.png",
          route: "/configuracion/sistema",
          bgColor: "bg-gray-50",
          iconColor: "text-gray-500"
        },
        {
          id: 2,
          title: "Notificaciones",
          description: "Gestionar alertas y mensajes del sistema",
          icon: "https://cdn-icons-png.flaticon.com/512/565/565422.png",
          route: "/configuracion/notificaciones",
          bgColor: "bg-blue-50",
          iconColor: "text-blue-500"
        },
        {
          id: 3,
          title: "Seguridad",
          description: "Configuración de accesos y permisos",
          icon: "https://cdn-icons-png.flaticon.com/512/2957/2957152.png",
          route: "/configuracion/seguridad",
          bgColor: "bg-purple-50",
          iconColor: "text-purple-500"
        }
      ],
      mainIcon: "https://cdn-icons-png.flaticon.com/512/2092/2092693.png"
    }
  ];

  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <div 
      className="min-h-screen pt-16 bg-gray-50"
      style={{
        backgroundImage: "url('/gimnasio_mantenimeinto.jpg')",
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
        {/* Título principal */}
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Panel de Configuración
        </h1>

        {/* Grid de secciones */}
        <div className="space-y-12">
          {sections.map((section, index) => (
            <div key={index} className="space-y-6">
              {/* Título de sección */}
              <h2 className="text-2xl font-semibold text-white border-b pb-2">
                {section.title}
              </h2>

              {/* Grid de contenido */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Columna 1 - Sección con imagen */}
                <div className="space-y-6">
                  <section className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center h-full transition-all duration-500 hover:shadow-xl backdrop-blur-sm bg-white/80">
                    <div 
                      className="animate-pulse mb-4" 
                      style={{ 
                        animationDuration: '2s', 
                        animationIterationCount: 'infinite',
                        animationTimingFunction: 'ease-in-out'
                      }}
                    >
                      <img 
                        src={section.mainIcon} 
                        alt={section.title} 
                        className="h-24 w-24 object-contain drop-shadow-md"
                      />
                    </div>
                    <h3 className="text-xl font-medium text-gray-800 mt-4">Configuración Avanzada</h3>
                    <p className="text-gray-600 mt-2">Personaliza el sistema a tus necesidades</p>
                  </section>
                </div>

                {/* Columna 2 - Cards animadas */}
                <div className="space-y-6">
                  {section.cards.map((card) => (
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
                              animation: `${card.id % 2 === 0 ? 'pulse' : 'bounce'} 2s infinite ease-in-out`
                            }}
                          >
                            <img 
                              src={card.icon} 
                              alt={card.title} 
                              className="h-12 w-12 object-contain drop-shadow-sm"
                            />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">{card.title}</h3>
                            <p className="text-gray-600 text-sm">{card.description}</p>
                          </div>
                          <div className="ml-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardConfiguracion;