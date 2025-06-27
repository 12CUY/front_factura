import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ClientListPage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingClient, setEditingClient] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const itemsPerPage = 6;

  const [clients, setClients] = useState([
    { id: 1, firstName: 'Ana María', lastName: 'Gómez Pérez', email: 'ana.gomez@example.com', phone: '+593 99 123 4567', isEnabled: true, ruc: '1792123456001', identification: '1712345678' },
    { id: 2, firstName: 'Roberto Carlos', lastName: 'Díaz Castro', email: 'roberto.diaz@example.com', phone: '+593 98 765 4321', isEnabled: false, ruc: '0992345678001', identification: '0987654321' },
    { id: 3, firstName: 'Luisa Fernanda', lastName: 'Rojas Mora', email: 'luisa.rojas@example.com', phone: '+593 97 111 2233', isEnabled: true, ruc: '0193456789001', identification: '0123456789' },
    { id: 4, firstName: 'Javier Andrés', lastName: 'Flores Sánchez', email: 'javier.flores@example.com', phone: '+593 96 444 5566', isEnabled: true, ruc: '0994567890001', identification: '0998765432' },
    { id: 5, firstName: 'Sofía Isabel', lastName: 'Morales Vera', email: 'sofia.morales@example.com', phone: '+593 95 777 8899', isEnabled: false, ruc: '1795678901001', identification: '1776543210' },
    { id: 6, firstName: 'Diego Alejandro', lastName: 'Castro López', email: 'diego.castro@example.com', phone: '+593 94 000 1122', isEnabled: true, ruc: '1796789012001', identification: '1710987654' },
    { id: 7, firstName: 'Valeria Nicole', lastName: 'Pérez Torres', email: 'valeria.perez@example.com', phone: '+593 93 333 4455', isEnabled: true, ruc: '0997890123001', identification: '0921098765' },
    { id: 8, firstName: 'Pablo Andrés', lastName: 'Ramírez Quiroz', email: 'pablo.ramirez@example.com', phone: '+593 92 111 2233', isEnabled: false, ruc: '1198901234001', identification: '1132109876' },
    { id: 9, firstName: 'María José', lastName: 'Vargas Silva', email: 'maria.vargas@example.com', phone: '+593 91 555 6677', isEnabled: true, ruc: '1799012345001', identification: '1743210987' },
    { id: 10, firstName: 'Carlos David', lastName: 'Ruiz Ortiz', email: 'carlos.ruiz@example.com', phone: '+593 90 888 9900', isEnabled: true, ruc: '0990123456001', identification: '0954321098' },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredClients = clients.filter(client =>
    `${client.firstName} ${client.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.ruc.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.identification.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const currentClients = filteredClients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEditClick = (client) => {
    setEditingClient(client);
    setShowEditModal(true);
  };

  const handleSaveEdit = (updatedClient) => {
    setClients(clients.map(client => 
      client.id === updatedClient.id ? updatedClient : client
    ));
    setShowEditModal(false);
    Swal.fire(
      'Actualizado!',
      'El cliente ha sido actualizado correctamente.',
      'success'
    );
  };

  const toggleClientStatus = async (id) => {
    const client = clients.find(c => c.id === id);
    const newStatus = !client.isEnabled;
    
    const result = await Swal.fire({
      title: newStatus ? '¿Activar cliente?' : '¿Desactivar cliente?',
      text: newStatus ? 'El cliente será visible nuevamente' : 'El cliente no será visible pero se puede restaurar',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: newStatus ? 'Sí, activar' : 'Sí, desactivar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      setClients(clients.map(client => 
        client.id === id ? {...client, isEnabled: newStatus} : client
      ));
      Swal.fire(
        newStatus ? 'Activado!' : 'Desactivado!',
        `El cliente ha sido ${newStatus ? 'activado' : 'desactivado'}.`,
        'success'
      );
    }
  };

  return (
    <div 
      className="min-h-screen pt-16"
      style={{
        backgroundImage: "url('/login.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed"
      }}
    >
      <div className="absolute inset-0 bg-black/10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="mb-8 text-center lg:text-left">
          <h1 className="text-3xl font-bold text-gray-900">
            Lista de Clientes
          </h1>
          <p className="text-gray-600 mt-2">
            Gestión completa de los clientes registrados
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Buscar clientes..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {filteredClients.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentClients.map((client, index) => (
                    <div 
                      key={client.id}
                      className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-transparent hover:border-white/30 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}
                      style={{
                        transitionDelay: `${index * 100}ms`,
                        animation: isVisible ? 'fadeInUp 0.5s ease-out' : ''
                      }}
                    >
                      <div className="p-6 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">
                              {client.firstName} {client.lastName}
                            </h3>
                            <span className="text-sm text-gray-500">ID: {client.id}</span>
                          </div>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            client.isEnabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {client.isEnabled ? 'Activo' : 'Inactivo'}
                          </span>
                        </div>

                        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Lado izquierdo - Datos del cliente */}
                          <div className="space-y-2 text-sm text-gray-600">
                            <p><span className="font-medium">Cédula:</span> {client.identification}</p>
                            <p><span className="font-medium">RUC:</span> {client.ruc}</p>
                            <p><span className="font-medium">Email:</span> {client.email}</p>
                            <p><span className="font-medium">Teléfono:</span> {client.phone}</p>
                          </div>
                          
                          {/* Lado derecho - Acciones */}
                          <div className="flex flex-col justify-end space-y-2">
                            <button
                              onClick={() => handleEditClick(client)}
                              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200 text-sm"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => toggleClientStatus(client.id)}
                              className={`w-full py-2 px-4 rounded-lg transition duration-200 text-sm ${
                                client.isEnabled 
                                  ? 'bg-red-600 hover:bg-red-700 text-white'
                                  : 'bg-green-600 hover:bg-green-700 text-white'
                              }`}
                            >
                              {client.isEnabled ? 'Desactivar' : 'Activar'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="mt-8 flex justify-center">
                    <nav className="flex items-center space-x-2">
                      <button
                        onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 border rounded-lg ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white hover:bg-gray-50'}`}
                      >
                        Anterior
                      </button>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-4 py-2 border rounded-lg ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-50'}`}
                        >
                          {page}
                        </button>
                      ))}
                      
                      <button
                        onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 border rounded-lg ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white hover:bg-gray-50'}`}
                      >
                        Siguiente
                      </button>
                    </nav>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12 bg-white/80 rounded-2xl shadow">
                <p className="text-gray-600">No se encontraron clientes</p>
                <button 
                  onClick={() => setSearchTerm('')}
                  className="mt-4 text-blue-600 hover:text-blue-800"
                >
                  Limpiar búsqueda
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal de Edición */}
      {showEditModal && editingClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Editar Cliente</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={editingClient.firstName}
                    onChange={(e) => setEditingClient({...editingClient, firstName: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={editingClient.lastName}
                    onChange={(e) => setEditingClient({...editingClient, lastName: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={editingClient.email}
                    onChange={(e) => setEditingClient({...editingClient, email: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={editingClient.phone}
                    onChange={(e) => setEditingClient({...editingClient, phone: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleSaveEdit(editingClient)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientListPage;