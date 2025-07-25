import { useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const CalendarioPersonalizado = () => {
  const navigate = useNavigate();
  const [currentWeek, setCurrentWeek] = useState(moment());
  const [view, setView] = useState("week");

  // Datos de ejemplo para eventos
  const eventos = [
    {
      id: 1,
      title: "Yoga Matutino",
      date: moment().day(1).hour(8).minute(0), // Lunes 8:00 AM
      duration: 60,
      instructor: "María López",
      color: "bg-indigo-500",
    },
    {
      id: 2,
      title: "Crossfit",
      date: moment().day(3).hour(12).minute(0), // Miércoles 12:00 PM
      duration: 45,
      instructor: "Carlos Méndez",
      color: "bg-red-500",
    },
    {
      id: 3,
      title: "Natación",
      date: moment().day(5).hour(17).minute(0), // Viernes 5:00 PM
      duration: 50,
      instructor: "Ana Torres",
      color: "bg-green-500",
    },
  ];

  // Navegación del calendario
  const goToToday = () => setCurrentWeek(moment());
  const goToPrevious = () => setCurrentWeek(moment(currentWeek).subtract(1, view));
  const goToNext = () => setCurrentWeek(moment(currentWeek).add(1, view));

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
    for (let i = 0; i < 24; i++) {
      hours.push(i);
    }
    return hours;
  };

  // Obtener eventos para un día y hora específicos
  const getEventsForTime = (day, hour) => {
    return eventos.filter((event) => {
      const eventHour = moment(event.date).hour();
      const eventDay = moment(event.date).day();
      const currentDay = moment(day).day();
      
      return (
        eventHour === hour && 
        eventDay === currentDay &&
        moment(event.date).isSame(currentWeek, "week")
      );
    });
  };

  // Formatear rango de fechas
  const formatDateRange = () => {
    const start = moment(currentWeek).startOf("week").format("MMM D");
    const end = moment(currentWeek).endOf("week").format("MMM D");
    return `${start} - ${end}`;
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
      {/* Fondo semitransparente para mejorar legibilidad */}
      <div className="absolute inset-0 bg-black/10"></div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Título principal */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Calendario de Actividades
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

            <div className="flex space-x-2">
              <button
                onClick={() => setView("month")}
                className={`px-3 py-1 rounded-lg transition text-sm ${
                  view === "month"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Mes
              </button>
              <button
                onClick={() => setView("week")}
                className={`px-3 py-1 rounded-lg transition text-sm ${
                  view === "week"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Semana
              </button>
              <button
                onClick={() => setView("day")}
                className={`px-3 py-1 rounded-lg transition text-sm ${
                  view === "day"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Día
              </button>
              <button
                onClick={() => setView("agenda")}
                className={`px-3 py-1 rounded-lg transition text-sm ${
                  view === "agenda"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Agenda
              </button>
            </div>
          </div>
        </div>

        {/* Vista de semana */}
        {view === "week" && (
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
                    const events = getEventsForTime(day, hour);
                    return (
                      <div
                        key={`${day.format("YYYY-MM-DD")}-${hour}`}
                        className="p-1 border-r h-16 relative"
                      >
                        {events.map((event) => {
                          const durationHours = Math.floor(event.duration / 60);
                          const durationMinutes = event.duration % 60;
                          const rowSpan = Math.max(
                            1,
                            Math.ceil(event.duration / 60)
                          );
                          return (
                            <div
                              key={event.id}
                              className={`absolute top-0 left-0 right-0 m-1 rounded p-1 text-white text-xs overflow-hidden ${event.color}`}
                              style={{
                                height: `calc(${rowSpan * 4}rem - 0.5rem)`,
                                zIndex: 10,
                              }}
                            >
                              <div className="font-semibold truncate">
                                {event.title}
                              </div>
                              <div className="truncate">
                                {moment(event.date).format("h:mm A")} -{" "}
                                {moment(event.date)
                                  .add(durationHours, "hours")
                                  .add(durationMinutes, "minutes")
                                  .format("h:mm A")}
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
        )}

        {/* Vista de agenda (ejemplo simplificado) */}
        {view === "agenda" && (
          <div className="bg-white rounded-xl shadow-lg p-6 backdrop-blur-sm bg-white/80">
            <h3 className="text-xl font-semibold mb-4">Próximas Actividades</h3>
            <div className="space-y-4">
              {eventos
                .filter((event) => moment(event.date).isSameOrAfter(moment(), "day"))
                .sort((a, b) => moment(a.date).diff(moment(b.date)))
                .map((event) => (
                  <div
                    key={event.id}
                    className={`p-4 rounded-lg text-white ${event.color}`}
                  >
                    <div className="font-bold">{event.title}</div>
                    <div>
                      {moment(event.date).format("dddd, MMMM D [a las] h:mm A")}
                    </div>
                    <div>Instructor: {event.instructor}</div>
                    <div>Duración: {event.duration} minutos</div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Botón de volver */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/dashboardA")}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Volver al Panel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarioPersonalizado;