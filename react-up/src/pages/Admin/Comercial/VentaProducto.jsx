import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  FaShoppingCart,
  FaSave,
  FaTimes,
  FaArrowLeft,
  FaEdit,
  FaTrash,
  FaEye,
  FaPlus,
  FaDollarSign,
  FaBox,
  FaCalendarAlt,
  FaUser,
  FaReceipt,
} from "react-icons/fa";

const VentaProducto = () => {
  const navigate = useNavigate();

  // Estado para gestionar las ventas
  const [ventas, setVentas] = useState([
    {
      id: 1,
      numeroVenta: "V-001",
      cliente: "Ana García",
      producto: "Proteína Whey Gold",
      cantidad: 2,
      precioUnitario: 45.99,
      total: 91.98,
      fecha: "2024-07-28",
      descripcion: "Venta de suplemento proteico para cliente premium",
      estado: "Completada"
    },
    {
      id: 2,
      numeroVenta: "V-002",
      cliente: "Luis Pérez",
      producto: "Creatina Monohidrato",
      cantidad: 1,
      precioUnitario: 29.99,
      total: 29.99,
      fecha: "2024-07-28",
      descripcion: "Suplemento para mejora de rendimiento deportivo",
      estado: "Completada"
    },
    {
      id: 3,
      numeroVenta: "V-003",
      cliente: "María López",
      producto: "Pre-Entreno Energy",
      cantidad: 3,
      precioUnitario: 35.50,
      total: 106.50,
      fecha: "2024-07-27",
      descripcion: "Energizante pre-entrenamiento sabor tropical",
      estado: "Pendiente"
    },
    {
      id: 4,
      numeroVenta: "V-004",
      cliente: "Carlos Méndez",
      producto: "BCAA Complex",
      cantidad: 1,
      precioUnitario: 42.00,
      total: 42.00,
      fecha: "2024-07-27",
      descripcion: "Aminoácidos esenciales para recuperación muscular",
      estado: "Completada"
    }
  ]);

  // Estado para el formulario de nueva venta
  const [formData, setFormData] = useState({
    cliente: "",
    producto: "",
    cantidad: 1,
    precioUnitario: 0,
    descripcion: "",
    estado: "Completada"
  });

  const [idVentaEditando, setIdVentaEditando] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  // Productos disponibles (simulado)
  const productosDisponibles = [
    "Proteína Whey Gold",
    "Creatina Monohidrato",
    "Pre-Entreno Energy",
    "BCAA Complex",
    "Glutamina Pura",
    "Multivitamínico",
    "Omega 3",
    "Quemador de Grasa"
  ];

  // Clientes disponibles (simulado)
  const clientesDisponibles = [
    "Ana García",
    "Luis Pérez",
    "María López",
    "Carlos Méndez",
    "Sofía Bravo",
    "Roberto Castro",
    "Elena Ruiz",
    "Pedro Gómez"
  ];

  const manejarCambioFormulario = (campo, valor) => {
    setFormData(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  const calcularTotal = () => {
    return (formData.cantidad * formData.precioUnitario).toFixed(2);
  };

  const abrirModalCrear = () => {
    setFormData({
      cliente: "",
      producto: "",
      cantidad: 1,
      precioUnitario: 0,
      descripcion: "",
      estado: "Completada"
    });
    setIdVentaEditando(null);
    setMostrarModal(true);
  };

  const abrirModalEditar = (venta) => {
    setFormData({
      cliente: venta.cliente,
      producto: venta.producto,
      cantidad: venta.cantidad,
      precioUnitario: venta.precioUnitario,
      descripcion: venta.descripcion,
      estado: venta.estado
    });
    setIdVentaEditando(venta.id);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
  };

  const manejarGuardarVenta = (e) => {
    e.preventDefault();

    if (!formData.cliente || !formData.producto || formData.cantidad <= 0 || formData.precioUnitario <= 0) {
      Swal.fire("Error", "Por favor complete todos los campos requeridos.", "error");
      return;
    }

    const ventaData = {
      ...formData,
      total: parseFloat(calcularTotal()),
      fecha: new Date().toISOString().split('T')[0]
    };

    if (idVentaEditando) {
      // Actualizar venta existente
      setVentas(ventas.map(venta =>
        venta.id === idVentaEditando
          ? { ...venta, ...ventaData }
          : venta
      ));
      Swal.fire("¡Actualizada!", "Venta actualizada correctamente.", "success");
    } else {
      // Crear nueva venta
      const nuevoId = ventas.length ? Math.max(...ventas.map(v => v.id)) + 1 : 1;
      const numeroVenta = `V-${String(nuevoId).padStart(3, '0')}`;

      setVentas([...ventas, {
        id: nuevoId,
        numeroVenta,
        ...ventaData
      }]);
      Swal.fire("¡Creada!", "Venta registrada correctamente.", "success");
    }

    cerrarModal();
  };

  const manejarEliminarVenta = (id) => {
    Swal.fire({
      title: "¿Eliminar venta?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setVentas(ventas.filter(venta => venta.id !== id));
        Swal.fire("Eliminada", "La venta ha sido eliminada", "success");
      }
    });
  };

  const obtenerColorEstadoVenta = (estado) => {
    switch (estado) {
      case 'Completada':
        return 'bg-green-100 text-green-800';
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const manejarVerDetalles = (venta) => {
    Swal.fire({
      title: `Detalles de ${venta.numeroVenta}`,
      html: `
        <div class="text-left">
          <p><strong>Cliente:</strong> ${venta.cliente}</p>
          <p><strong>Producto:</strong> ${venta.producto}</p>
          <p><strong>Cantidad:</strong> ${venta.cantidad}</p>
          <p><strong>Precio Unitario:</strong> $${venta.precioUnitario}</p>
          <p><strong>Total:</strong> $${venta.total}</p>
          <p><strong>Fecha:</strong> ${venta.fecha}</p>
          <p><strong>Estado:</strong> <span>${venta.estado}</span></p>
          <p><strong>Descripción:</strong> ${venta.descripcion}</p>
        </div>
      `,
      icon: "info",
      confirmButtonText: "Cerrar"
    });
  };

  return (
    <div
      className="min-h-screen pt-16 pb-8 bg-gray-50"
      style={{
        backgroundImage: "url('/gimnasio_usarios.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black/10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Botón para crear nueva venta */}
        <div className="text-center mb-8">
          <button
            onClick={abrirModalCrear}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out flex items-center justify-center mx-auto text-lg"
          >
            <FaPlus className="inline-block mr-3 text-xl" />
            Nueva Venta
          </button>
        </div>

        {/* Título del Historial de Ventas */}
        <h2 className="text-3xl font-bold mb-6 text-white flex items-center">
          <FaReceipt className="mr-2 text-blue-600" />
          Historial de Ventas ({ventas.length})
        </h2>

        {/* Grid de Ventas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {ventas.map((venta) => (
            <div
              key={venta.id}
              className="rounded-lg shadow-md border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white"
            >
              {/* Header de la card */}
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{venta.numeroVenta}</h3>
                  <p className="text-sm text-gray-600 flex items-center">
                    <FaCalendarAlt className="mr-1" /> {venta.fecha}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${obtenerColorEstadoVenta(venta.estado)}`}>
                  {venta.estado}
                </span>
              </div>

              {/* Información del cliente y producto */}
              <div className="mb-3 space-y-2">
                <p className="text-sm">
                  <span className="font-medium text-gray-700">Cliente:</span> {venta.cliente}
                </p>
                <p className="text-sm">
                  <span className="font-medium text-gray-700">Producto:</span> {venta.producto}
                </p>
                <p className="text-sm">
                  <span className="font-medium text-gray-700">Cantidad:</span> {venta.cantidad}
                </p>
              </div>

              {/* Descripción */}
              <div className="mb-4">
                <p className="text-xs text-gray-600 leading-relaxed">
                  {venta.descripcion}
                </p>
              </div>

{/* Total (calculado) */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Total
  </label>
  <input
    type="text"
    value={`$${calcularTotal()}`}
    readOnly
    disabled
    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
  />
</div>

              {/* Botones de acción */}
              <div className="flex justify-between space-x-2">
                <button
                  onClick={() => manejarVerDetalles(venta)}
                  className="flex-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition flex items-center justify-center"
                  title="Ver detalles"
                >
                  <FaEye className="mr-1" />
                </button>
                <button
                  onClick={() => abrirModalEditar(venta)}
                  className="flex-1 px-3 py-2 bg-orange-100 text-orange-700 rounded-lg text-sm hover:bg-orange-200 transition flex items-center justify-center"
                  title="Editar"
                >
                  <FaEdit className="mr-1" />
                </button>
                <button
                  onClick={() => manejarEliminarVenta(venta.id)}
                  className="flex-1 px-3 py-2 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200 transition flex items-center justify-center"
                  title="Eliminar"
                >
                  <FaTrash className="mr-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mensaje cuando no hay ventas */}
        {ventas.length === 0 && (
          <div className="text-center py-12">
            <FaShoppingCart className="mx-auto text-gray-400 text-6xl mb-4" />
            <p className="text-gray-500 text-lg">No hay ventas registradas</p>
            <p className="text-gray-400 text-sm">Haz clic en Nueva Venta para comenzar</p>
          </div>
        )}

        {/* Botón de volver */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center justify-center mx-auto"
          >
            <FaArrowLeft className="inline-block mr-2" /> Volver al Panel
          </button>
        </div>
      </div>

      {/* Modal para Crear/Editar Venta */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                  <FaReceipt className="mr-2 text-blue-600" />
                  {idVentaEditando ? "Editar Venta" : "Registrar Nueva Venta"}
                </h2>
                <button
                  onClick={cerrarModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>

              <form onSubmit={manejarGuardarVenta}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Columna Izquierda */}
                  <div className="space-y-4">
                    {/* Cliente */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <FaUser className="inline mr-2" /> Cliente
                      </label>
                      <select
                        value={formData.cliente}
                        onChange={(e) => manejarCambioFormulario("cliente", e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Seleccionar cliente</option>
                        {clientesDisponibles.map(cliente => (
                          <option key={cliente} value={cliente}>{cliente}</option>
                        ))}
                      </select>
                    </div>

                    {/* Producto */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <FaBox className="inline mr-2" /> Producto
                      </label>
                      <select
                        value={formData.producto}
                        onChange={(e) => manejarCambioFormulario("producto", e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Seleccionar producto</option>
                        {productosDisponibles.map(producto => (
                          <option key={producto} value={producto}>{producto}</option>
                        ))}
                      </select>
                    </div>

                    {/* Cantidad */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cantidad
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={formData.cantidad}
                        onChange={(e) => manejarCambioFormulario("cantidad", parseInt(e.target.value) || 1)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Columna Derecha */}
                  <div className="space-y-4">
                    {/* Precio Unitario */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <FaDollarSign className="inline mr-2" /> Precio Unitario
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.precioUnitario}
                        onChange={(e) => manejarCambioFormulario("precioUnitario", parseFloat(e.target.value) || 0)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    {/* Total (calculado) */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Total
                      </label>
                      <input
                        type="text"
                        value={`$${calcularTotal()}`}
                        readOnly
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                      />
                    </div>

                    {/* Estado */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Estado
                      </label>
                      <select
                        value={formData.estado}
                        onChange={(e) => manejarCambioFormulario("estado", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="Completada">Completada</option>
                        <option value="Pendiente">Pendiente</option>
                      </select>
                    </div>
                  </div>

                  {/* Descripción - Span completo */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Descripción
                    </label>
                    <textarea
                      value={formData.descripcion}
                      onChange={(e) => manejarCambioFormulario("descripcion", e.target.value)}
                      rows="3"
                      placeholder="Descripción de la venta (opcional)"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Botones - Span completo */}
                <div className="mt-8 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={cerrarModal}
                    className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition flex items-center justify-center"
                  >
                    <FaTimes className="inline-block mr-2" /> Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
                  >
                    <FaSave className="inline-block mr-2" />
                    {idVentaEditando ? "Actualizar Venta" : "Guardar Venta"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VentaProducto;