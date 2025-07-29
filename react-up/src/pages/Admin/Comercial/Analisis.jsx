import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductosMasVendidos = () => {
  const navigate = useNavigate();

  // Datos simulados (puedes reemplazarlo con tu API)
  const [productos] = useState([
    {
      id: 1,
      nombre: "Suplemento Proteico",
      imagen: "https://cdn-icons-png.flaticon.com/512/3132/3132758.png",
      unidadesVendidas: 124,
      ingresos: 3720,
      categoria: "Nutrición",
      bgColor: "bg-teal-50",
      textColor: "text-teal-600",
    },
    {
      id: 2,
      nombre: "Mancuernas 10kg",
      imagen: "https://cdn-icons-png.flaticon.com/512/3132/3132760.png",
      unidadesVendidas: 89,
      ingresos: 4450,
      categoria: "Equipamiento",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-600",
    },
    {
      id: 3,
      nombre: "Barra Olímpica",
      imagen: "https://cdn-icons-png.flaticon.com/512/3132/3132756.png",
      unidadesVendidas: 67,
      ingresos: 6700,
      categoria: "Equipamiento",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-600",
    },
    {
      id: 4,
      nombre: "Bebida Energética",
      imagen: "https://cdn-icons-png.flaticon.com/512/3132/3132759.png",
      unidadesVendidas: 53,
      ingresos: 1060,
      categoria: "Nutrición",
      bgColor: "bg-teal-50",
      textColor: "text-teal-600",
    },
    {
      id: 5,
      nombre: "Rodilleras Deportivas",
      imagen: "https://cdn-icons-png.flaticon.com/512/3132/3132761.png",
      unidadesVendidas: 45,
      ingresos: 1350,
      categoria: "Accesorios",
      bgColor: "bg-amber-50",
      textColor: "text-amber-600",
    },
  ]);

  const [filtro, setFiltro] = useState("todos");

  const productosFiltrados = filtro === "todos"
    ? productos
    : productos.filter((p) => p.categoria === filtro);

  const categorias = ["todos", "Nutrición", "Equipamiento", "Accesorios"];

  // Colores por categoría (para las cards de filtro)
  const categoriaColor = {
    todos: "bg-amber-50 text-amber-700 border-amber-200",
    Nutrición: "bg-teal-50 text-teal-700 border-teal-200",
    Equipamiento: "bg-indigo-50 text-indigo-700 border-indigo-200",
    Accesorios: "bg-amber-50 text-amber-700 border-amber-200",
  };

  return (
    <div
      className="min-h-screen pt-16 bg-gray-50"
      style={{
        backgroundImage: "url('/gimnasio_comercial_productos.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay para mejorar legibilidad */}
      <div className="absolute inset-0 bg-black/10"></div>

      {/* Contenido */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Título */}
        <h1 className="text-3xl font-bold text-white mb-2 text-center">
          Productos Más Vendidos
        </h1>
        <p className="text-center text-white/90 mb-8">
          Análisis de ventas por producto - Top 5
        </p>

        {/* Filtros con colores del dashboard */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categorias.map((cat) => {
            const colorClass = categoriaColor[cat];
            return (
              <button
                key={cat}
                onClick={() => setFiltro(cat)}
                className={`px-6 py-2.5 rounded-2xl text-sm font-semibold border-2 transition-all duration-300 transform hover:scale-105 shadow-sm ${
                  filtro === cat
                    ? colorClass + " shadow-md"
                    : "bg-white/20 text-white border-white/30 backdrop-blur-sm hover:bg-white/30"
                }`}
              >
                {cat === "todos" ? "Todos" : cat}
              </button>
            );
          })}
        </div>

        {/* Grid de productos (como cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {productosFiltrados.map((producto) => (
            <div
              key={producto.id}
              className={`${producto.bgColor} rounded-2xl shadow-lg p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-transparent hover:border-white/30 backdrop-blur-sm`}
            >
              <div className="flex items-center mb-4">
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="h-14 w-14 object-contain drop-shadow-md"
                />
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-800">{producto.nombre}</h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${producto.textColor} bg-white/50`}
                  >
                    {producto.categoria}
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Unidades vendidas:</span>
                  <span className="font-semibold text-gray-800">
                    {producto.unidadesVendidas}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ingresos:</span>
                  <span className="font-bold text-green-600">
                    S/. {producto.ingresos}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Resumen estadístico con colores del dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-teal-50 rounded-2xl p-5 text-center shadow-md backdrop-blur-sm border border-teal-200">
            <p className="text-teal-700 text-sm font-medium">Productos Analizados</p>
            <p className="text-2xl font-bold text-teal-800">{productos.length}</p>
          </div>
          <div className="bg-indigo-50 rounded-2xl p-5 text-center shadow-md backdrop-blur-sm border border-indigo-200">
            <p className="text-indigo-700 text-sm font-medium">Unidades Totales</p>
            <p className="text-2xl font-bold text-indigo-800">
              {productos.reduce((acc, p) => acc + p.unidadesVendidas, 0)}
            </p>
          </div>
          <div className="bg-amber-50 rounded-2xl p-5 text-center shadow-md backdrop-blur-sm border border-amber-200">
            <p className="text-amber-700 text-sm font-medium">Ingresos Totales</p>
            <p className="text-2xl font-bold text-amber-800">
              S/. {productos.reduce((acc, p) => acc + p.ingresos, 0)}
            </p>
          </div>
        </div>

        {/* Botón de volver */}
        <div className="text-center">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center justify-center mx-auto"
          >
            ← Volver al Panel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductosMasVendidos;