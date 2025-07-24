import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";

const DashboardResumen = () => {
  const navigate = useNavigate();

  // Datos de ejemplo para gráficos
  const ventasData = [
    { name: "Ene", ventas: 4000, membresias: 2400 },
    { name: "Feb", ventas: 3000, membresias: 1398 },
    { name: "Mar", ventas: 2000, membresias: 9800 },
    { name: "Abr", ventas: 2780, membresias: 3908 },
    { name: "May", ventas: 1890, membresias: 4800 },
    { name: "Jun", ventas: 2390, membresias: 3800 },
    { name: "Jul", ventas: 3490, membresias: 4300 },
  ];

  const productosData = [
    { name: "Proteínas", value: 35 },
    { name: "Ropa deportiva", value: 25 },
    { name: "Accesorios", value: 20 },
    { name: "Suplementos", value: 15 },
    { name: "Otros", value: 5 },
  ];

  const membresiasData = [
    { name: "Oro", value: 45 },
    { name: "Plata", value: 30 },
    { name: "Bronce", value: 15 },
    { name: "Premium", value: 10 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];
  const MEMBERSHIP_COLORS = ["#FFD700", "#C0C0C0", "#CD7F32", "#A020F0"];

  // Métricas principales
  const metricas = [
    {
      title: "Ingresos Totales",
      value: "$24,580",
      change: "+12%",
      trend: "up",
      icon: "💰",
    },
    {
      title: "Clientes Activos",
      value: "1,245",
      change: "+5%",
      trend: "up",
      icon: "👥",
    },
    {
      title: "Membresías Activas",
      value: "856",
      change: "+8%",
      trend: "up",
      icon: "🏅",
    },
    {
      title: "Productos Vendidos",
      value: "324",
      change: "-3%",
      trend: "down",
      icon: "🛒",
    },
  ];

  // Últimas actividades
  const actividades = [
    {
      id: 1,
      tipo: "Venta",
      descripcion: "Proteína Whey - Juan Pérez",
      monto: "$85",
      hora: "10:30 AM",
    },
    {
      id: 2,
      tipo: "Pago",
      descripcion: "Membresía Oro - María Gómez",
      monto: "$120",
      hora: "11:15 AM",
    },
    {
      id: 3,
      tipo: "Renovación",
      descripcion: "Membresía Plata - Carlos Ruiz",
      monto: "$90",
      hora: "12:45 PM",
    },
    {
      id: 4,
      tipo: "Nuevo Cliente",
      descripcion: "Registro completo - Ana Martínez",
      monto: "",
      hora: "2:30 PM",
    },
  ];

  return (
    <div
      className="min-h-screen pt-16 bg-gray-50"
      style={{
        backgroundImage: "url('/login.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Fondo semitransparente para mejorar legibilidad */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Título y fecha */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Resumen General
            </h1>
            <p className="text-gray-600">Visión completa de tu negocio</p>
          </div>
          <div className="bg-white/80 rounded-lg px-4 py-2 shadow-sm mt-2 md:mt-0">
            <p className="text-gray-700 font-medium">
              {new Date().toLocaleDateString("es-ES", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Métricas principales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metricas.map((metrica, index) => (
            <div
              key={index}
              className="bg-white/90 rounded-xl shadow-md p-6 backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm font-medium">
                    {metrica.title}
                  </p>
                  <p className="text-2xl font-bold mt-1">{metrica.value}</p>
                </div>
                <span className="text-2xl">{metrica.icon}</span>
              </div>
              <div
                className={`mt-4 flex items-center text-sm font-medium ${
                  metrica.trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {metrica.change} {metrica.trend === "up" ? "↑" : "↓"} vs mes
                anterior
              </div>
            </div>
          ))}
        </div>

        {/* Sección de gráficos principales */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Gráfico de ventas y membresías */}
          <div className="bg-white/90 rounded-xl shadow-md p-6 backdrop-blur-sm border border-white/20">
            <h2 className="text-xl font-semibold mb-4">Ingresos Mensuales</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ventasData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="ventas"
                    name="Ventas de productos"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.2}
                  />
                  <Area
                    type="monotone"
                    dataKey="membresias"
                    name="Membresías"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gráfico de distribución de membresías */}
          <div className="bg-white/90 rounded-xl shadow-md p-6 backdrop-blur-sm border border-white/20">
            <h2 className="text-xl font-semibold mb-4">
              Distribución de Membresías
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={membresiasData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {membresiasData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          MEMBERSHIP_COLORS[index % MEMBERSHIP_COLORS.length]
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Segunda fila de gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Gráfico de productos más vendidos */}
          <div className="bg-white/90 rounded-xl shadow-md p-6 backdrop-blur-sm border border-white/20">
            <h2 className="text-xl font-semibold mb-4">
              Productos Más Vendidos
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={productosData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="Porcentaje de ventas">
                    {productosData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Últimas actividades */}
          <div className="bg-white/90 rounded-xl shadow-md p-6 backdrop-blur-sm border border-white/20">
            <h2 className="text-xl font-semibold mb-4">
              Actividades Recientes
            </h2>
            <div className="space-y-4">
              {actividades.map((actividad) => (
                <div
                  key={actividad.id}
                  className="flex items-start p-3 hover:bg-gray-50/50 rounded-lg transition-colors"
                >
                  <div
                    className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                      actividad.tipo === "Venta"
                        ? "bg-blue-100 text-blue-600"
                        : actividad.tipo === "Pago"
                        ? "bg-green-100 text-green-600"
                        : actividad.tipo === "Renovación"
                        ? "bg-purple-100 text-purple-600"
                        : "bg-amber-100 text-amber-600"
                    }`}
                  >
                    {actividad.tipo === "Venta"
                      ? "🛒"
                      : actividad.tipo === "Pago"
                      ? "💰"
                      : actividad.tipo === "Renovación"
                      ? "🔄"
                      : "👤"}
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {actividad.descripcion}
                    </p>
                    <p className="text-sm text-gray-500">
                      {actividad.tipo} · {actividad.hora}
                    </p>
                  </div>
                  {actividad.monto && (
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">
                        {actividad.monto}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate("/actividades")}
              className="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              Ver todas las actividades →
            </button>
          </div>
        </div>

        {/* Mini cards de acceso rápido */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <button
            onClick={() => navigate("/membresias")}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-all border border-blue-100"
          >
            <div className="text-blue-600 text-lg mb-2">🏅</div>
            <p className="font-medium text-gray-800">Membresías</p>
          </button>
          <button
            onClick={() => navigate("/pagos")}
            className="bg-gradient-to-r from-green-50 to-teal-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-all border border-green-100"
          >
            <div className="text-green-600 text-lg mb-2">💳</div>
            <p className="font-medium text-gray-800">Pagos</p>
          </button>
          <button
            onClick={() => navigate("/ventas")}
            className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-all border border-purple-100"
          >
            <div className="text-purple-600 text-lg mb-2">🛒</div>
            <p className="font-medium text-gray-800">Ventas</p>
          </button>
          <button
            onClick={() => navigate("/clientes")}
            className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-all border border-amber-100"
          >
            <div className="text-amber-600 text-lg mb-2">👥</div>
            <p className="font-medium text-gray-800">Clientes</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardResumen;
