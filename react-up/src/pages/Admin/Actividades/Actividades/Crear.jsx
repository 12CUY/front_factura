import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUpload, FiX, FiPlus, FiMinus } from "react-icons/fi";

const CrearActividad = () => {
  const navigate = useNavigate();
  const [actividad, setActividad] = useState({
    nombre: "",
    descripcion: "",
    categoria: "",
    duracion: "",
    capacidad: "",
    dificultad: "media",
    instructor: {
      nombre: "",
      cedula: "",
      especialidad: ""
    },
    horarios: [],
    imagen: null,
    imagenPrevia: ""
  });

  const [nuevoHorario, setNuevoHorario] = useState({
    dia: "Lunes",
    hora: "08:00",
    periodo: "AM"
  });

  const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  const horas = Array.from({length: 12}, (_, i) => (i + 1).toString().padStart(2, '0'));
  const periodos = ["AM", "PM"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes("instructor.")) {
      const field = name.split(".")[1];
      setActividad({
        ...actividad,
        instructor: {
          ...actividad.instructor,
          [field]: value
        }
      });
    } else {
      setActividad({ ...actividad, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setActividad({
        ...actividad,
        imagen: file,
        imagenPrevia: URL.createObjectURL(file)
      });
    }
  };

  const agregarHorario = () => {
    const horarioCompleto = `${nuevoHorario.dia} ${nuevoHorario.hora}:00 ${nuevoHorario.periodo}`;
    setActividad({
      ...actividad,
      horarios: [...actividad.horarios, horarioCompleto]
    });
    setNuevoHorario({
      dia: "Lunes",
      hora: "08:00",
      periodo: "AM"
    });
  };

  const eliminarHorario = (index) => {
    const nuevosHorarios = [...actividad.horarios];
    nuevosHorarios.splice(index, 1);
    setActividad({ ...actividad, horarios: nuevosHorarios });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Actividad creada:", actividad);
    alert("Actividad creada exitosamente!");
    navigate("/dashboardA/lista");
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
      <div className="absolute inset-0 bg-black/10"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Encabezado */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center">Crear Nueva Actividad</h1>
          <div className="w-8"></div> {/* Espacio para balancear */}
        </div>

        {/* Formulario con 3 columnas */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden backdrop-blur-sm bg-white/80">
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Columna 1: Información básica */}
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Información Básica</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre de la Actividad *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={actividad.nombre}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Categoría *
                  </label>
                  <select
                    name="categoria"
                    value={actividad.categoria}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Seleccione una categoría</option>
                    <option value="fitness">Fitness</option>
                    <option value="yoga">Yoga</option>
                    <option value="crossfit">Crossfit</option>
                    <option value="natacion">Natación</option>
                    <option value="artes-marciales">Artes Marciales</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción *
                  </label>
                  <textarea
                    name="descripcion"
                    value={actividad.descripcion}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Imagen de la Actividad
                  </label>
                  <div className="mt-1 flex flex-col items-center">
                    {actividad.imagenPrevia ? (
                      <div className="relative group w-full">
                        <img
                          src={actividad.imagenPrevia}
                          alt="Vista previa"
                          className="w-full h-48 object-cover rounded-lg shadow-md"
                        />
                        <button
                          type="button"
                          onClick={() => setActividad({...actividad, imagen: null, imagenPrevia: ""})}
                          className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                        >
                          <FiX />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <FiUpload className="w-10 h-10 text-gray-400 mb-3" />
                            <p className="text-sm text-gray-500 text-center">
                              <span className="font-semibold">Click para subir</span><br />
                              o arrastra una imagen aquí
                            </p>
                            <p className="text-xs text-gray-500 mt-1">PNG, JPG (Max. 5MB)</p>
                          </div>
                          <input 
                            type="file" 
                            className="hidden" 
                            onChange={handleFileChange}
                            accept="image/*"
                          />
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Columna 2: Configuración */}
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Configuración</h2>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="font-medium text-gray-800 mb-3">Datos del Instructor *</h3>
                  
                  <div className="mb-3">
                    <label className="block text-sm text-gray-700 mb-1">Nombre completo</label>
                    <input
                      type="text"
                      name="instructor.nombre"
                      value={actividad.instructor.nombre}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="block text-sm text-gray-700 mb-1">Número de cédula</label>
                    <input
                      type="text"
                      name="instructor.cedula"
                      value={actividad.instructor.cedula}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Especialidad</label>
                    <input
                      type="text"
                      name="instructor.especialidad"
                      value={actividad.instructor.especialidad}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duración (minutos) *
                  </label>
                  <input
                    type="number"
                    name="duracion"
                    value={actividad.duracion}
                    onChange={handleChange}
                    required
                    min="1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Capacidad máxima *
                  </label>
                  <input
                    type="number"
                    name="capacidad"
                    value={actividad.capacidad}
                    onChange={handleChange}
                    required
                    min="1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nivel de Dificultad *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {["baja", "media", "alta"].map((nivel) => (
                      <label 
                        key={nivel}
                        className={`flex items-center justify-center p-2 rounded-lg border cursor-pointer transition ${
                          actividad.dificultad === nivel 
                            ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                            : "border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="dificultad"
                          checked={actividad.dificultad === nivel}
                          onChange={() => setActividad({ ...actividad, dificultad: nivel })}
                          className="hidden"
                          required
                        />
                        <span className="capitalize">{nivel}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Columna 3: Horarios y Acciones */}
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Horarios</h2>
                
                <div className="space-y-3">
                  <div className="flex gap-2 flex-wrap">
                    <select
                      value={nuevoHorario.dia}
                      onChange={(e) => setNuevoHorario({...nuevoHorario, dia: e.target.value})}
                      className="flex-1 min-w-[120px] px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    >
                      {diasSemana.map(dia => (
                        <option key={dia} value={dia}>{dia}</option>
                      ))}
                    </select>

                    <select
                      value={nuevoHorario.hora}
                      onChange={(e) => setNuevoHorario({...nuevoHorario, hora: e.target.value})}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    >
                      {horas.map(hora => (
                        <option key={hora} value={hora}>{hora}:00</option>
                      ))}
                    </select>

                    <select
                      value={nuevoHorario.periodo}
                      onChange={(e) => setNuevoHorario({...nuevoHorario, periodo: e.target.value})}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    >
                      {periodos.map(periodo => (
                        <option key={periodo} value={periodo}>{periodo}</option>
                      ))}
                    </select>

                    <button
                      type="button"
                      onClick={agregarHorario}
                      disabled={!nuevoHorario.dia || !nuevoHorario.hora || !nuevoHorario.periodo}
                      className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FiPlus />
                    </button>
                  </div>

                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {actividad.horarios.length === 0 ? (
                      <p className="text-sm text-gray-500 text-center py-2">No hay horarios agregados</p>
                    ) : (
                      actividad.horarios.map((horario, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded border border-gray-200">
                          <span className="text-sm">{horario}</span>
                          <button
                            type="button"
                            onClick={() => eliminarHorario(index)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <FiMinus />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="mt-8">
                  <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Resumen</h2>
                  <div className="bg-gray-50 p-4 rounded-lg mt-2">
                    <div className="mb-2">
                      <h3 className="font-medium text-gray-700">Detalles de la Actividad</h3>
                      <p className="text-sm text-gray-600 mt-1">{actividad.nombre || "Sin nombre"}</p>
                    </div>
                    
                    <div className="space-y-2 mt-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Categoría:</span>
                        <span className="font-medium">{actividad.categoria || "No especificada"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duración:</span>
                        <span className="font-medium">{actividad.duracion ? `${actividad.duracion} min` : "No especificada"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Capacidad:</span>
                        <span className="font-medium">{actividad.capacidad ? `${actividad.capacidad} pers.` : "No especificada"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Dificultad:</span>
                        <span className="font-medium capitalize">{actividad.dificultad}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Horarios:</span>
                        <span className="font-medium">{actividad.horarios.length}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="mt-6 space-y-3">
                  <button
                    type="submit"
                    disabled={!actividad.nombre || !actividad.categoria || !actividad.descripcion || 
                              !actividad.duracion || !actividad.capacidad || !actividad.dificultad ||
                              !actividad.instructor.nombre || !actividad.instructor.cedula || 
                              !actividad.instructor.especialidad || actividad.horarios.length === 0}
                    className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Crear Actividad
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => navigate("/dashboardA/lista")}
                    className="w-full px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CrearActividad;