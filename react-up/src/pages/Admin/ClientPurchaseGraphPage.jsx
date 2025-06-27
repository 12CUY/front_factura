// src/pages/Admin/ClientPurchaseGraphPage.jsx
import React, { useEffect, useState } from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement, LineElement // Necesario para Line charts
} from 'chart.js';

// Registrar los componentes de Chart.js que vamos a usar
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

// --- Datos de Ejemplo para Clientes, Facturas y Pagos ---
const allClients = [
  { id: 1, name: 'Ana María Gómez', email: 'ana.gomez@example.com' },
  { id: 2, name: 'Roberto Carlos Díaz', email: 'roberto.diaz@example.com' },
  { id: 3, name: 'Luisa Fernanda Rojas', email: 'luisa.rojas@example.com' },
  { id: 4, name: 'Javier Andrés Flores', email: 'javier.flores@example.com' },
  { id: 5, name: 'Sofía Isabel Morales', email: 'sofia.morales@example.com' },
  { id: 6, name: 'Diego Alejandro Castro', email: 'diego.castro@example.com' },
];

const allInvoices = [
  { id: 101, clientId: 1, invoiceNumber: 'INV-2025-001', issueDate: '2025-01-10', dueDate: '2025-01-25', totalAmount: 250.00, paymentStatus: 'Paid' },
  { id: 102, clientId: 2, invoiceNumber: 'INV-2025-002', issueDate: '2025-01-12', dueDate: '2025-01-27', totalAmount: 180.50, paymentStatus: 'Paid' },
  { id: 103, clientId: 1, invoiceNumber: 'INV-2025-003', issueDate: '2025-02-01', dueDate: '2025-02-15', totalAmount: 350.00, paymentStatus: 'Pending' },
  { id: 104, clientId: 3, invoiceNumber: 'INV-2025-004', issueDate: '2025-02-05', dueDate: '2025-02-20', totalAmount: 95.75, paymentStatus: 'Paid' },
  { id: 105, clientId: 2, invoiceNumber: 'INV-2025-005', issueDate: '2025-03-01', dueDate: '2025-03-15', totalAmount: 420.00, paymentStatus: 'Overdue' },
  { id: 106, clientId: 4, invoiceNumber: 'INV-2025-006', issueDate: '2025-03-10', dueDate: '2025-03-25', totalAmount: 120.00, paymentStatus: 'Paid' },
  { id: 107, clientId: 1, invoiceNumber: 'INV-2025-007', issueDate: '2025-04-01', dueDate: '2025-04-15', totalAmount: 190.00, paymentStatus: 'Paid' },
  { id: 108, clientId: 5, invoiceNumber: 'INV-2025-008', issueDate: '2025-04-05', dueDate: '2025-04-20', totalAmount: 280.00, paymentStatus: 'Pending' },
  { id: 109, clientId: 2, invoiceNumber: 'INV-2025-009', issueDate: '2025-05-01', dueDate: '2025-05-15', totalAmount: 300.00, paymentStatus: 'Paid' },
  { id: 110, clientId: 6, invoiceNumber: 'INV-2025-010', issueDate: '2025-05-10', dueDate: '2025-05-25', totalAmount: 210.00, paymentStatus: 'Paid' },
  { id: 111, clientId: 1, invoiceNumber: 'INV-2025-011', issueDate: '2025-06-01', dueDate: '2025-06-15', totalAmount: 500.00, paymentStatus: 'Paid' },
  { id: 112, clientId: 3, invoiceNumber: 'INV-2025-012', issueDate: '2025-06-05', dueDate: '2025-06-20', totalAmount: 110.00, paymentStatus: 'Paid' },
  { id: 113, clientId: 2, invoiceNumber: 'INV-2025-013', issueDate: '2025-06-15', dueDate: '2025-06-30', totalAmount: 320.00, paymentStatus: 'Pending' },
  { id: 114, clientId: 4, invoiceNumber: 'INV-2025-014', issueDate: '2025-06-20', dueDate: '2025-07-05', totalAmount: 160.00, paymentStatus: 'Overdue' },
  { id: 115, clientId: 5, invoiceNumber: 'INV-2025-015', issueDate: '2025-06-22', dueDate: '2025-07-07', totalAmount: 200.00, paymentStatus: 'Paid' },
];

