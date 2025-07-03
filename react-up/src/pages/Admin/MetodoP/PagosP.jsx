import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const PagosP = () => {
  const navigate = useNavigate();

  // Datos simulados de planes
  const paymentOptions = [
    {
      id: 1,
      title: "Suscripción Mensual",
      price: "$9.99",
      description: "Acceso completo por un mes",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-500",
    },
    {
      id: 2,
      title: "Suscripción Anual",
      price: "$99.99",
      description: "Ahorra $20 al pagar anualmente",
      bgColor: "bg-green-50",
      iconColor: "text-green-500",
    },
  ];

  // Función al hacer clic en "Pagar con PayPal"
  const handlePayNow = (plan) => {
    Swal.fire({
      icon: "info",
      title: "Redirigiendo a PayPal...",
      text: "Serás llevado a la plataforma segura de PayPal para completar tu pago.",
      timer: 1500,
      showConfirmButton: false,
      allowOutsideClick: false,
      customClass: {
        popup: "bg-white p-6 rounded-lg shadow-lg text-gray-800",
      },
    }).then(() => {
      // Redirige directamente a PayPal
      window.location.href = "https://www.paypal.com/signin ";
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
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/10"></div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Pago con PayPal</h1>
          <p className="mt-2 text-gray-600">
            Selecciona una opción de pago para continuar.
          </p>
        </div>

        {/* Opciones de pago */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {paymentOptions.map((option) => (
            <div
              key={option.id}
              className={`${option.bgColor} rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer border border-transparent hover:border-white/30 backdrop-blur-sm bg-opacity-80`}
            >
              <div className="flex items-center">
                <div
                  className={`mr-4 ${option.iconColor}`}
                  style={{
                    animation: "pulse 2s infinite ease-in-out",
                  }}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2504/2504801.png "
                    alt="PayPal"
                    className="h-12 w-12 object-contain drop-shadow-md"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{option.title}</h3>
                  <p className="text-gray-600 text-sm">{option.description}</p>
                  <p className="text-lg font-bold text-gray-900 mt-1">{option.price}</p>
                </div>
                <div className="ml-auto">
                  {/* Botón simple de "Pagar con PayPal" */}
                  <button
                    type="button"
                    onClick={() => handlePayNow(option)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                  >
                    Pagar con PayPal
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Información adicional */}
        <div className="mt-12 bg-white/90 backdrop-blur-sm rounded-2xl shadow-md p-6 max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">¿Cómo funciona?</h2>
          <ul className="space-y-2 text-gray-600 list-disc pl-5">
            <li>Selecciona la suscripción deseada.</li>
            <li>Haz clic en "Pagar con PayPal".</li>
            <li>Serás redirigido a la plataforma segura de PayPal.</li>
            <li>Confirma el pago y regresarás automáticamente aquí.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PagosP;