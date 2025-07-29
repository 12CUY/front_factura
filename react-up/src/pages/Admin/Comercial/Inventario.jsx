import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  FaBox,
  FaSave,
  FaTimes,
  FaArrowLeft,
  FaEdit,
  FaTrash,
  FaEye,
  FaPlus,
  FaDollarSign,
  FaWarehouse,
  FaCalendarAlt,
  FaTag,
  FaWeight,
} from "react-icons/fa";

const Inventario = () => {
  const navigate = useNavigate();

  // Estado para gestionar los productos
  const [productos, setProductos] = useState([
    {
      id: 1,
      nombre: "Proteína Whey Gold",
      categoria: "Proteínas",
      stock: 25, // Solo un campo de stock
      precioVenta: 45.99, // Solo precio de venta
      proveedor: "SupplementPlus",
      fecha: "2025-07-15", // Renombrada a 'fecha'
      descripcion: "Proteína de suero de alta calidad, ideal para desarrollo muscular. Sabor vainilla. Contenido: 2kg.",
      estado: "Disponible"
    },
    {
      id: 2,
      nombre: "Creatina Monohidrato",
      categoria: "Creatinas",
      stock: 15,
      precioVenta: 29.99,
      proveedor: "NutriMax",
      fecha: "2026-07-20", // Renombrada a 'fecha'
      descripcion: "Creatina pura micronizada para mayor absorción. Mejora el rendimiento deportivo. Contenido: 300g.",
      estado: "Disponible"
    },
    {
      id: 3,
      nombre: "Pre-Entreno Energy",
      categoria: "Pre-Entrenos",
      stock: 3,
      precioVenta: 35.50,
      proveedor: "FitLife",
      fecha: "2025-12-18", // Renombrada a 'fecha'
      descripcion: "Energizante pre-entrenamiento con cafeína y beta-alanina. Sabor tropical. Contenido: 450g.",
      estado: "Stock Bajo"
    },
    {
      id: 4,
      nombre: "BCAA Complex",
      categoria: "Aminoácidos",
      stock: 18,
      precioVenta: 42.00,
      proveedor: "MuscleTech",
      fecha: "2025-11-22", // Renombrada a 'fecha'
      descripcion: "Aminoácidos esenciales para recuperación muscular. Contenido: 400g.",
      estado: "Disponible"
    },
    {
      id: 5,
      nombre: "Glutamina Pura",
      categoria: "Aminoácidos",
      stock: 0,
      precioVenta: 32.99,
      proveedor: "NutriMax",
      fecha: "2025-09-10", // Renombrada a 'fecha'
      descripcion: "L-Glutamina pura para recuperación muscular y sistema inmune. Sin sabor. Contenido: 500g.",
      estado: "Agotado"
    }
  ]);

  // Estado para el formulario de nuevo producto
  const [formData, setFormData] = useState({
    nombre: "",
    categoria: "",
    stock: 0,
    precioVenta: 0,
    proveedor: "",
    fecha: "", // Renombrada a 'fecha'
    descripcion: "",
    estado: "Disponible"
  });

  const [idProductoEditando, setIdProductoEditando] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Categorías disponibles
  const categoriasDisponibles = [
    "Proteínas",
    "Creatinas",
    "Pre-Entrenos",
    "Aminoácidos",
    "Vitaminas",
    "Quemadores",
    "Carbohidratos",
    "Otros"
  ];

  // Proveedores disponibles
  const proveedoresDisponibles = [
    "SupplementPlus",
    "NutriMax",
    "FitLife",
    "MuscleTech",
    "OptimumNutrition",
    "BSN",
    "Dymatize",
    "Universal"
  ];

  const manejarCambioFormulario = (campo, valor) => {
    setFormData(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  // Ajustado para usar solo un valor de stock
  const determinarEstado = (stock) => {
    if (stock === 0) return "Agotado";
    if (stock <= 5) return "Stock Bajo"; // Valor arbitrario para 'Stock Bajo'
    return "Disponible";
  };

  const manejarGuardarProducto = (e) => {
    e.preventDefault();

    if (!formData.nombre || !formData.categoria || formData.precioVenta <= 0) {
      Swal.fire("Error", "Por favor complete todos los campos requeridos.", "error");
      return;
    }

    const productoData = {
      ...formData,
      estado: determinarEstado(formData.stock),
      // Ya no se añade fechaIngreso, solo se usa 'fecha' del formulario
    };

    if (idProductoEditando) {
      // Actualizar producto existente
      setProductos(productos.map(producto =>
        producto.id === idProductoEditando
          ? { ...producto, ...productoData }
          : producto
      ));
      Swal.fire("¡Actualizado!", "Producto actualizado correctamente.", "success");
      setIdProductoEditando(null);
    } else {
      // Crear nuevo producto
      const nuevoId = productos.length ? Math.max(...productos.map(p => p.id)) + 1 : 1;

      setProductos([...productos, {
        id: nuevoId,
        ...productoData
      }]);
      Swal.fire("¡Creado!", "Producto registrado correctamente.", "success");
    }

    // Limpiar formulario
    setFormData({
      nombre: "",
      categoria: "",
      stock: 0,
      precioVenta: 0,
      proveedor: "",
      fecha: "", // Limpia el campo 'fecha'
      descripcion: "",
      estado: "Disponible"
    });
    setMostrarFormulario(false);
  };

  const manejarEditarProducto = (producto) => {
    setFormData({
      nombre: producto.nombre,
      categoria: producto.categoria,
      stock: producto.stock,
      precioVenta: producto.precioVenta,
      proveedor: producto.proveedor,
      fecha: producto.fecha, // Usa el campo 'fecha'
      descripcion: producto.descripcion,
      estado: producto.estado
    });
    setIdProductoEditando(producto.id);
    setMostrarFormulario(true);
  };

  const manejarEliminarProducto = (id) => {
    Swal.fire({
      title: "¿Eliminar producto?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setProductos(productos.filter(producto => producto.id !== id));
        Swal.fire("Eliminado", "El producto ha sido eliminado", "success");
      }
    });
  };

  const manejarVerDetalles = (producto) => {
    Swal.fire({
      title: `Detalles de ${producto.nombre}`,
      html: `
        <div class="text-left space-y-2">
          <p><strong>Categoría:</strong> ${producto.categoria}</p>
          <p><strong>Stock:</strong> ${producto.stock} unidades</p>
          <p><strong>Precio Venta:</strong> $${producto.precioVenta}</p>
          <p><strong>Proveedor:</strong> ${producto.proveedor}</p>
          <p><strong>Fecha:</strong> ${producto.fecha}</p>
          <p><strong>Estado:</strong> ${producto.estado}</p>
          <p><strong>Descripción:</strong> ${producto.descripcion}</p>
        </div>
      `,
      icon: "info",
      confirmButtonText: "Cerrar",
      width: '600px'
    });
  };

  const manejarCancelarEdicion = () => {
    setFormData({
      nombre: "",
      categoria: "",
      stock: 0,
      precioVenta: 0,
      proveedor: "",
      fecha: "", // Limpia el campo 'fecha'
      descripcion: "",
      estado: "Disponible"
    });
    setIdProductoEditando(null);
    setMostrarFormulario(false);
  };

  const obtenerColorEstado = (estado) => {
    switch (estado) {
      case 'Disponible':
        return 'bg-blue-100 text-blue-800';
      case 'Stock Bajo':
        return 'bg-yellow-100 text-yellow-800';
      case 'Agotado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
        {/* Eliminado: Título "Gestión de Inventario" */}
        {/* <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center sm:text-4xl lg:text-5xl">
          <FaWarehouse className="inline-block mr-3 text-blue-600" />
          Gestión de Inventario
        </h1> */}

        {/* Botón para mostrar/ocultar formulario */}
        <div className="text-center mb-8">
          <button
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out flex items-center justify-center mx-auto text-lg"
          >
            <FaPlus className="inline-block mr-3 text-xl" />
            {mostrarFormulario ? "Ocultar Formulario" : "Nuevo Producto"}
          </button>
        </div>

        {/* Formulario de Nuevo Producto */}
        {mostrarFormulario && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 backdrop-blur-sm bg-white/90">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
              <FaBox className="mr-2 text-blue-600" />
              {idProductoEditando ? "Editar Producto" : "Registrar Nuevo Producto"}
            </h2>

            <form onSubmit={manejarGuardarProducto} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Columna 1 - Información Básica */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-700 border-b pb-2">Información Básica</h3>

                {/* Nombre */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FaTag className="inline mr-2" /> Nombre del Producto
                  </label>
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => manejarCambioFormulario("nombre", e.target.value)}
                    required
                    placeholder="Ej: Proteína Whey Gold"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Categoría */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Categoría
                  </label>
                  <select
                    value={formData.categoria}
                    onChange={(e) => manejarCambioFormulario("categoria", e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Seleccionar categoría</option>
                    {categoriasDisponibles.map(categoria => (
                      <option key={categoria} value={categoria}>{categoria}</option>
                    ))}
                  </select>
                </div>

                {/* Proveedor */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Proveedor
                  </label>
                  <select
                    value={formData.proveedor}
                    onChange={(e) => manejarCambioFormulario("proveedor", e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Seleccionar proveedor</option>
                    {proveedoresDisponibles.map(proveedor => (
                      <option key={proveedor} value={proveedor}>{proveedor}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Columna 2 - Stock y Precio */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-700 border-b pb-2">Stock y Precio</h3>

                {/* Stock (Ahora solo "Stock") */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FaWeight className="inline mr-2" /> Stock
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.stock}
                    onChange={(e) => manejarCambioFormulario("stock", parseInt(e.target.value) || 0)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Precio Venta */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FaDollarSign className="inline mr-2" /> Precio Venta
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.precioVenta}
                    onChange={(e) => manejarCambioFormulario("precioVenta", parseFloat(e.target.value) || 0)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Columna 3 - Otros Datos (Solo una fecha) */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-700 border-b pb-2">Otros Datos</h3>

                {/* Fecha (único campo de fecha) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FaCalendarAlt className="inline mr-2" /> Fecha
                  </label>
                  <input
                    type="date"
                    value={formData.fecha}
                    onChange={(e) => manejarCambioFormulario("fecha", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Descripción - Span completo */}
              <div className="lg:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción del Producto
                </label>
                <textarea
                  value={formData.descripcion}
                  onChange={(e) => manejarCambioFormulario("descripcion", e.target.value)}
                  rows="3"
                  placeholder="Descripción detallada del producto, características, contenido, etc."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Botones - Span completo */}
              <div className="lg:col-span-3 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={manejarCancelarEdicion}
                  className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition flex items-center justify-center"
                >
                  <FaTimes className="inline-block mr-2" /> Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
                >
                  <FaSave className="inline-block mr-2" />
                  {idProductoEditando ? "Actualizar Producto" : "Guardar Producto"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Título del Listado de Productos */}
        <h2 className="text-3xl font-bold mb-6 text-white flex items-center">
          <FaBox className="mr-2 text-blue-600" />
          Listado de Productos ({productos.length})
        </h2>

        {/* Grid de Productos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productos.map((producto) => (
            <div
              key={producto.id}
              className="bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-md border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Header de la card */}
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{producto.nombre}</h3>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${obtenerColorEstado(producto.estado)}`}>
                  {producto.estado}
                </span>
              </div>

              {/* Información del producto */}
              <div className="mb-3 space-y-2">
                <p className="text-sm">
                  <span className="font-medium text-gray-700">Categoría:</span> {producto.categoria}
                </p>
                <p className="text-sm">
                  <span className="font-medium text-gray-700">Stock:</span> {producto.stock} unidades
                </p>
                <p className="text-sm">
                  <span className="font-medium text-gray-700">Proveedor:</span> {producto.proveedor}
                </p>
              </div>

              {/* Descripción */}
              <div className="mb-4">
                <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                  {producto.descripcion}
                </p>
              </div>

              {/* Precios (solo Precio Venta) */}
              <div className="mb-4 p-2 bg-blue-50 rounded-lg">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Venta:</span>
                  <span className="font-bold text-blue-600">${producto.precioVenta}</span>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex justify-between space-x-2">
                <button
                  onClick={() => manejarVerDetalles(producto)}
                  className="flex-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition flex items-center justify-center"
                  title="Ver detalles"
                >
                  <FaEye className="mr-1" />
                </button>
                <button
                  onClick={() => manejarEditarProducto(producto)}
                  className="flex-1 px-3 py-2 bg-orange-100 text-orange-700 rounded-lg text-sm hover:bg-orange-200 transition flex items-center justify-center"
                  title="Editar"
                >
                  <FaEdit className="mr-1" />
                </button>
                <button
                  onClick={() => manejarEliminarProducto(producto.id)}
                  className="flex-1 px-3 py-2 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200 transition flex items-center justify-center"
                  title="Eliminar"
                >
                  <FaTrash className="mr-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mensaje cuando no hay productos */}
        {productos.length === 0 && (
          <div className="text-center py-12">
            <FaWarehouse className="mx-auto text-gray-400 text-6xl mb-4" />
            <p className="text-gray-500 text-lg">No hay productos en inventario</p>
            <p className="text-gray-400 text-sm">Haz clic en "Nuevo Producto" para comenzar</p>
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
    </div>
  );
};

export default Inventario;