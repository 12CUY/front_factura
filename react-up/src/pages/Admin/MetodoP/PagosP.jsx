import  { useEffect, useState } from 'react';

const PagosP = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [pagos] = useState([
    { id: 'PP001', cliente: 'Ana María Gómez', fecha: '2025-06-28', monto: 45.99, estado: 'Completado' },
    { id: 'PP002', cliente: 'Roberto Díaz', fecha: '2025-06-28', monto: 70.25, estado: 'Completado' },
    { id: 'PP003', cliente: 'Luisa Rojas', fecha: '2025-06-29', monto: 150.00, estado: 'Completado' },
    { id: 'PP004', cliente: 'Carlos Ruiz', fecha: '2025-06-29', monto: 99.99, estado: 'Completado' },
    { id: 'PP005', cliente: 'Valeria Pérez', fecha: '2025-06-29', monto: 120.50, estado: 'Completado' },
    { id: 'PP006', cliente: 'Diego Castro', fecha: '2025-06-30', monto: 88.00, estado: 'Completado' },
    { id: 'PP007', cliente: 'María Vargas', fecha: '2025-06-30', monto: 77.40, estado: 'Completado' },
    { id: 'PP008', cliente: 'Javier Flores', fecha: '2025-06-30', monto: 100.00, estado: 'Completado' },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const filteredPagos = pagos.filter(pago =>
    pago.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pago.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pago.fecha.includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredPagos.length / itemsPerPage);
  const currentPagos = filteredPagos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div
      className="min-h-screen pt-16"
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
            Pagos con PayPal
          </h1>
          <p className="text-gray-600 mt-2">Listado completo de transacciones exitosas</p>
        </div>

        <div className="mb-6 max-w-md">
          <input
            type="text"
            placeholder="Buscar por cliente, ID o fecha..."
            className="block w-full pl-4 pr-3 py-2 border border-gray-300 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {filteredPagos.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentPagos.map((pago, index) => (
                <div
                  key={pago.id}
                  className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-transparent hover:border-white/30 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                    animation: isVisible ? 'fadeInUp 0.5s ease-out' : ''
                  }}
                >
                  <div className="p-6 flex flex-col h-full justify-between">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">{pago.cliente}</h3>
                      <p className="text-sm text-gray-600">ID: {pago.id}</p>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p><strong>Fecha:</strong> {pago.fecha}</p>
                      <p><strong>Monto:</strong> ${pago.monto.toFixed(2)}</p>
                      <p><strong>Estado:</strong> <span className="text-green-600 font-semibold">{pago.estado}</span></p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 border rounded-lg ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white hover:bg-gray-50'}`}
                  >
                    Anterior
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 border rounded-lg ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-50'}`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 border rounded-lg ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white hover:bg-gray-50'}`}
                  >
                    Siguiente
                  </button>
                </nav>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 bg-white/80 rounded-2xl shadow">
            <p className="text-gray-600">No se encontraron pagos</p>
            <button
              onClick={() => setSearchTerm('')}
              className="mt-4 text-blue-600 hover:text-blue-800"
            >
              Limpiar búsqueda
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PagosP;


