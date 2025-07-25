import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaFileDownload, FaArrowLeft } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Reportes = () => {
  const navigate = useNavigate();
  const reportContentRef = useRef(null); // Ref for the content to be converted to PDF

  const [reporteConfig, setReporteConfig] = useState({
    tipoReporte: 'asistenciaDiaria',
    fechaDesde: '', // Keep blank for user to select range
    fechaHasta: '', // Keep blank for user to select range
    formato: 'pdf'
  });

  // Sample data for charts
  const datosAsistencia = [
    { name: 'Lun', visitas: 35 },
    { name: 'Mar', visitas: 42 },
    { name: 'Mié', visitas: 28 },
    { name: 'Jue', visitas: 39 },
    { name: 'Vie', visitas: 48 },
    { name: 'Sáb', visitas: 25 },
    { name: 'Dom', visitas: 18 }
  ];

  const datosTipoVisita = [
    { name: 'Diaria', value: 45 },
    { name: 'Membresía', value: 78 },
    { name: 'Invitado', value: 23 },
    { name: 'Evento', value: 12 }
  ];

  const handleConfigChange = (e) => {
    const { name, value } = e.target;
    setReporteConfig(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generarReporte = async () => {
    // Basic date validation
    if (reporteConfig.fechaDesde && reporteConfig.fechaHasta) {
      if (new Date(reporteConfig.fechaDesde) > new Date(reporteConfig.fechaHasta)) {
        Swal.fire('Error', 'La fecha "Desde" no puede ser posterior a la fecha "Hasta".', 'error');
        return;
      }
    }

    if (reporteConfig.formato === 'pdf') {
      if (reportContentRef.current) {
        Swal.fire({
          title: 'Generando PDF...',
          text: 'Por favor espera un momento.',
          didOpen: () => {
            Swal.showLoading();
          },
          allowOutsideClick: false,
          allowEscapeKey: false
        });

        try {
          const doc = new jsPDF('p', 'mm', 'a4');
          const margin = 10; // Margin in mm
          let yOffset = margin; // Vertical offset for content

          // --- 1. Add PDF Metadata ---
          doc.setProperties({
            title: `Reporte de Asistencia - ${reporteConfig.tipoReporte}`,
            subject: 'Reporte generado por el sistema de control de visitas',
            author: 'Sistema de Control de Visitas',
            creator: 'Sistema de Control de Visitas',
            keywords: `reporte, asistencia, visitas, ${reporteConfig.tipoReporte}`
          });

          // --- 2. Add a Title to the PDF Document ---
          doc.setFontSize(22);
          doc.setTextColor(40, 40, 40); // Dark text color
          const formattedReportType = reporteConfig.tipoReporte
            .replace(/([A-Z])/g, ' $1') // Add space before capital letters
            .toLowerCase()
            .replace('asistencia', 'Asistencia')
            .replace('tipo', 'Tipo')
            .replace('horario', 'Horario')
            .replace('pico', 'Pico')
            .trim(); // Trim any leading space

          doc.text(`Reporte de ${formattedReportType}`, doc.internal.pageSize.width / 2, yOffset + 10, { align: 'center' });
          yOffset += 25; // Space after title

          // --- 3. Add Report Dates (if selected) ---
          if (reporteConfig.fechaDesde || reporteConfig.fechaHasta) {
            doc.setFontSize(12);
            doc.setTextColor(80, 80, 80); // Slightly lighter
            const now = new Date();
            const generationDate = now.toLocaleDateString('es-EC', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'America/Guayaquil' });
            
            let dateRangeText = `Fecha de generación: ${generationDate}`;
            if (reporteConfig.fechaDesde && reporteConfig.fechaHasta) {
              dateRangeText = `Periodo: Del ${reporteConfig.fechaDesde} al ${reporteConfig.fechaHasta}`;
            } else if (reporteConfig.fechaDesde) {
              dateRangeText = `Periodo: Desde el ${reporteConfig.fechaDesde}`;
            } else if (reporteConfig.fechaHasta) {
              dateRangeText = `Periodo: Hasta el ${reporteConfig.fechaHasta}`;
            }
            doc.text(dateRangeText, doc.internal.pageSize.width / 2, yOffset, { align: 'center' });
            yOffset += 10;
          }

          // --- 4. Capture and add HTML content (charts/messages) ---
          const canvas = await html2canvas(reportContentRef.current, { scale: 2 }); // Scale for better resolution
          const imgData = canvas.toDataURL('image/png');
          const imgWidth = doc.internal.pageSize.width - (2 * margin); // Image width considering margins
          const imgHeight = canvas.height * imgWidth / canvas.width;
          let currentY = yOffset + margin; // Initial Y position for the image after text

          // Add image and handle multiple pages
          let heightLeft = imgHeight;
          
          if (currentY + imgHeight > doc.internal.pageSize.height - margin) {
              // If the first image is too large for the remaining space on the initial page
              // or if we just want it on a new page after the header.
              doc.addPage();
              currentY = margin; // Reset Y on the new page
          }
          doc.addImage(imgData, 'PNG', margin, currentY, imgWidth, imgHeight);
          heightLeft -= (doc.internal.pageSize.height - currentY - margin);
          currentY = doc.internal.pageSize.height - margin; // Set currentY to the bottom of the page for subsequent pages


          while (heightLeft > 0) {
            doc.addPage();
            doc.addImage(imgData, 'PNG', margin, margin - heightLeft, imgWidth, imgHeight);
            heightLeft -= (doc.internal.pageSize.height - 2 * margin); // Reduce height by page height minus top/bottom margin
          }
          
          // Optional: Add page numbers at the bottom of each page
          const totalPages = doc.internal.getNumberOfPages();
          for (let i = 1; i <= totalPages; i++) {
              doc.setPage(i);
              doc.setFontSize(10);
              doc.setTextColor(150, 150, 150);
              doc.text(`Página ${i} de ${totalPages}`, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - margin + 5, { align: 'center' });
          }

          const fileName = `Reporte_${reporteConfig.tipoReporte}_${reporteConfig.fechaDesde || 'sin_fecha_inicio'}_${reporteConfig.fechaHasta || 'sin_fecha_fin'}.pdf`;
          doc.save(fileName);

          Swal.fire({
            title: '¡Reporte PDF Generado!',
            text: `El reporte se ha descargado como "${fileName}".`,
            icon: 'success'
          });

        } catch (error) {
          console.error("Error al generar el PDF:", error);
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al generar el PDF. Intenta de nuevo. Revisa la consola para más detalles.',
            icon: 'error'
          });
        }
      } else {
        Swal.fire({
          title: 'Error',
          text: 'No se encontró contenido para generar el PDF. Asegúrate de que los gráficos o el mensaje estén visibles.',
          icon: 'error'
        });
      }
    } else {
      // Logic for other formats (Excel, CSV) or just the success notification
      Swal.fire({
        title: 'Reporte Generado',
        text: `El reporte de "${reporteConfig.tipoReporte}" se ha generado en formato "${reporteConfig.formato}". (Simulado)`,
        icon: 'success'
      });
      // This is where the actual Excel/CSV generation logic would go, possibly via an API.
    }
  };

  return (
    <div
      className="min-h-screen pt-16 bg-gray-50"
      style={{
        backgroundImage: "url('/gimnasio_actividades.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center sm:text-4xl lg:text-5xl">
          Reportes de Asistencia
        </h1>

        ---

        {/* Report Configuration */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Configurar Reporte</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="tipoReporte" className="block text-sm font-medium text-gray-700 mb-1">Tipo de reporte</label>
              <select
                id="tipoReporte"
                name="tipoReporte"
                value={reporteConfig.tipoReporte}
                onChange={handleConfigChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="asistenciaDiaria">Asistencia diaria</option>
                <option value="asistenciaMensual">Asistencia mensual</option>
                <option value="tipoVisita">Tipo de visita</option>
                <option value="horarioPico">Horarios pico</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="fechaDesde" className="block text-sm font-medium text-gray-700 mb-1">Desde</label>
                <input
                  type="date"
                  id="fechaDesde"
                  name="fechaDesde"
                  value={reporteConfig.fechaDesde}
                  onChange={handleConfigChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="fechaHasta" className="block text-sm font-medium text-gray-700 mb-1">Hasta</label>
                <input
                  type="date"
                  id="fechaHasta"
                  name="fechaHasta"
                  value={reporteConfig.fechaHasta}
                  onChange={handleConfigChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="formato" className="block text-sm font-medium text-gray-700 mb-1">Formato</label>
              <select
                id="formato"
                name="formato"
                value={reporteConfig.formato}
                onChange={handleConfigChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="pdf">PDF</option>
                <option value="excel">Excel</option>
                <option value="csv">CSV</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={generarReporte}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
            >
              <FaFileDownload className="inline-block mr-2" /> Generar Reporte
            </button>
          </div>
        </div>

        ---

        {/* Data Visualization - This is the content that will be converted to PDF */}
        <div ref={reportContentRef} className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Visualización de Datos</h2>

          {/* Render daily attendance chart only if the report type is 'asistenciaDiaria' */}
          {reporteConfig.tipoReporte === 'asistenciaDiaria' && (
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={datosAsistencia} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="visitas" fill="#3b82f6" name="Visitas Diarias" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Render visit type chart only if the report type is 'tipoVisita' */}
          {reporteConfig.tipoReporte === 'tipoVisita' && (
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={datosTipoVisita} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#10b981" name="Cantidad de Visitas" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Message for other report types without visualization, also included in the PDF */}
          {(reporteConfig.tipoReporte === 'asistenciaMensual' || reporteConfig.tipoReporte === 'horarioPico') && (
            <p className="text-gray-600 text-center py-10">
              Actualmente no hay una visualización de gráfico disponible para el tipo de reporte "{formattedReportType}".
              Puedes generar el reporte en el formato deseado.
            </p>
          )}

        </div>

        ---

        {/* Back button */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center mx-auto"
          >
            <FaArrowLeft className="inline-block mr-2" /> Volver al Panel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reportes;