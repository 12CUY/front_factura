import { useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Swal from "sweetalert2";

const HorarioClass = () => {
  const navigate = useNavigate();
  const [currentWeek, setCurrentWeek] = useState(moment());
  const [showAddClassModal, setShowAddClassModal] = useState(false);
  const [newClass, setNewClass] = useState({
    title: "",
    date: "",
    time: "",
    duration: 60,
    instructor: "",
    capacity: 20
  });

  // Datos de ejemplo para clases
  const [classes, setClasses] = useState([
    {
      id: 1,
      title: "Yoga Matutino",
      date: moment().day(1).hour(8).minute(0),
      duration: 60,
      instructor: "María López",
      capacity: 15,
      enrolled: 12,
      color: "bg-indigo-500"
    },
    {
      id: 2,
      title: "Crossfit",
      date: moment().day(3).hour(12).minute(0),
      duration: 45,
      instructor: "Carlos Méndez",
      capacity: 20,
      enrolled: 18,
      color: "bg-red-500"
    }
  ]);

  // Navegación del calendario
  const goToToday = () => setCurrentWeek(moment());
  const goToPrevious = () => setCurrentWeek(moment(currentWeek).subtract(1, "week"));
  const goToNext = () => setCurrentWeek(moment(currentWeek).add(1, "week"));

  // Generar días de la semana actual
  const generateWeekDays = () => {
    const startOfWeek = moment(currentWeek).startOf("week");
    const days = [];

    for (let i = 0; i < 7; i++) {
      days.push(moment(startOfWeek).add(i, "days"));
    }

    return days;
  };

  // Generar horas del día
  const generateHours = () => {
    const hours = [];
    for (let i = 7; i < 21; i++) {
      hours.push(i);
    }
    return hours;
  };

  // Obtener clases para un día y hora específicos
  const getClassesForTime = (day, hour) => {
    return classes.filter((cls) => {
      const classHour = moment(cls.date).hour();
      const classDay = moment(cls.date).day();
      const currentDay = moment(day).day();
      
      return (
        classHour === hour && 
        classDay === currentDay &&
        moment(cls.date).isSame(currentWeek, "week")
      );
    });
  };

  // Formatear rango de fechas
  const formatDateRange = () => {
    const start = moment(currentWeek).startOf("week").format("MMM D");
    const end = moment(currentWeek).endOf("week").format("MMM D");
    return `${start} - ${end}`;
  };

  // Manejar agregar nueva clase
  const handleAddClass = () => {
    if (!newClass.title || !newClass.date || !newClass.time || !newClass.instructor) {
      Swal.fire({
        title: "Error",
        text: "Por favor complete todos los campos requeridos",
        icon: "error"
      });
      return;
    }

    const newClassObj = {
      id: classes.length + 1,
      title: newClass.title,
      date: moment(`${newClass.date} ${newClass.time}`),
      duration: parseInt(newClass.duration),
      instructor: newClass.instructor,
      capacity: parseInt(newClass.capacity),
      enrolled: 0,
      color: `bg-${["indigo", "red", "green", "blue", "purple"][Math.floor(Math.random() * 5)]}-500`
    };

    setClasses([...classes, newClassObj]);
    setShowAddClassModal(false);
    setNewClass({
      title: "",
      date: "",
      time: "",
      duration: 60,
      instructor: "",
      capacity: 20
    });

    Swal.fire({
      title: "¡Éxito!",
      text: "La clase ha sido agregada al horario",
      icon: "success"
    });
  };

  // Eliminar clase
  const handleDeleteClass = (id) => {
    Swal.fire({
      title: "¿Eliminar clase?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        setClasses(classes.filter(cls => cls.id !== id));
        Swal.fire("Eliminada", "La clase ha sido eliminada", "success");
      }
    });
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50" style={{
      backgroundImage: "url('/gimnasio_actividades.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
    }}>
      <div className="absolute inset-0 bg-black/10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Horario de Clases
        </h1>

        {/* Controles del calendario */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6 backdrop-blur-sm bg-white/80">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex space-x-2">
              <button
                onClick={goToToday}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-sm"
              >
                Hoy
              </button>
              <button
                onClick={goToPrevious}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-sm"
              >
                Anterior
              </button>
              <button
                onClick={goToNext}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-sm"
              >
                Siguiente
              </button>
            </div>

            <h2 className="text-lg font-semibold text-gray-800">
              {formatDateRange()}
            </h2>

            <button
              onClick={() => setShowAddClassModal(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm"
            >
              Agregar Clase
            </button>
          </div>
        </div>

        {/* Vista de semana */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden backdrop-blur-sm bg-white/80">
          {/* Encabezado de días */}
          <div className="grid grid-cols-8 border-b">
            <div className="p-2 border-r"></div>
            {generateWeekDays().map((day) => (
              <div
                key={day.format("YYYY-MM-DD")}
                className={`p-2 text-center ${
                  day.isSame(moment(), "day")
                    ? "bg-indigo-100 font-semibold"
                    : ""
                }`}
              >
                <div className="text-sm text-gray-500">
                  {day.format("ddd").toUpperCase()}
                </div>
                <div className="text-lg">{day.format("D")}</div>
              </div>
            ))}
          </div>

          {/* Cuerpo del calendario */}
          <div className="overflow-y-auto" style={{ maxHeight: "60vh" }}>
            {generateHours().map((hour) => (
              <div key={hour} className="grid grid-cols-8 border-b">
                <div className="p-2 border-r text-right pr-4 text-sm text-gray-500">
                  {moment().hour(hour).minute(0).format("h:mm A")}
                </div>
                {generateWeekDays().map((day) => {
                  const classEvents = getClassesForTime(day, hour);
                  return (
                    <div
                      key={`${day.format("YYYY-MM-DD")}-${hour}`}
                      className="p-1 border-r h-16 relative"
                    >
                      {classEvents.map((cls) => {
                        const durationHours = Math.floor(cls.duration / 60);
                        const durationMinutes = cls.duration % 60;
                        const rowSpan = Math.max(
                          1,
                          Math.ceil(cls.duration / 60)
                        );
                        return (
                          <div
                            key={cls.id}
                            className={`absolute top-0 left-0 right-0 m-1 rounded p-1 text-white text-xs overflow-hidden ${cls.color}`}
                            style={{
                              height: `calc(${rowSpan * 4}rem - 0.5rem)`,
                              zIndex: 10,
                            }}
                          >
                            <div className="font-semibold truncate">
                              {cls.title}
                            </div>
                            <div className="truncate">
                              {moment(cls.date).format("h:mm A")} -{" "}
                              {moment(cls.date)
                                .add(durationHours, "hours")
                                .add(durationMinutes, "minutes")
                                .format("h:mm A")}
                            </div>
                            <div className="flex justify-between items-center mt-1">
                              <span>{cls.instructor}</span>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteClass(cls.id);
                                }}
                                className="text-white hover:text-red-200"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Modal para agregar nueva clase */}
        {showAddClassModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4">Agregar Nueva Clase</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la clase</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg"
                    value={newClass.title}
                    onChange={(e) => setNewClass({...newClass, title: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border rounded-lg"
                    value={newClass.date}
                    onChange={(e) => setNewClass({...newClass, date: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hora</label>
                  <input
                    type="time"
                    className="w-full px-3 py-2 border rounded-lg"
                    value={newClass.time}
                    onChange={(e) => setNewClass({...newClass, time: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duración (minutos)</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border rounded-lg"
                    value={newClass.duration}
                    onChange={(e) => setNewClass({...newClass, duration: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Instructor</label>
                  <select
                    className="w-full px-3 py-2 border rounded-lg"
                    value={newClass.instructor}
                    onChange={(e) => setNewClass({...newClass, instructor: e.target.value})}
                  >
                    <option value="">Seleccionar instructor</option>
                    <option value="María López">María López</option>
                    <option value="Carlos Méndez">Carlos Méndez</option>
                    <option value="Ana Torres">Ana Torres</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Capacidad</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border rounded-lg"
                    value={newClass.capacity}
                    onChange={(e) => setNewClass({...newClass, capacity: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAddClassModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddClass}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Guardar Clase
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Botón de volver */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Volver al Panel
          </button>
        </div>
      </div>
    </div>
  );
};

export default HorarioClass;