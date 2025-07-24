import { useNavigate } from 'react-router-dom';

const DashboardC = () => {
  const navigate = useNavigate();

  // Datos de las cards para cada sección
  const sections = [
    {
      title: "Gestión Comercial",
      cards: [
        {
          id: 1,
          title: "Dashboard Comercial",
          description: "Estadísticas y métricas clave del negocio",
          icon: "https://cdn-icons-png.flaticon.com/512/3132/3132795.png",
          route: "/comercial/dashboard",
          bgColor: "bg-indigo-50",
          iconColor: "text-indigo-500"
        },
        {
          id: 2,
          title: "Promociones",
          description: "Crear y gestionar promociones especiales",
          icon: "https://cdn-icons-png.flaticon.com/512/3132/3132809.png",
          route: "/comercial/promociones",
          bgColor: "bg-blue-50",
          iconColor: "text-blue-500"
        },
        {
          id: 3,
          title: "Clientes Potenciales",
          description: "Seguimiento de leads y prospectos",
          icon: "https://cdn-icons-png.flaticon.com/512/3132/3132777.png",
          route: "/comercial/leads",
          bgColor: "bg-purple-50",
          iconColor: "text-purple-500"
        }
      ],
      mainIcon: "https://cdn-icons-png.flaticon.com/512/3132/3132809.png"
    },
    {
      title: "Membresías",
      cards: [
        {
          id: 4,
          title: "Tipos de Membresía",
          description: "Configurar planes y precios",
          icon: "https://cdn-icons-png.flaticon.com/512/3132/3132787.png",
          route: "/membresias/planes",
          bgColor: "bg-green-50",
          iconColor: "text-green-500"
        },
        {
          id: 5,
          title: "Asignar Membresía",
          description: "Asignar membresía a clientes",
          icon: "https://cdn-icons-png.flaticon.com/512/3132/3132775.png",
          route: "/membresias/asignar",
          bgColor: "bg-teal-50",
          iconColor: "text-teal-500"
        },
        {
          id: 6,
          title: "Renovaciones",
          description: "Gestionar renovaciones de membresías",
          icon: "https://cdn-icons-png.flaticon.com/512/3132/3132791.png",
          route: "/membresias/renovaciones",
          bgColor: "bg-amber-50",
          iconColor: "text-amber-500"
        }
      ],
      mainIcon: "https://cdn-icons-png.flaticon.com/512/3132/3132787.png"
    },
    {
      title: "Pagos",
      cards: [
        {
          id: 7,
          title: "Registrar Pago",
          description: "Registrar nuevos pagos de clientes",
          icon: "https://cdn-icons-png.flaticon.com/512/3132/3132771.png",
          route: "/pagos/registrar",
          bgColor: "bg-red-50",
          iconColor: "text-red-500"
        },
        {
          id: 8,
          title: "Métodos de Pago",
          description: "Configurar formas de pago aceptadas",
          icon: "https://cdn-icons-png.flaticon.com/512/3132/3132768.png",
          route: "/pagos/metodos",
          bgColor: "bg-orange-50",
          iconColor: "text-orange-500"
        },
        {
          id: 9,
          title: "Facturación",
          description: "Generar facturas y recibos",
          icon: "https://cdn-icons-png.flaticon.com/512/3132/3132766.png",
          route: "/pagos/facturacion",
          bgColor: "bg-yellow-50",
          iconColor: "text-yellow-500"
        }
      ],
      mainIcon: "https://cdn-icons-png.flaticon.com/512/3132/3132771.png"
    },
    {
      title: "Historial de Pagos",
      cards: [
        {
          id: 10,
          title: "Consultar Pagos",
          description: "Buscar y visualizar pagos registrados",
          icon: "https://cdn-icons-png.flaticon.com/512/3132/3132805.png",
          route: "/historial-pagos/consultar",
          bgColor: "bg-green-50",
          iconColor: "text-green-500"
        },
        {
          id: 11,
          title: "Reportes Financieros",
          description: "Generar reportes de ingresos",
          icon: "https://cdn-icons-png.flaticon.com/512/3132/3132797.png",
          route: "/historial-pagos/reportes",
          bgColor: "bg-blue-50",
          iconColor: "text-blue-500"
        },
        {
          id: 12,
          title: "Reembolsos",
          description: "Gestionar devoluciones de pagos",
          icon: "https://cdn-icons-png.flaticon.com/512/3132/3132762.png",
          route: "/historial-pagos/reembolsos",
          bgColor: "bg-purple-50",
          iconColor: "text-purple-500"
        }
      ],
      mainIcon: "https://cdn-icons-png.flaticon.com/512/3132/3132805.png"
    },
    {
      title: "Ventas de Productos",
      cards: [
        {
          id: 13,
          title: "Inventario",
          description: "Gestionar productos en stock",
          icon: "https://cdn-icons-png.flaticon.com/512/3132/3132760.png",
          route: "/ventas-productos/inventario",
          bgColor: "bg-indigo-50",
          iconColor: "text-indigo-500"
        },
        {
          id: 14,
          title: "Nueva Venta",
          description: "Registrar venta de productos",
          icon: "https://cdn-icons-png.flaticon.com/512/3132/3132758.png",
          route: "/ventas-productos/nueva",
          bgColor: "bg-teal-50",
          iconColor: "text-teal-500"
        },
        {
          id: 15,
          title: "Productos Más Vendidos",
          description: "Análisis de ventas por producto",
          icon: "https://cdn-icons-png.flaticon.com/512/3132/3132756.png",
          route: "/ventas-productos/analisis",
          bgColor: "bg-amber-50",
          iconColor: "text-amber-500"
        }
      ],
      mainIcon: "https://cdn-icons-png.flaticon.com/512/3132/3132760.png"
    }
  ];

  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <div 
      className="min-h-screen pt-16 bg-gray-50"
      style={{
        backgroundImage: "url('/login.jpg')",
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Panel de Gestión Comercial
        </h1>

        {/* Grid de secciones */}
        <div className="space-y-12">
          {sections.map((section, index) => (
            <div key={index} className="space-y-6">
              {/* Título de sección */}
              <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">
                {section.title}
              </h2>

              {/* Grid de contenido */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Columna 1 - Sección con imagen */}
                <div className="space-y-6">
                  <section className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center h-full transition-all duration-500 hover:shadow-xl backdrop-blur-sm bg-white/80">
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

export default DashboardC;