const allPayments = [
  { id: 201, invoiceId: 101, paymentDate: '2025-01-20', amount: 250.00, paymentMethod: 'PayPal' },
  { id: 202, invoiceId: 102, paymentDate: '2025-01-25', amount: 180.50, paymentMethod: 'Bank Transfer' },
  { id: 203, invoiceId: 104, paymentDate: '2025-02-18', amount: 95.75, paymentMethod: 'PayPal' },
  { id: 204, invoiceId: 106, paymentDate: '2025-03-20', amount: 120.00, paymentMethod: 'Credit Card' },
  { id: 205, invoiceId: 107, paymentDate: '2025-04-10', amount: 190.00, paymentMethod: 'PayPal' },
  { id: 206, invoiceId: 109, paymentDate: '2025-05-12', amount: 300.00, paymentMethod: 'Bank Transfer' },
  { id: 207, invoiceId: 110, paymentDate: '2025-05-20', amount: 210.00, paymentMethod: 'PayPal' },
  { id: 208, invoiceId: 111, paymentDate: '2025-06-10', amount: 500.00, paymentMethod: 'PayPal' },
  { id: 209, invoiceId: 112, paymentDate: '2025-06-18', amount: 110.00, paymentMethod: 'Credit Card' },
  { id: 210, invoiceId: 115, paymentDate: '2025-06-25', amount: 200.00, paymentMethod: 'PayPal' },
];

// Función para calcular métricas por cliente
const getClientMetrics = (clients, invoices, payments) => {
  return clients.map(client => {
    const clientInvoices = invoices.filter(inv => inv.clientId === client.id);
    const totalAmountInvoiced = clientInvoices.reduce((sum, inv) => sum + inv.totalAmount, 0);

    const paidInvoices = clientInvoices.filter(inv => inv.paymentStatus === 'Paid');
    const pendingInvoices = clientInvoices.filter(inv => inv.paymentStatus === 'Pending');
    const overdueInvoices = clientInvoices.filter(inv => inv.paymentStatus === 'Overdue');

    const clientPayments = payments.filter(pay => clientInvoices.some(inv => inv.id === pay.invoiceId));
    const totalAmountPaid = clientPayments.reduce((sum, pay) => sum + pay.amount, 0);
    const paypalAmountPaid = clientPayments.filter(pay => pay.paymentMethod === 'PayPal').reduce((sum, pay) => sum + pay.amount, 0);

    return {
      ...client,
      totalAmountInvoiced,
      totalAmountPaid,
      paypalAmountPaid,
      invoicesCount: clientInvoices.length,
      paidInvoicesCount: paidInvoices.length,
      pendingInvoicesCount: pendingInvoices.length,
      overdueInvoicesCount: overdueInvoices.length,
      lastInvoiceDate: clientInvoices.sort((a, b) => new Date(b.issueDate) - new Date(a.issueDate))[0]?.issueDate || 'N/A',
      lastPaymentDate: clientPayments.sort((a, b) => new Date(b.paymentDate) - new Date(a.paymentDate))[0]?.paymentDate || 'N/A'
    };
  }).sort((a, b) => b.totalAmountInvoiced - a.totalAmountInvoiced); // Ordenar por monto facturado
};

// Función para obtener las facturas de un cliente específico
const getClientInvoices = (clientId, invoices) => {
    return invoices.filter(inv => inv.clientId === clientId).sort((a, b) => new Date(b.issueDate) - new Date(a.issueDate));
};


const ClientPurchaseGraphPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedClientId, setSelectedClientId] = useState('');

  const clientsMetrics = getClientMetrics(allClients, allInvoices, allPayments);
  const top5Clients = clientsMetrics.slice(0, 5);

  useEffect(() => {
    setIsVisible(true);
    if (clientsMetrics.length > 0) {
      setSelectedClientId(clientsMetrics[0].id.toString());
    }
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const selectedClient = clientsMetrics.find(c => c.id.toString() === selectedClientId);
  const currentClientInvoices = selectedClient ? getClientInvoices(selectedClient.id, allInvoices) : [];

  // --- Datos para Gráfica de Top Clientes (Bar Chart: Facturado vs Pagado) ---
  const topClientFactPaidData = {
    labels: top5Clients.map(c => c.name),
    datasets: [
      {
        label: 'Monto Facturado ($)',
        data: top5Clients.map(c => c.totalAmountInvoiced),
        backgroundColor: 'rgba(154, 207, 226, 0.8)', // Azul agua
        borderColor: '#9ACFE2',
        borderWidth: 1,
        borderRadius: 8,
      },
      {
        label: 'Monto Pagado ($)',
        data: top5Clients.map(c => c.totalAmountPaid),
        backgroundColor: 'rgba(44, 62, 80, 0.8)', // Azul oscuro metálico
        borderColor: '#2C3E50',
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  };

  // --- Datos para Gráfica de Métodos de Pago del Cliente Seleccionado (Doughnut Chart) ---
  const clientPaymentMethodData = () => {
    const methods = {};
    const clientPayments = allPayments.filter(pay => currentClientInvoices.some(inv => inv.id === pay.invoiceId));
    clientPayments.forEach(p => {
      methods[p.paymentMethod] = (methods[p.paymentMethod] || 0) + p.amount;
    });

    const labels = Object.keys(methods);
    const data = Object.values(methods);

    const backgroundColors = labels.map(label => {
        if (label === 'PayPal') return '#0070BA'; // Color oficial de PayPal
        if (label === 'Bank Transfer') return '#B7E0F2'; // Azul celeste claro
        if (label === 'Credit Card') return '#D5DEE3'; // Gris frío claro
        return '#4A6275'; // Otro color
    });

    return {
      labels,
      datasets: [{
        label: 'Monto por Método ($)',
        data,
        backgroundColor: backgroundColors,
        borderColor: '#FFFFFF',
        borderWidth: 2,
      }],
    };
  };

  // --- Datos para Historial de Facturación Mensual del Cliente Seleccionado (Line Chart) ---
  const clientMonthlyInvoiceHistoryData = () => {
    const monthlyTotals = {};
    currentClientInvoices.forEach(inv => {
      const month = new Date(inv.issueDate).toLocaleString('es-ES', { month: 'short', year: '2-digit' });
      monthlyTotals[month] = (monthlyTotals[month] || 0) + inv.totalAmount;
    });

    const sortedMonths = Object.keys(monthlyTotals).sort((a,b) => {
        const monthOrder = {'ene':0, 'feb':1, 'mar':2, 'abr':3, 'may':4, 'jun':5, 'jul':6, 'ago':7, 'sep':8, 'oct':9, 'nov':10, 'dic':11};
        const [monthA, yearA] = a.split(' ');
        const [monthB, yearB] = b.split(' ');
        if (yearA !== yearB) return parseInt(yearA.slice(-2)) - parseInt(yearB.slice(-2)); // Comparar solo el año
        return monthOrder[monthA.toLowerCase()] - monthOrder[monthB.toLowerCase()];
    });

    return {
      labels: sortedMonths,
      datasets: [
        {
          label: 'Monto Facturado Mensual ($)',
          data: sortedMonths.map(month => monthlyTotals[month]),
          borderColor: '#9ACFE2',
          backgroundColor: 'rgba(154, 207, 226, 0.2)',
          fill: true,
          tension: 0.4,
        },
      ],
    };
  };


  // --- Opciones Generales para Gráficas ---
  const chartOptionsBase = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#2C3E50',
          font: { size: 14, family: '"Open Sans"' },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(44, 62, 80, 0.9)',
        titleColor: '#FFFFFF',
        bodyColor: '#FFFFFF',
        borderColor: '#9ACFE2',
        borderWidth: 1,
        bodyFont: { family: '"Open Sans"' },
        titleFont: { family: '"Open Sans"', weight: 'bold' },
      },
    },
    scales: {
        x: {
          ticks: { color: '#2C3E50', font: { family: '"Open Sans"' } },
          grid: { color: 'rgba(213, 222, 227, 0.3)' },
        },
        y: {
          ticks: { color: '#2C3E50', font: { family: '"Open Sans"' } },
          grid: { color: 'rgba(213, 222, 227, 0.3)' },
        },
      },
  };

  return (
    <div className="min-h-screen bg-creacion-cliente flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Título de la página */}
      <div className={`
        max-w-7xl w-full space-y-8 p-10 
        bg-blanco-puro rounded-xl 
        floating-table-shadow /* Reutilizamos la sombra flotante */
        ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-10 scale-95'} 
        transition-all duration-700 ease-out 
      `}>
        {/* Sección de Controles/Filtros */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-3xl font-bold text-azul-oscuro-metalico">
            Análisis Detallado por Cliente
          </h2>
          <div className="flex items-center gap-2">
            <label htmlFor="client-select" className="text-gray-700 font-medium">Seleccionar Cliente:</label>
            <select
              id="client-select"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-azul-agua focus:border-azul-agua sm:text-sm rounded-md bg-gris-frio-claro"
              value={selectedClientId}
              onChange={(e) => setSelectedClientId(e.target.value)}
            >
              {clientsMetrics.map(client => (
                <option key={client.id} value={client.id}>
                  {client.name} (Fact: ${client.totalAmountInvoiced.toFixed(2)} | Pagado: ${client.totalAmountPaid.toFixed(2)})
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-azul-agua"></div>
            <p className="ml-4 text-azul-oscuro-metalico text-lg">Cargando datos...</p>
          </div>
        ) : (
          <>
            {/* Sección de Indicadores Clave de Rendimiento (KPIs) del Cliente Seleccionado */}
            {selectedClient && (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
                    <div className="bg-azul-celeste-claro bg-opacity-20 p-6 rounded-lg shadow-md flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300">
                        <div className="text-azul-oscuro-metalico mb-3 text-4xl">
                            <i className="fas fa-file-invoice-dollar"></i> {/* Icono de factura con dólar */}
                        </div>
                        <h3 className="text-lg font-semibold text-azul-oscuro-metalico mb-1">Total Facturado</h3>
                        <p className="text-4xl font-extrabold text-azul-agua">
                            ${selectedClient.totalAmountInvoiced.toFixed(2)}
                        </p>
                    </div>

                    <div className="bg-azul-agua bg-opacity-20 p-6 rounded-lg shadow-md flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300">
                        <div className="text-azul-oscuro-metalico mb-3 text-4xl">
                            <i className="fas fa-hand-holding-usd"></i> {/* Icono de mano recibiendo dinero */}
                        </div>
                        <h3 className="text-lg font-semibold text-azul-oscuro-metalico mb-1">Total Pagado</h3>
                        <p className="text-4xl font-extrabold text-azul-oscuro-metalico">
                            ${selectedClient.totalAmountPaid.toFixed(2)}
                        </p>
                    </div>

                    <div className="bg-gris-frio-claro bg-opacity-30 p-6 rounded-lg shadow-md flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300">
                        <div className="text-azul-oscuro-metalico mb-3 text-4xl">
                            <i className="fab fa-paypal"></i> {/* Icono de PayPal */}
                        </div>
                        <h3 className="text-lg font-semibold text-azul-oscuro-metalico mb-1">Pagado con PayPal</h3>
                        <p className="text-4xl font-extrabold text-azul-agua">
                            ${selectedClient.paypalAmountPaid.toFixed(2)}
                        </p>
                    </div>

                    <div className="bg-azul-celeste-claro bg-opacity-30 p-6 rounded-lg shadow-md flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300">
                        <div className="text-azul-oscuro-metalico mb-3 text-4xl">
                            <i className="fas fa-hourglass-half"></i> {/* Icono de reloj de arena */}
                        </div>
                        <h3 className="text-lg font-semibold text-azul-oscuro-metalico mb-1">Facturas Pendientes</h3>
                        <p className="text-4xl font-extrabold text-red-500">
                            {selectedClient.pendingInvoicesCount + selectedClient.overdueInvoicesCount}
                        </p>
                    </div>
                </div>
            )}

            {/* Gráficas: Top Clientes por Facturación/Pagos y Distribución de Métodos de Pago */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              {/* Gráfico de Barras: Monto Facturado vs. Pagado por Top 5 Clientes */}
              <div className="bg-blanco-puro p-6 rounded-lg shadow-md floating-table-shadow flex flex-col">
                <h3 className="text-xl font-bold text-azul-oscuro-metalico mb-4 text-center">Top 5 Clientes: Facturado vs. Pagado</h3>
                <div className="h-80 flex-grow">
                  <Bar data={topClientFactPaidData} options={{...chartOptionsBase, plugins: {...chartOptionsBase.plugins, title: {display: false}}}} />
                </div>
              </div>

              {/* Gráfico de Dona: Distribución de Métodos de Pago del Cliente Seleccionado */}
              <div className="bg-blanco-puro p-6 rounded-lg shadow-md floating-table-shadow flex flex-col">
                <h3 className="text-xl font-bold text-azul-oscuro-metalico mb-4 text-center">
                  Métodos de Pago Utilizados ({selectedClient ? selectedClient.name.split(' ')[0] : 'Selecciona un Cliente'})
                </h3>
                <div className="h-80 flex-grow flex justify-center items-center">
                  {clientPaymentMethodData().labels.length > 0 ? (
                    <Doughnut data={clientPaymentMethodData()} options={{
                        ...chartOptionsBase,
                        scales: {}, // Quitar escalas para Doughnut
                        plugins: {
                            ...chartOptionsBase.plugins,
                            title: { display: false },
                            legend: {
                                position: 'right', // Leyenda a la derecha
                                labels: {
                                    color: '#2C3E50',
                                    font: { size: 14, family: '"Open Sans"' },
                                },
                            },
                        }
                    }} />
                  ) : (
                    <p className="text-gray-600">Este cliente no tiene pagos registrados.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Gráfico de Línea: Historial de Facturación Mensual del Cliente Seleccionado */}
            <div className="mt-10 bg-blanco-puro p-6 rounded-xl shadow-md floating-table-shadow">
                <h3 className="text-2xl font-bold text-azul-oscuro-metalico mb-6 text-center">
                    Historial de Facturación Mensual de {selectedClient ? selectedClient.name : 'Cliente'}
                </h3>
                <div className="h-96 w-full flex justify-center items-center">
                    {clientMonthlyInvoiceHistoryData().labels.length > 0 ? (
                        <Line data={clientMonthlyInvoiceHistoryData()} options={{
                            ...chartOptionsBase,
                            plugins: {
                                ...chartOptionsBase.plugins,
                                title: { display: false }
                            }
                        }} />
                    ) : (
                        <p className="text-gray-600">No hay historial de facturas para este cliente.</p>
                    )}
                </div>
            </div>

            {/* Tabla de Facturas Recientes del Cliente Seleccionado */}
            <div className="mt-10 bg-blanco-puro rounded-xl p-6 overflow-x-auto floating-table-shadow">
                <h3 className="text-2xl font-bold text-azul-oscuro-metalico mb-6 text-center">
                    Facturas Recientes de {selectedClient ? selectedClient.name : 'Cliente'}
                </h3>
                {currentClientInvoices.length > 0 ? (
                    <table className="min-w-full divide-y divide-gris-frio-claro">
                        <thead className="bg-gris-frio-claro">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-azul-oscuro-metalico uppercase tracking-wider rounded-tl-lg">
                                    Nº Factura
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-azul-oscuro-metalico uppercase tracking-wider">
                                    Fecha Emisión
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-azul-oscuro-metalico uppercase tracking-wider">
                                    Fecha Vencimiento
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-azul-oscuro-metalico uppercase tracking-wider">
                                    Monto Total
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-azul-oscuro-metalico uppercase tracking-wider">
                                    Estado
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-azul-oscuro-metalico uppercase tracking-wider rounded-tr-lg">
                                    Método Pago
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gris-frio-claro">
                            {currentClientInvoices.map((invoice) => (
                                <tr key={invoice.id} className="hover:bg-gray-50 transition-colors duration-150 ease-in-out">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {invoice.invoiceNumber}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                        {invoice.issueDate}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                        {invoice.dueDate}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-azul-agua">
                                        $ {invoice.totalAmount.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                                            ${invoice.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' : ''}
                                            ${invoice.paymentStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                                            ${invoice.paymentStatus === 'Overdue' ? 'bg-red-100 text-red-800' : ''}
                                        `}>
                                            {invoice.paymentStatus}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                        {allPayments.find(p => p.invoiceId === invoice.id)?.paymentMethod || 'N/A'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center text-gray-600 py-8">Este cliente no tiene facturas registradas.</p>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ClientPurchaseGraphPage;