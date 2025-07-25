import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';

const DashboardResumen = () => {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null);
  const [selectedData, setSelectedData] = useState(null);

  // Datos para gráficos
  const ventasData = [
    { name: "Ene", ventas: 4000, membresias: 2400, clientes: 1200 },
    { name: "Feb", ventas: 3000, membresias: 1398, clientes: 1350 },
    { name: "Mar", ventas: 2000, membresias: 9800, clientes: 1280 },
    { name: "Abr", ventas: 2780, membresias: 3908, clientes: 1500 },
    { name: "May", ventas: 1890, membresias: 4800, clientes: 1420 },
    { name: "Jun", ventas: 2390, membresias: 3800, clientes: 1380 },
    { name: "Jul", ventas: 3490, membresias: 4300, clientes: 1600 },
  ];

  const productosData = [
    { name: "Proteínas", value: 35, cantidad: 320 },
    { name: "Ropa deportiva", value: 25, cantidad: 210 },
    { name: "Accesorios", value: 20, cantidad: 180 },
    { name: "Suplementos", value: 15, cantidad: 150 },
    { name: "Otros", value: 5, cantidad: 50 },
  ];

  const membresiasData = [
    { name: "Oro", value: 45, precio: 120, clientes: 65 },
    { name: "Plata", value: 30, precio: 90, clientes: 72 },
    { name: "Bronce", value: 15, precio: 60, clientes: 19 },
    { name: "Premium", value: 10, precio: 150, clientes: 8 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];
  const MEMBERSHIP_COLORS = ["#FFD700", "#C0C0C0", "#CD7F32", "#A020F0"];

  // Métricas principales
  const metricas = [
    { title: "Ingresos Totales", value: "$24,580", change: "+12%", trend: "up", icon: "💰", key: "ingresos" },
    { title: "Clientes Activos", value: "1,245", change: "+5%", trend: "up", icon: "👥", key: "clientes" },
    { title: "Membresías Activas", value: "856", change: "+8%", trend: "up", icon: "🏅", key: "membresias" },
    { title: "Productos Vendidos", value: "324", change: "-3%", trend: "down", icon: "🛒", key: "productos" },
  ];

  // Últimas actividades
  const actividades = [
    { id: 1, tipo: "Venta", descripcion: "Proteína Whey - Juan Pérez", monto: "$85", hora: "10:30 AM", detalle: "2 unidades de Whey Protein, 1 shaker" },
    { id: 2, tipo: "Pago", descripcion: "Membresía Oro - María Gómez", monto: "$120", hora: "11:15 AM", detalle: "Pago mensual, vence el 15/08" },
    { id: 3, tipo: "Renovación", descripcion: "Membresía Plata - Carlos Ruiz", monto: "$90", hora: "12:45 PM", detalle: "Renovación por 3 meses" },
    { id: 4, tipo: "Nuevo Cliente", descripcion: "Registro completo - Ana Martínez", monto: "", hora: "2:30 PM", detalle: "Cliente referido por Juan Pérez" },
  ];

  // Componente Modal
  const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
    if (!isOpen) return null;

    const sizeClasses = {
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl",
      full: "max-w-4xl"
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className={`bg-white rounded-lg p-6 w-full ${sizeClasses[size]} max-h-[90vh] overflow-hidden`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">{title}</h3>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>
          </div>
          <div className="overflow-y-auto max-h-[70vh]">
            {children}
          </div>
        </div>
      </div>
    );
  };

  // Handler para mostrar detalles
  const handleShowDetails = (data, type) => {
    setSelectedData({ ...data, type });
    setActiveModal('details');
  };

  // Handler para gráficos interactivos
  const handleChartClick = (data, index, chartType) => {
    let detailData;
    if (chartType === 'productos') {
      detailData = productosData[index];
    } else if (chartType === 'membresias') {
      detailData = membresiasData[index];
    }
    handleShowDetails(detailData, chartType);
  };

  return (
    <div 
      className="min-h-screen pt-16 bg-gray-50"
      style={{
        backgroundImage: "url('/gimnasioD.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Fondo semitransparente */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
      
      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Resumen General</h1>
            <p className="text-black">Visión completa de tu negocio</p>
          </div>
          <div className="bg-white/80 rounded-lg px-4 py-2 shadow-sm mt-2 md:mt-0">
            <p className="text-gray-700 font-medium">
              {new Date().toLocaleDateString('es-ES', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>

        {/* Métricas principales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metricas.map((metrica) => (
            <div 
              key={metrica.key}
              onClick={() => setActiveModal(metrica.key)}
              className="bg-white/90 rounded-xl shadow-md p-6 backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm font-medium">{metrica.title}</p>
                  <p className="text-2xl font-bold mt-1">{metrica.value}</p>
                </div>
                <span className="text-2xl">{metrica.icon}</span>
              </div>
              <div className={`mt-4 flex items-center text-sm font-medium ${
                metrica.trend === "up" ? "text-green-600" : "text-red-600"
              }`}>
                {metrica.change} {metrica.trend === "up" ? "↑" : "↓"} vs mes anterior
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
                    activeDot={{ onClick: () => setActiveModal('ventas') }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="membresias" 
                    name="Membresías" 
                    stroke="#82ca9d" 
                    fill="#82ca9d" 
                    fillOpacity={0.2} 
                    activeDot={{ onClick: () => setActiveModal('membresias') }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="clientes" 
                    name="Clientes" 
                    stroke="#ffc658" 
                    fill="#ffc658" 
                    fillOpacity={0.2} 
                    activeDot={{ onClick: () => setActiveModal('clientes') }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gráfico de distribución de membresías */}
          <div className="bg-white/90 rounded-xl shadow-md p-6 backdrop-blur-sm border border-white/20">
            <h2 className="text-xl font-semibold mb-4">Distribución de Membresías</h2>
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
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    onClick={(data, index) => handleChartClick(data, index, 'membresias')}
                  >
                    {membresiasData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={MEMBERSHIP_COLORS[index % MEMBERSHIP_COLORS.length]} 
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name, props) => [
                    `${value} membresías (${((value / 100) * 100).toFixed(0)}%)`, 
                    name
                  ]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Segunda fila de gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Gráfico de productos más vendidos */}
          <div className="bg-white/90 rounded-xl shadow-md p-6 backdrop-blur-sm border border-white/20">
            <h2 className="text-xl font-semibold mb-4">Productos Más Vendidos</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={productosData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value, name, props) => [
                    `${value}% (${props.payload.cantidad} unidades)`, 
                    name
                  ]} />
                  <Legend />
                  <Bar 
                    dataKey="value" 
                    name="Porcentaje de ventas"
                    onClick={(data, index) => handleChartClick(data, index, 'productos')}
                  >
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
            <h2 className="text-xl font-semibold mb-4">Actividades Recientes</h2>
            <div className="space-y-4">
              {actividades.map((actividad) => (
                <div 
                  key={actividad.id}
                  onClick={() => handleShowDetails(actividad, 'actividad')}
                  className="flex items-start p-3 hover:bg-gray-50/50 rounded-lg transition-colors cursor-pointer"
                >
                  <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                    actividad.tipo === "Venta" ? "bg-blue-100 text-blue-600" :
                    actividad.tipo === "Pago" ? "bg-green-100 text-green-600" :
                    actividad.tipo === "Renovación" ? "bg-purple-100 text-purple-600" :
                    "bg-amber-100 text-amber-600"
                  }`}>
                    {actividad.tipo === "Venta" ? "🛒" : 
                     actividad.tipo === "Pago" ? "💰" : 
                     actividad.tipo === "Renovación" ? "🔄" : "👤"}
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-medium text-gray-900">{actividad.descripcion}</p>
                    <p className="text-sm text-gray-500">{actividad.tipo} · {actividad.hora}</p>
                  </div>
                  {actividad.monto && (
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">{actividad.monto}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button 
              onClick={() => navigate('/actividades')}
              className="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              Ver todas las actividades →
            </button>
          </div>
        </div>

        {/* Mini cards de acceso rápido */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <button 
            onClick={() => navigate('/dashboardC')}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-all border border-blue-100"
          >
            <div className="text-blue-600 text-lg mb-2">🏅</div>
            <p className="font-medium text-gray-800">Membresías</p>
          </button>
          <button 
            onClick={() => navigate('/dashboardC')}
            className="bg-gradient-to-r from-green-50 to-teal-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-all border border-green-100"
          >
            <div className="text-green-600 text-lg mb-2">💳</div>
            <p className="font-medium text-gray-800">Pagos</p>
          </button>
          <button 
            onClick={() => navigate('/dashboardC')}
            className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-all border border-purple-100"
          >
            <div className="text-purple-600 text-lg mb-2">🛒</div>
            <p className="font-medium text-gray-800">Ventas</p>
          </button>
          <button 
            onClick={() => navigate('/dashboardU')}
            className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-all border border-amber-100"
          >
            <div className="text-amber-600 text-lg mb-2">👥</div>
            <p className="font-medium text-gray-800">Clientes</p>
          </button>
        </div>
      </div>

      {/* Modales */}
      {/* Modal de detalles */}
      <Modal
        isOpen={activeModal === 'details'}
        onClose={() => setActiveModal(null)}
        title={selectedData?.type === 'productos' ? 'Detalle de Producto' : 
              selectedData?.type === 'membresias' ? 'Detalle de Membresía' :
              selectedData?.type === 'actividad' ? 'Detalle de Actividad' : 'Detalles'}
        size="md"
      >
        {selectedData?.type === 'productos' && (
          <div>
            <h4 className="font-semibold text-lg mb-2">{selectedData.name}</h4>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-blue-50 p-3 rounded">
                <p className="text-sm text-blue-600">Participación</p>
                <p className="text-xl font-bold">{selectedData.value}%</p>
              </div>
              <div className="bg-green-50 p-3 rounded">
                <p className="text-sm text-green-600">Unidades vendidas</p>
                <p className="text-xl font-bold">{selectedData.cantidad}</p>
              </div>
            </div>
            <button 
              onClick={() => {
                navigate('/productos');
                setActiveModal(null);
              }}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            >
              Ver todos los productos
            </button>
          </div>
        )}

        {selectedData?.type === 'membresias' && (
          <div>
            <h4 className="font-semibold text-lg mb-2">Membresía {selectedData.name}</h4>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-purple-50 p-3 rounded">
                <p className="text-sm text-purple-600">Clientes</p>
                <p className="text-xl font-bold">{selectedData.clientes}</p>
              </div>
              <div className="bg-amber-50 p-3 rounded">
                <p className="text-sm text-amber-600">Precio mensual</p>
                <p className="text-xl font-bold">${selectedData.precio}</p>
              </div>
              <div className="bg-blue-50 p-3 rounded">
                <p className="text-sm text-blue-600">Participación</p>
                <p className="text-xl font-bold">{selectedData.value}%</p>
              </div>
            </div>
            <button 
              onClick={() => {
                navigate('/membresias');
                setActiveModal(null);
              }}
              className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600 transition"
            >
              Gestionar membresías
            </button>
          </div>
        )}

        {selectedData?.type === 'actividad' && (
          <div>
            <div className={`flex items-center mb-4 p-3 rounded-lg ${
              selectedData.tipo === "Venta" ? "bg-blue-50" :
              selectedData.tipo === "Pago" ? "bg-green-50" :
              selectedData.tipo === "Renovación" ? "bg-purple-50" :
              "bg-amber-50"
            }`}>
              <span className={`text-2xl mr-3 ${
                selectedData.tipo === "Venta" ? "text-blue-600" :
                selectedData.tipo === "Pago" ? "text-green-600" :
                selectedData.tipo === "Renovación" ? "text-purple-600" :
                "text-amber-600"
              }`}>
                {selectedData.tipo === "Venta" ? "🛒" : 
                 selectedData.tipo === "Pago" ? "💰" : 
                 selectedData.tipo === "Renovación" ? "🔄" : "👤"}
              </span>
              <div>
                <h4 className="font-semibold">{selectedData.descripcion}</h4>
                <p className="text-gray-600">{selectedData.hora}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <h5 className="font-medium text-gray-700 mb-2">Detalles:</h5>
              <p className="text-gray-600">{selectedData.detalle}</p>
            </div>
            
            {selectedData.monto && (
              <div className="bg-gray-50 p-3 rounded mb-4">
                <p className="font-medium">Monto: <span className="text-green-600">{selectedData.monto}</span></p>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Modales para métricas */}
      <Modal
        isOpen={activeModal === 'ingresos'}
        onClose={() => setActiveModal(null)}
        title="Detalle de Ingresos"
        size="lg"
      >
        <div className="h-96 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={ventasData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="ventas" 
                name="Ventas de productos" 
                stroke="#8884d8" 
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="membresias" 
                name="Membresías" 
                stroke="#82ca9d" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <button 
          onClick={() => {
            navigate('/reportes');
            setActiveModal(null);
          }}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Ver reporte financiero completo
        </button>
      </Modal>

      <Modal
        isOpen={activeModal === 'clientes'}
        onClose={() => setActiveModal(null)}
        title="Detalle de Clientes"
        size="lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-700 mb-2">Clientes Activos</h4>
            <p className="text-3xl font-bold">1,024</p>
            <p className="text-sm text-blue-600 mt-1">+5% vs mes anterior</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-700 mb-2">Nuevos Clientes</h4>
            <p className="text-3xl font-bold">42</p>
            <p className="text-sm text-green-600 mt-1">+8% vs mes anterior</p>
          </div>
        </div>
        <div className="h-64 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ventasData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="clientes" name="Clientes activos" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <button 
          onClick={() => {
            navigate('/clientes');
            setActiveModal(null);
          }}
          className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600 transition"
        >
          Gestionar clientes
        </button>
      </Modal>

      <Modal
        isOpen={activeModal === 'membresias'}
        onClose={() => setActiveModal(null)}
        title="Detalle de Membresías"
        size="lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-700 mb-2">Membresías Activas</h4>
            <p className="text-3xl font-bold">856</p>
            <p className="text-sm text-purple-600 mt-1">+8% vs mes anterior</p>
          </div>
          <div className="bg-amber-50 p-4 rounded-lg">
            <h4 className="font-semibold text-amber-700 mb-2">Renovaciones</h4>
            <p className="text-3xl font-bold">124</p>
            <p className="text-sm text-amber-600 mt-1">+15% vs mes anterior</p>
          </div>
        </div>
        <div className="h-64 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={membresiasData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {membresiasData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={MEMBERSHIP_COLORS[index % MEMBERSHIP_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <button 
          onClick={() => {
            navigate('/membresias');
            setActiveModal(null);
          }}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Gestionar membresías
        </button>
      </Modal>

      <Modal
        isOpen={activeModal === 'productos'}
        onClose={() => setActiveModal(null)}
        title="Detalle de Ventas"
        size="lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-700 mb-2">Ventas Totales</h4>
            <p className="text-3xl font-bold">$24,580</p>
            <p className="text-sm text-green-600 mt-1">+12% vs mes anterior</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-700 mb-2">Productos Vendidos</h4>
            <p className="text-3xl font-bold">324</p>
            <p className="text-sm text-blue-600 mt-1">-3% vs mes anterior</p>
          </div>
        </div>
        <div className="h-64 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={productosData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name="Porcentaje de ventas" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <button 
          onClick={() => {
            navigate('/ventas');
            setActiveModal(null);
          }}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
        >
          Ver reporte de ventas
        </button>
      </Modal>
    </div>
  );
};

export default DashboardResumen;