import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
// Importa los iconos necesarios para los botones
import { FaSave, FaTimesCircle } from 'react-icons/fa'; // Usaremos FaSave y FaTimesCircle

const RegistraVista = () => {
  const navigate = useNavigate();

  // Función para obtener la fecha y hora actual en la zona horaria de Quito
  const getCurrentQuitoDateTime = () => {
    const now = new Date();
    // Options for Quito's timezone (America/Guayaquil is used for Ecuador)
    const optionsDate = { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'America/Guayaquil' };
    const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'America/Guayaquil' };

    const quitoDate = new Intl.DateTimeFormat('en-CA', optionsDate).format(now); // 'en-CA' for YYYY-MM-DD
    const quitoTime = new Intl.DateTimeFormat('es-EC', optionsTime).format(now);

    return { date: quitoDate, time: quitoTime };
  };

  const { date: initialDate, time: initialTime } = getCurrentQuitoDateTime();

  const [formData, setFormData] = useState({
    nombre: '',
    tipoDocumento: 'DNI',
    numeroDocumento: '',
    tipoVisita: 'Diaria',
    fecha: initialDate,
    hora: initialTime,
    observaciones: ''
  });

  const tiposDocumento = ['DNI', 'Pasaporte', 'Carnet Extranjería'];
  const tiposVisita = ['Diaria', 'Membresía', 'Invitado', 'Evento Especial'];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.nombre || !formData.numeroDocumento || !formData.fecha || !formData.hora) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor complete todos los campos obligatorios.',
        icon: 'error'
      });
      return;
    }

    // Aquí iría la lógica para guardar la visita en tu base de datos o API
    // Por ahora, solo lo mostramos en consola
    console.log('Visita registrada:', formData);

    Swal.fire({
      title: '¡Éxito!',
      text: 'Visita registrada correctamente',
      icon: 'success'
    });

    // Resetear el formulario a sus valores iniciales (excepto fecha y hora que se actualizan a lo actual)
    setFormData({
      nombre: '',
      tipoDocumento: 'DNI',
      numeroDocumento: '',
      tipoVisita: 'Diaria',
      fecha: getCurrentQuitoDateTime().date, // Actualiza a la fecha actual de Quito
      hora: getCurrentQuitoDateTime().time,   // Actualiza a la hora actual de Quito
      observaciones: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center sm:text-4xl lg:text-5xl">
          Registrar Nueva Visita
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo*</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo documento*</label>
                  <select
                    name="tipoDocumento"
                    value={formData.tipoDocumento}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {tiposDocumento.map((tipo) => (
                      <option key={tipo} value={tipo}>{tipo}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Número documento*</label>
                  <input
                    type="text"
                    name="numeroDocumento"
                    value={formData.numeroDocumento}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de visita*</label>
                <select
                  name="tipoVisita"
                  value={formData.tipoVisita}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {tiposVisita.map((tipo) => (
                    <option key={tipo} value={tipo}>{tipo}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha*</label>
                  <input
                    type="date"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hora*</label>
                  <input
                    type="time"
                    name="hora"
                    value={formData.hora}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Observaciones</label>
              <textarea
                name="observaciones"
                value={formData.observaciones}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition flex items-center justify-center"
              >
                <FaTimesCircle className="inline-block mr-2" /> Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
              >
                <FaSave className="inline-block mr-2" /> Registrar Visita
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistraVista;