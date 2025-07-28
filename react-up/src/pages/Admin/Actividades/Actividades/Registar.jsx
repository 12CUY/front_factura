// src/components/RegistrarLog.jsx
import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrarLog = () => {
  const navigate = useNavigate();

  // Estado para los campos del log, tal como los espera tu controlador
  const [logData, setLogData] = useState({
    usuarioId: '',
    accion: '',
    tablaAfectada: '',
    stateLog: '',
    ciudad: '',
    pais: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogData({
      ...logData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envía los datos al endpoint de tu controlador de logs
      // Asegúrate de que esta URL sea la correcta para tu API
      const response = await fetch('http://localhost:5000/api/actividades', { // Ajusta esta URL si es necesario
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Si usas tokens de autorización, inclúyelos aquí:
          // 'Authorization': `Bearer ${tuTokenDeAuth}`
        },
        body: JSON.stringify(logData)
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || 'Log de actividad registrado exitosamente!');
        console.log('Log registrado:', data);
        navigate('/dashboard/logs'); // Puedes cambiar esta ruta a donde quieras redirigir
      } else {
        alert(data.message || 'Error al registrar el log de actividad.');
        console.error('Error del servidor:', data.error);
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
      alert('Error de conexión con el servidor. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-100 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">Registrar Nuevo Log de Actividad</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="usuarioId" className="block text-sm font-medium text-gray-700 mb-1">
              ID de Usuario *
            </label>
            <input
              type="text"
              name="usuarioId"
              id="usuarioId"
              value={logData.usuarioId}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ej: 12345"
            />
          </div>

          <div>
            <label htmlFor="accion" className="block text-sm font-medium text-gray-700 mb-1">
              Acción *
            </label>
            <input
              type="text"
              name="accion"
              id="accion"
              value={logData.accion}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ej: Creación de Producto, Edición de Perfil"
            />
          </div>

          <div>
            <label htmlFor="tablaAfectada" className="block text-sm font-medium text-gray-700 mb-1">
              Tabla Afectada *
            </label>
            <input
              type="text"
              name="tablaAfectada"
              id="tablaAfectada"
              value={logData.tablaAfectada}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ej: Productos, Usuarios, Membresias"
            />
          </div>

          <div>
            <label htmlFor="stateLog" className="block text-sm font-medium text-gray-700 mb-1">
              Estado del Log *
            </label>
            <select
              name="stateLog"
              id="stateLog"
              value={logData.stateLog}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Seleccione un estado</option>
              <option value="SUCCESS">SUCCESS</option>
              <option value="FAILED">FAILED</option>
              <option value="PENDING">PENDING</option>
            </select>
          </div>

          <div>
            <label htmlFor="ciudad" className="block text-sm font-medium text-gray-700 mb-1">
              Ciudad (Opcional)
            </label>
            <input
              type="text"
              name="ciudad"
              id="ciudad"
              value={logData.ciudad}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ej: Quito"
            />
          </div>

          <div>
            <label htmlFor="pais" className="block text-sm font-medium text-gray-700 mb-1">
              País (Opcional)
            </label>
            <input
              type="text"
              name="pais"
              id="pais"
              value={logData.pais}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ej: Ecuador"
            />
          </div>

          <div className="mt-8 space-y-3">
            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Registrar Log
            </button>
            <button
              type="button"
              onClick={() => navigate('/')} 
              className="w-full px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrarLog;