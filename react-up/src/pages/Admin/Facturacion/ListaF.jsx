import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import animationData from "../../../animation/fat.json";

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faFilePdf, faFileCode } from '@fortawesome/free-solid-svg-icons';

// jsPDF y html2canvas
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ListaFacturas = () => {
  const [facturas, setFacturas] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [modalAccionesAbierto, setModalAccionesAbierto] = useState(false);
  const [modalVistaPreviaAbierto, setModalVistaPreviaAbierto] = useState(false);
  const [facturaSeleccionada, setFacturaSeleccionada] = useState(null);

  useEffect(() => {
    const data = [
      { id: "FAC-001", cliente: "Juan", ruc: "20100123456", fecha: "2025-06-20", total: 8.20, estado: "Pagada" },
      { id: "FAC-002", cliente: "Maria", ruc: "20100654321", fecha: "2025-06-21", total: 2.54, estado: "Pendiente" },
      { id: "FAC-003", cliente: "Xavi", ruc: "20100789012", fecha: "2025-06-22", total: 4.75, estado: "Anulada" },
      { id: "FAC-004", cliente: "Ana", ruc: "20100321654", fecha: "2025-06-23", total: 5.06, estado: "Pagada" },
    ];
    setFacturas(data);
  }, []);

  const getStyles = (estado) => {
    switch (estado) {
      case "Pagada":
        return { badge: "bg-green-500 text-white" };
      case "Pendiente":
        return { badge: "bg-yellow-400 text-gray-900" };
      case "Anulada":
        return { badge: "bg-red-500 text-white" };
      default:
        return { badge: "bg-gray-400 text-white" };
    }
  };

  const facturasFiltradas = facturas.filter(
    (f) =>
      f.id.toLowerCase().includes(filtro.toLowerCase()) ||
      f.ruc.toLowerCase().includes(filtro.toLowerCase())
  );

  const abrirModalAcciones = (factura) => {
    setFacturaSeleccionada(factura);
    setModalAccionesAbierto(true);
  };

  const cerrarModalAcciones = () => {
    setModalAccionesAbierto(false);
    setFacturaSeleccionada(null);
  };

  const abrirModalVistaPrevia = () => {
    setModalVistaPreviaAbierto(true);
    setModalAccionesAbierto(false);
  };

  const cerrarModalVistaPrevia = () => {
    setModalVistaPreviaAbierto(false);
  };

  const generarXML = (factura) => {
    const xmlContent = `
<Factura>
  <ID>${factura.id}</ID>
  <Cliente>${factura.cliente}</Cliente>
  <RUC>${factura.ruc}</RUC>
  <Fecha>${factura.fecha}</Fecha>
  <Total>${factura.total.toFixed(2)}</Total>
  <Estado>${factura.estado}</Estado>
</Factura>
`.trim();
    const blob = new Blob([xmlContent], { type: "application/xml" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Factura_${factura.id}.xml`;
    link.click();
  };

  const generarPDF = (factura) => {
    const facturaHTML = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: start; border-bottom: 2px solid #ccc; padding-bottom: 15px;">
          <div>
            <img src="https://pbs.twimg.com/profile_images/1130794605094612992/jLqf3nbh_400x400.jpg " alt="Logo" style="width: 100px; height: auto;" />
            <h2 style="font-size: 18px; font-weight: bold; color: #1E3A8A;">GRUPO HIDROLÓGICO GR3.4</h2>
            <p style="margin: 4px 0;">AV. HIDROLÓGICA S/N</p>
            <p style="margin: 4px 0;">RUC: 1760013210001</p>
            <div style="border-top: 1px solid #ccc; padding-top: 10px; margin-top: 10px;">
              <h3 style="font-size: 14px; font-weight: bold; color: #333;">AUTORIZACIÓN SRI</h3>
              <p><strong>CLAVE:</strong> 15062020531760013210001</p>
              <p><strong>N° AUTORIZACIÓN:</strong> 26620201903176001321000100105000000134</p>
              <p><strong>FECHA:</strong> 15/06/2025</p>
            </div>
          </div>
          <div style="text-align: right;">
            <h3 style="font-size: 16px; font-weight: bold; color: #333;">FACTURA ELECTRÓNICA GENERADA</h3>
            <p>Fecha de emisión: ${new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <div style="margin-top: 20px;">
          <h3 style="font-size: 14px; font-weight: bold; color: #333;">CLIENTE</h3>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; margin-top: 8px;">
            <p><strong>RUC:</strong> V-${factura.ruc}</p>
            <p><strong>Nombre:</strong> ${factura.cliente}</p>
            <p><strong>Dirección:</strong> No registrada</p>
            <p><strong>Correo:</strong> No registrado</p>
          </div>
        </div>

        <div style="margin-top: 20px;">
          <h3 style="font-size: 14px; font-weight: bold; color: #333;">DETALLE DEL CONSUMO</h3>
          <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <thead style="background-color: #f5f5f5;">
              <tr style="color: #555; text-transform: uppercase; font-size: 12px;">
                <th style="padding: 10px; border: 1px solid #ccc; text-align: left;">COD.</th>
                <th style="padding: 10px; border: 1px solid #ccc; text-align: left;">SERVICIO</th>
                <th style="padding: 10px; border: 1px solid #ccc; text-align: center;">CANT.</th>
                <th style="padding: 10px; border: 1px solid #ccc; text-align: right;">P. UNIT.</th>
                <th style="padding: 10px; border: 1px solid #ccc; text-align: right;">SUBTOTAL</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-top: 1px solid #eee;">
                <td style="padding: 10px; border: 1px solid #ccc;">${factura.id || "-"}</td>
                <td style="padding: 10px; border: 1px solid #ccc;">Agua</td>
                <td style="padding: 10px; border: 1px solid #ccc; text-align: center;">${factura.cantidad || 1}</td>
                <td style="padding: 10px; border: 1px solid #ccc; text-align: right;">$${Number(factura.total / (factura.cantidad || 1)).toFixed(2)}</td>
                <td style="padding: 10px; border: 1px solid #ccc; text-align: right;">$${Number(factura.total).toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style="margin-top: 20px;">
          <ul style="list-style-type: disc; padding-left: 20px;">
            <li>Lectura anterior (01/Jun/2025): 1200 m³</li>
            <li>Lectura actual (30/Jun/2025): 1225 m³</li>
            <li>Consumo: ${factura.cantidad || 1} m³</li>
          </ul>
        </div>

        <div style="margin-top: 20px;">
          <h3 style="font-size: 14px; font-weight: bold; color: #333;">DETALLE DE IMPUESTOS</h3>
          <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <thead style="background-color: #f5f5f5;">
              <tr style="color: #555; text-transform: uppercase; font-size: 12px;">
                <th style="padding: 10px; border: 1px solid #ccc; text-align: left;">IMPUESTO</th>
                <th style="padding: 10px; border: 1px solid #ccc; text-align: left;">TARIFA</th>
                <th style="padding: 10px; border: 1px solid #ccc; text-align: right;">BASE IMPONIBLE</th>
                <th style="padding: 10px; border: 1px solid #ccc; text-align: right;">VALOR</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-top: 1px solid #eee;">
                <td style="padding: 10px; border: 1px solid #ccc;">IVA</td>
                <td style="padding: 10px; border: 1px solid #ccc;">15%</td>
                <td style="padding: 10px; border: 1px solid #ccc; text-align: right;">$${Number(factura.total - factura.total * 0.15).toFixed(2)}</td>
                <td style="padding: 10px; border: 1px solid #ccc; text-align: right;">$${Number(factura.total * 0.15).toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style="margin-top: 20px; background-color: #f9f9f9; padding: 15px; border-radius: 8px;">
          <h3 style="font-size: 14px; font-weight: bold; color: #333;">RESUMEN DE VALORES</h3>
          <div style="margin-top: 10px; display: flex; justify-content: space-between; font-size: 14px;">
            <span>SUBTOTAL</span>
            <span>$${Number(factura.total - factura.total * 0.15).toFixed(2)}</span>
          </div>
          <div style="margin-top: 8px; display: flex; justify-content: space-between; font-size: 14px;">
            <span>IVA (15%)</span>
            <span>$${Number(factura.total * 0.15).toFixed(2)}</span>
          </div>
          <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #ccc; font-size: 16px; font-weight: bold; color: #1E3A8A; display: flex; justify-content: space-between;">
            <span>TOTAL A PAGAR</span>
            <span>$${Number(factura.total).toFixed(2)}</span>
          </div>
        </div>
      </div>
    `;

    // Crear contenedor temporal
    const container = document.createElement("div");
    container.innerHTML = facturaHTML;
    container.style.position = "absolute";
    container.style.left = "-9999px";
    container.style.top = "0";
    container.style.width = "800px";
    document.body.appendChild(container);

    // Generar imagen desde HTML
    html2canvas(container, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = (canvas.height * pageWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);
      pdf.save(`Factura_${factura.id}.pdf`);

      // Limpiar DOM
      document.body.removeChild(container);
    });
  };

  return (
    <div
      className="min-h-screen pt-20 relative"
      style={{
        backgroundImage: "url('/login.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10 z-0"></div>
      {/* Contenido principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Título */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-black drop-shadow mb-10">
          📄 Facturas Emitidas
        </h1>
        {/* Buscador */}
        <div className="max-w-2xl mx-auto mb-12 px-2">
          <input
            type="text"
            placeholder="🔍 Buscar por código o RUC..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="w-full px-5 py-3 text-base sm:text-lg rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 border border-gray-200"
          />
        </div>
        {/* Grid de tarjetas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {facturasFiltradas.map((factura) => {
            const styles = getStyles(factura.estado);
            return (
              <div
                key={factura.id}
                className="bg-white/80 backdrop-blur-lg rounded-3xl p-5 sm:p-6 shadow-xl hover:shadow-2xl transition duration-300 border border-gray-200 hover:-translate-y-1 relative"
              >
                {/* Animación */}
                <div className="absolute top-3 right-4 w-12 h-12 opacity-70">
                  <Lottie animationData={animationData} loop autoplay />
                </div>
                {/* ID */}
                <h2 className="text-lg sm:text-xl font-extrabold text-blue-800 mb-2 text-center">
                  {factura.id}
                </h2>
                {/* Info */}
                <div className="space-y-2 text-gray-800 text-sm mt-4 text-center">
                  <p><strong>Cliente:</strong> {factura.cliente}</p>
                  <p><strong>RUC:</strong> {factura.ruc}</p>
                  <p><strong>Fecha:</strong> {factura.fecha}</p>
                  <p className="text-base sm:text-lg font-semibold text-gray-900 mt-2">
                    $ {factura.total.toFixed(2)}
                  </p>
                </div>
                {/* Estado y botón Acciones */}
                <div className="mt-6 flex justify-center items-center gap-4">
                  <span className={`inline-block px-4 py-1 rounded-full text-xs font-semibold ${styles.badge}`}>
                    {factura.estado}
                  </span>
                  <button
                    onClick={() => abrirModalAcciones(factura)}
                    className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition"
                    title="Acciones"
                  >
                    ⚙️ Acciones
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        {/* Sin resultados */}
        {facturasFiltradas.length === 0 && (
          <p className="text-center text-white mt-10 text-lg bg-black/30 px-4 py-2 rounded-xl inline-block">
            No se encontraron facturas.
          </p>
        )}
        {/* Modal de Acciones */}
        {modalAccionesAbierto && facturaSeleccionada && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-lg relative">
              <button
                onClick={cerrarModalAcciones}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
                title="Cerrar"
              >
                &times;
              </button>
              <h3 className="text-xl font-semibold mb-4 text-center text-blue-800">
                Acciones para {facturaSeleccionada.id}
              </h3>
              <div className="flex justify-around text-blue-700 text-4xl mt-4">
                <button
                  title="Visualizar"
                  className="hover:text-blue-900"
                  onClick={abrirModalVistaPrevia}
                >
                  <FontAwesomeIcon icon={faEye} />
                </button>
                <button
                  title="Descargar PDF"
                  className="hover:text-red-600"
                  onClick={() => generarPDF(facturaSeleccionada)}
                >
                  <FontAwesomeIcon icon={faFilePdf} />
                </button>
                <button
                  title="Descargar XML"
                  className="hover:text-gray-700"
                  onClick={() => generarXML(facturaSeleccionada)}
                >
                  <FontAwesomeIcon icon={faFileCode} />
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Modal de Vista Previa de Factura */}
        {modalVistaPreviaAbierto && facturaSeleccionada && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 overflow-y-auto">
            <div className="bg-white rounded-xl p-6 max-w-3xl w-full shadow-lg relative m-4">
              <button
                onClick={cerrarModalVistaPrevia}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
                title="Cerrar"
              >
                &times;
              </button>
              <h3 className="text-2xl font-bold mb-4 text-center text-blue-800">📄 Factura {facturaSeleccionada.id}</h3>
              <div className="border-t border-b py-4 my-4 space-y-2">
                <p><strong>Cliente:</strong> {facturaSeleccionada.cliente}</p>
                <p><strong>RUC:</strong> {facturaSeleccionada.ruc}</p>
                <p><strong>Fecha:</strong> {facturaSeleccionada.fecha}</p>
                <p><strong>Total:</strong> $ {facturaSeleccionada.total.toFixed(2)}</p>
                <p><strong>Estado:</strong> {facturaSeleccionada.estado}</p>
              </div>
              <div className="text-center">
                <button
                  onClick={cerrarModalVistaPrevia}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListaFacturas;