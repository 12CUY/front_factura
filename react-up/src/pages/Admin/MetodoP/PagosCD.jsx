import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Usamos SweetAlert2
import Lottie from "lottie-react"; // Para animación Lottie
import lookAnimation from "../../../animation/look.json"; // Ajusta la ruta según tu proyecto

const PagosC = () => {
  const navigate = useNavigate();

  // Datos simulados de pagos (solo PayPal), filtrados para mostrar solo Cancelados y Devueltos
  const transacciones = [
    {
      id: 1,
      metodo: "PayPal",
      monto: "$45.00",
      fecha: "2024-11-01",
      estado: "Cancelado",
      motivo: "Pago rechazado por el cliente",
    },
    {
      id: 2,
      metodo: "PayPal",
      monto: "$89.99",
      fecha: "2024-11-03",
      estado: "Devuelto",
      motivo: "Devolución iniciada por el vendedor",
    },
    {
      id: 3,
      metodo: "PayPal",
      monto: "$30.50",
      fecha: "2024-11-05",
      estado: "Cancelado",
      motivo: "Fondos insuficientes",
    },
  ];

  // Función para mostrar detalles con SweetAlert2
  const verDetalles = (pago) => {
    Swal.fire({
      title: "Detalles del Pago",
      html: `
        <div style="text-align:left; padding: 10px;">
          <p><strong>ID:</strong> ${pago.id}</p>
          <p><strong>Método:</strong> ${pago.metodo}</p>
          <p><strong>Monto:</strong> ${pago.monto}</p>
          <p><strong>Fecha:</strong> ${pago.fecha}</p>
          <p><strong>Estado:</strong> ${pago.estado}</p>
          <p><strong>Motivo:</strong> ${pago.motivo}</p>
        </div>
      `,
      icon: pago.estado === "Cancelado" ? "error" : "info",
      confirmButtonText: "Cerrar",
    });
  };

  return (
    <div
      className="min-h-screen pt-16"
      style={{
        backgroundImage: "url('/DetalleP.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        <div className="mb-8 text-center lg:text-left">
          <h1 className="text-4xl font-bold text-black">Pagos Cancelados / Devueltos</h1>
          <p className="text-gray-200 mt-2">Listado completo de transacciones no exitosas.</p>
        </div>

        {/* Grid de tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {transacciones.map((pago) => (
            <div
              key={pago.id}
              className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-200"
            >
              <div className="p-5 relative">
                {/* Animación Lottie */}
                <div className="absolute top-2 right-2 w-12 h-12 opacity-70">
                  <Lottie animationData={lookAnimation} loop autoplay />
                </div>

                {/* Monto */}
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Monto: {pago.monto}</h3>

                {/* Motivo truncado */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{pago.motivo}</p>

                {/* Botón Ver Detalles + Estado */}
                <div className="flex justify-between items-center mt-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      pago.estado === "Cancelado"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {pago.estado}
                  </span>
                  <button
                    onClick={() => verDetalles(pago)}
                    className="py-1 px-3 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition font-medium"
                  >
                    Ver Detalles
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sin resultados */}
        {transacciones.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center text-center py-12">
            <div className="w-40 h-40 mb-4">
              <Lottie animationData={lookAnimation} loop autoplay />
            </div>
            <h3 className="text-xl font-semibold text-gray-700">No hay transacciones</h3>
            <p className="text-gray-500 mt-2">No se encontraron pagos cancelados o devueltos.</p>
          </div>
        )}

        {/* Botón regresar */}
        <div className="mt-10 flex justify-start">
          <button
            onClick={() => navigate(-1)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105 flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default PagosC;