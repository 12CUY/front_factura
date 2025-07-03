<<<<<<< HEAD
import { useNavigate } from "react-router-dom";

const CreacionF = () => {
  const navigate = useNavigate();

  // Datos de las cards con colores personalizados
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
=======
import { useState } from "react";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import animationData from "../../../animation/file.json";

const CrearF = () => {
  const [factura, setFactura] = useState({
    cliente: "",
    direccion: "",
    ruc: "",
    correo: "",
    codigo: "",
    descripcion: "",
    cantidad: 1,
    precio: 0,
  });
  const [generado, setGenerado] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [facturaGuardada, setFacturaGuardada] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFactura({ ...factura, [name]: value });
  };

  const handleSubmit = () => {
    const { cliente, ruc, descripcion, precio } = factura;
    if (!cliente || !ruc || !descripcion || precio <= 0) {
      Swal.fire("Datos incompletos", "Completa todos los campos obligatorios.", "warning");
      return;
    }
    Swal.fire({
      title: "¿Generar factura electrónica?",
      text: "Verifica los datos antes de continuar.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Generar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#1E3A8A",
    }).then((result) => {
      if (result.isConfirmed) {
        setGenerado(true);
        Swal.fire("¡Factura Generada!", "La factura fue enviada al SRI.", "success");
      }
    });
  };

  const handleSave = () => {
    const { cliente, ruc, descripcion, precio } = factura;
    if (!cliente || !ruc || !descripcion || precio <= 0) {
      Swal.fire("Datos incompletos", "Completa todos los campos obligatorios.", "warning");
      return;
    }
    setFacturaGuardada({ ...factura });
    Swal.fire("Guardado", "Los datos han sido guardados correctamente.", "success");
  };

  const calcularTotal = () => factura.cantidad * factura.precio;
  const calcularIVA = () => calcularTotal() * 0.15; // IVA del 15%
  const calcularTotalFinal = () => calcularTotal() + calcularIVA();

  return (
    <div
      className="min-h-screen pt-28 px-4 md:pt-36 md:px-12"
>>>>>>> 230336d (Subiendo todo el proyecto desde Git Bash)
      style={{
        backgroundImage: "url('/login.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
<<<<<<< HEAD
        backgroundAttachment: "fixed"
      }}
    >
      {/* Fondo semitransparente para mejorar legibilidad */}
      <div className="absolute inset-0 bg-black/10"></div>
      
      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Título responsive */}
        <div className="mb-8 text-center lg:text-left">
          <h1 className="text-3xl font-bold text-gray-900">
            creacion de la factura
          </h1>
        </div>

        {/* Grid de contenido */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Columna 1 - Sección con imagen */}
          <div className="space-y-6">
            <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center h-full transition-all duration-500 hover:shadow-xl backdrop-blur-sm bg-white/80">
              <div
                className="animate-pulse mb-4"
                style={{
                  animationDuration: "2s",
                  animationIterationCount: "infinite",
                  animationTimingFunction: "ease-in-out",
                }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3132/3132693.png"
                  alt="Facturación"
                  className="h-24 w-24 object-contain drop-shadow-md"
                />
              </div>
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                Módulo de Facturación
              </h2>
              <p className="text-gray-600">
                Gestión completa de facturas electrónicas
              </p>
            </section>
          </div>

          {/* Columna 2 - Cards animadas */}
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
=======
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10"></div>

      {/* Contenedor principal */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {!generado ? (
          <>
            <h1 className="text-4xl font-bold text-center text-[#1E3A8A] mb-12">
              Crear Nueva Factura
            </h1>

            {/* Grid con 3 columnas independientes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              {/* Bloque 1: Datos del Cliente */}
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                <h2 className="text-[#1E3A8A] font-semibold text-lg mb-4 flex items-center gap-2">
                  👤 Datos del Cliente
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block font-medium text-gray-700">RUC *</label>
                    <input
                      name="ruc"
                      value={factura.ruc}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring focus:ring-[#1E3A8A]/50"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700">Cliente *</label>
                    <input
                      name="cliente"
                      value={factura.cliente}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring focus:ring-[#1E3A8A]/50 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700">Dirección</label>
                    <input
                      name="direccion"
                      value={factura.direccion}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-md border border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700">Correo</label>
                    <input
                      name="correo"
                      value={factura.correo}
                      onChange={handleChange}
                      type="email"
                      className="w-full px-4 py-2 rounded-md border border-gray-300"
                    />
                  </div>
                </div>
              </div>

              {/* Bloque 2: Detalles de la Factura */}
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                <h2 className="text-[#1E3A8A] font-semibold text-lg mb-4 flex items-center gap-2">
                  💼 Detalles de la Factura
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block font-medium text-gray-700">Código</label>
                    <input
                      name="codigo"
                      value={factura.codigo}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-md border border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700">Descripción del servicio *</label>
                    <select
                      name="descripcion"
                      value={factura.descripcion}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-md border border-gray-300"
                    >
                      <option value="">Seleccione un servicio</option>
                      <option value="Agua">Agua</option>
                      <option value="Electricidad">Electricidad</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700">Precio unitario *</label>
                    <input
                      name="precio"
                      type="number"
                      min="0"
                      value={factura.precio}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-md border border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700">Cantidad</label>
                    <input
                      name="cantidad"
                      type="number"
                      min="1"
                      value={factura.cantidad}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-md border border-gray-300"
                    />
                  </div>
                </div>
              </div>

              {/* Bloque 3: Acciones */}
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 flex flex-col justify-between">
                <h2 className="text-[#1E3A8A] font-semibold text-lg mb-4 flex items-center gap-2">
                  ⚙️ Acciones
                </h2>
                <Lottie
                  animationData={animationData}
                  loop={true}
                  className="w-24 h-24 mx-auto"
                />
                <p className="text-center text-gray-600 mt-2">
                  Verifica los datos antes de generar.
                </p>
                {/* Botones adicionales */}
                <div className="mt-6 space-y-2">
                  <button
                    onClick={handleSave}
                    type="button"
                    className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white py-2 rounded-md flex items-center justify-center gap-2"
                  >
                    <i className="fas fa-save"></i> Guardar
                  </button>
                  {facturaGuardada && (
                    <>
                      <button
                        onClick={() => setMostrarModal(true)}
                        type="button"
                        className="w-full bg-[#10B981] hover:bg-[#059669] text-white py-2 rounded-md flex items-center justify-center gap-2"
                      >
                        <i className="fas fa-eye"></i> Visualizar
                      </button>
                      <button
                        onClick={handleSubmit}
                        type="button"
                        className="w-full bg-gradient-to-r from-[#1E3A8A] to-[#1E40AF] hover:from-[#1E40AF] hover:to-[#1E3A8A] text-white py-2 rounded-md flex items-center justify-center gap-2"
                      >
                        <i className="fas fa-file-invoice-dollar"></i> Generar Factura Electrónica
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Vista previa de la factura */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              {/* Encabezado con logo e información de la empresa */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-4 border-b border-gray-200">
                <div>
                  <img
                    src="https://pbs.twimg.com/profile_images/1130794605094612992/jLqf3nbh_400x400.jpg "
                    alt="Logo"
                    className="w-28 h-auto mb-2"
                  />
                  <h2 className="text-xl font-bold text-[#1E3A8A]">GRUPO HIDROLÓGICO GR3.4</h2>
                  <p className="text-sm text-gray-700">AV. HIDROLÓGICA S/N</p>
                  <p className="text-sm text-gray-700">RUC: 1760013210001</p>
                  {/* Autorización SRI */}
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="font-bold text-gray-800 mb-2">AUTORIZACIÓN SRI</h3>
                    <div className="text-sm space-y-1">
                      <p>
                        <strong>CLAVE:</strong> 15062020531760013210001
                      </p>
                      <p>
                        <strong>N° AUTORIZACIÓN:</strong>{" "}
                        26620201903176001321000100105000000134
                      </p>
                      <p>
                        <strong>FECHA:</strong> 15/06/2025
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 text-right">
                  <h3 className="text-lg font-semibold text-gray-800">FACTURA ELECTRÓNICA GENERADA</h3>
                  <p className="text-sm text-gray-600">Fecha de emisión: {new Date().toLocaleDateString()}</p>
                </div>
              </div>

              {/* Datos del cliente */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-800 mb-2">CLIENTE</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-1 text-sm">
                  <p>
                    <strong>RUC:</strong> V-{factura.ruc}
                  </p>
                  <p>
                    <strong>Nombre:</strong> {factura.cliente}
                  </p>
                  <p>
                    <strong>Dirección:</strong> {factura.direccion || "No registrada"}
                  </p>
                  <p>
                    <strong>Correo:</strong> {factura.correo || "No registrado"}
                  </p>
                </div>
              </div>

              {/* Detalle del consumo */}
              <div className="mb-6 overflow-x-auto">
                <h3 className="font-bold text-gray-800 mb-3">DETALLE DEL CONSUMO</h3>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr className="text-xs uppercase tracking-wider text-gray-500">
                      <th className="px-4 py-3 text-left">COD.</th>
                      <th className="px-4 py-3 text-left">SERVICIO</th>
                      <th className="px-4 py-3 text-center">CANT.</th>
                      <th className="px-4 py-3 text-right">P. UNIT.</th>
                      <th className="px-4 py-3 text-right">SUBTOTAL</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-gray-700">{factura.codigo || "-"}</td>
                      <td className="px-4 py-3 text-gray-700">{factura.descripcion}</td>
                      <td className="px-4 py-3 text-center text-gray-700">{factura.cantidad}</td>
                      <td className="px-4 py-3 text-right text-gray-700">
                        ${Number(factura.precio).toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-right text-gray-700">
                        ${calcularTotal().toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Lecturas */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-800 mb-2">LECTURAS</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                  <li>- Anterior (01/Jun/2025): 1200 m³</li>
                  <li>- Actual (30/Jun/2025): 1225 m³</li>
                  <li>- Consumo: {factura.cantidad} m³</li>
                </ul>
              </div>

              {/* Impuestos */}
              <div className="mb-6 overflow-x-auto">
                <h3 className="font-bold text-gray-800 mb-3">DETALLE DE IMPUESTOS</h3>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr className="text-xs uppercase tracking-wider text-gray-500">
                      <th className="px-4 py-2 text-left">IMPUESTO</th>
                      <th className="px-4 py-2 text-left">TARIFA</th>
                      <th className="px-4 py-2 text-right">BASE IMPONIBLE</th>
                      <th className="px-4 py-2 text-right">VALOR</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-2 text-gray-700">IVA</td>
                      <td className="px-4 py-2 text-gray-700">15%</td>
                      <td className="px-4 py-2 text-right text-gray-700">${calcularTotal().toFixed(2)}</td>
                      <td className="px-4 py-2 text-right text-gray-700">${calcularIVA().toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Resumen de valores */}
              <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-gray-800 mb-3">RESUMEN DE VALORES</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>SUBTOTAL</span>
                    <span>${calcularTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>IVA (15%)</span>
                    <span>${calcularIVA().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg text-[#1E3A8A] pt-2 border-t border-gray-300">
                    <span>TOTAL A PAGAR</span>
                    <span>${calcularTotalFinal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Modal de visualización */}
        {mostrarModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 pt-20">
            <div className="bg-white w-11/12 md:w-3/4 max-h-screen overflow-y-auto rounded-xl shadow-xl p-6 relative">
              <button
                onClick={() => setMostrarModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold text-center text-[#1E3A8A] mb-4">Vista Previa de la Factura</h2>

              {/* Copiamos aquí la estructura de la factura generada */}
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-4 border-b border-gray-200">
                  <div>
                    <img
                      src="https://pbs.twimg.com/profile_images/1130794605094612992/jLqf3nbh_400x400.jpg "
                      alt="Logo"
                      className="w-28 h-auto mb-2"
                    />
                    <h2 className="text-xl font-bold text-[#1E3A8A]">GRUPO HIDROLÓGICO GR3.4</h2>
                    <p className="text-sm text-gray-700">AV. HIDROLÓGICA S/N</p>
                    <p className="text-sm text-gray-700">RUC: 1760013210001</p>
                    <div className="border-t border-gray-200 pt-4">
                      <h3 className="font-bold text-gray-800 mb-2">AUTORIZACIÓN SRI</h3>
                      <div className="text-sm space-y-1">
                        <p>
                          <strong>CLAVE:</strong> 15062020531760013210001
                        </p>
                        <p>
                          <strong>N° AUTORIZACIÓN:</strong>{" "}
                          26620201903176001321000100105000000134
                        </p>
                        <p>
                          <strong>FECHA:</strong> 15/06/2025
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 text-right">
                    <h3 className="text-lg font-semibold text-gray-800">FACTURA ELECTRÓNICA GENERADA</h3>
                    <p className="text-sm text-gray-600">Fecha de emisión: {new Date().toLocaleDateString()}</p>
                  </div>
                </div>

                {/* Datos del cliente */}
                <div className="mb-6">
                  <h3 className="font-bold text-gray-800 mb-2">CLIENTE</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-1 text-sm">
                    <p>
                      <strong>RUC:</strong> V-{facturaGuardada.ruc}
                    </p>
                    <p>
                      <strong>Nombre:</strong> {facturaGuardada.cliente}
                    </p>
                    <p>
                      <strong>Dirección:</strong> {facturaGuardada.direccion || "No registrada"}
                    </p>
                    <p>
                      <strong>Correo:</strong> {facturaGuardada.correo || "No registrado"}
                    </p>
                  </div>
                </div>

                {/* Detalle del consumo */}
                <div className="mb-6 overflow-x-auto">
                  <h3 className="font-bold text-gray-800 mb-3">DETALLE DEL CONSUMO</h3>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr className="text-xs uppercase tracking-wider text-gray-500">
                        <th className="px-4 py-3 text-left">COD.</th>
                        <th className="px-4 py-3 text-left">SERVICIO</th>
                        <th className="px-4 py-3 text-center">CANT.</th>
                        <th className="px-4 py-3 text-right">P. UNIT.</th>
                        <th className="px-4 py-3 text-right">SUBTOTAL</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-gray-700">{facturaGuardada.codigo || "-"}</td>
                        <td className="px-4 py-3 text-gray-700">{facturaGuardada.descripcion}</td>
                        <td className="px-4 py-3 text-center text-gray-700">{facturaGuardada.cantidad}</td>
                        <td className="px-4 py-3 text-right text-gray-700">
                          ${Number(facturaGuardada.precio).toFixed(2)}
                        </td>
                        <td className="px-4 py-3 text-right text-gray-700">
                          ${(facturaGuardada.cantidad * facturaGuardada.precio).toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
>>>>>>> 230336d (Subiendo todo el proyecto desde Git Bash)
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default CreacionF;
=======
export default CrearF;
>>>>>>> 230336d (Subiendo todo el proyecto desde Git Bash)
