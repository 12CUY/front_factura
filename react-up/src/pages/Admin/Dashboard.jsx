import { motion } from "framer-motion";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Importamos los estilos del calendario
import { useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa"; // Importamos los íconos de play y pause

// Registramos los elementos necesarios de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [hovered, setHovered] = useState(null); // Estado para el hover de las imágenes
  const [playing, setPlaying] = useState(null); // Estado para controlar el reproductor
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal

  // Datos de ejemplo de canciones con imágenes y nombres aleatorios
  const songs = [
    {
      id: 1,
      name: "Noche Estrellada",
      imageDefault: "/img/dashboard-img/principal.jpg",
      imageHover: "/img/dashboard-img/nocheestrellas1.jpg",
    },
    {
      id: 2,
      name: "Viento del Mar",
      imageDefault: "/img/dashboard-img/principal.jpg",
      imageHover: "/img/dashboard-img/Viento del Mar.jpeg",
    },
    {
      id: 3,
      name: "Sueños de Otoño",
      imageDefault: "/img/dashboard-img/principal.jpg",
      imageHover: "/img/dashboard-img/Sueños de Otoño.jpeg",
    },
    {
      id: 4,
      name: "Ecos del Pasado",
      imageDefault: "/img/dashboard-img/principal.jpg",
      imageHover: "/img/dashboard-img/Ecos del Pasado.jpg",
    },
  ];

  const data = {
    labels: [
      "Noche Estrellada",
      "Viento del Mar",
      "Sueños de Otoño",
      "Ecos del Pasado",
    ],
    datasets: [
      {
        data: [12, 19, 5, 8, 3],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#FF9F40",
        ],
      },
    ],
  };

  // Función para manejar el click en el ícono de play
  const handlePlayClick = (id) => {
    if (playing === id) {
      setPlaying(null); // Si se hace clic en el mismo, ocultamos el reproductor
    } else {
      setPlaying(id); // Si no, mostramos el reproductor
      setShowModal(true); // Mostramos el modal
    }
  };

  // Función para manejar el clic en el ícono de pausa
  const handlePauseClick = () => {
    setPlaying(null); // Detenemos el reproductor
    setShowModal(false); // Cerramos el modal
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setShowModal(false);
    setPlaying(null);
  };

  return (
    <div className="flex-1  md:ml-72  p-8 min-h-screen bg-cover bg-center bg-[url('/fondo.gif')]">
      {/* Fondo blanco */}
      <div className="flex flex-col justify-center items-center min-h-screen  px-4">
        {/* Recuadro horizontal con imagen de fondo */}
        <div
          className="w-full max-w-7xl bg-cover bg-center mb-8 rounded-2xl shadow-lg p-6"
          style={{
            backgroundImage: `url(/img/dc.jpg)`,
            height: "100px",
          }}
        >
          <h1 className="text-center text-white text-xl md:text-2xl font-semibold leading-tight">
            Da vida a la música: organiza géneros, crea grupos, impulsa artistas
            y lleva tus eventos al siguiente nivel.
          </h1>
        </div>

        {/* Contenedor para gráfico de pastel y calendario */}
        <div className="flex flex-wrap justify-center gap-4 w-full max-w-7xl">
          {/* Estadísticas */}
          <motion.div
            className="bg-white p-4 rounded-lg shadow-lg w-full sm:w-1/2 md:w-1/3 lg:w-1/4 max-w-[350px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="text-center text-lg font-semibold mb-4">
              Estadísticas de la musica
            </h2>
            <div className="text-center">
              <Pie data={data} />
            </div>
            <div className="mt-4 text-center grid grid-cols-2 gap-x-4 gap-y-2">
              {data.labels.map((label, index) => (
                <div
                  key={index}
                  className="flex items-center justify-start text-sm font-medium text-gray-700"
                >
                  <span
                    className="inline-block w-4 h-4 rounded-full mr-2"
                    style={{
                      backgroundColor: data.datasets[0].backgroundColor[index],
                    }}
                  ></span>
                  {label}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Calendario */}
          <motion.div
            className="bg-white p-4 rounded-lg shadow-lg w-full sm:w-1/2 md:w-1/3 lg:w-1/4 max-w-[350px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="text-center text-lg font-semibold mb-4">
              Calendario de Eventos
            </h2>
            <div className="text-center">
              <Calendar className="calendar" tileClassName="calendar-tile" />
            </div>
          </motion.div>
        </div>

        {/* Notificaciones */}
        <h2 className="text-center text-lg font-semibold w-full max-w-7xl mt-8 text-white">
          Notificaciones de un evento
        </h2>

        <div className="flex flex-wrap justify-center gap-4 w-full mt-2">
          {["11-01-2025", "12-02-2025", "15-03-2025"].map((date, index) => (
            <motion.div
              key={index}
              className="bg-white p-4 rounded-lg shadow-lg cursor-pointer w-full sm:w-1/2 md:w-1/3 lg:w-1/4 max-w-[350px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-sm font-medium text-gray-700">
                Fecha del evento: {date}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${30 + index * 10}%` }}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Top */}
        <h2 className="text-left text-lg font-semibold w-full max-w-7xl mt-8 text-white">
          Top Musical
        </h2>

        <div className="flex flex-wrap justify-center gap-4 w-full mt-2">
          {songs.map((song) => (
            <motion.div
              key={song.id}
              className="bg-white rounded-lg shadow-lg cursor-pointer w-[120px] sm:w-[150px] md:w-[180px] lg:w-[200px] relative overflow-hidden"
              onMouseEnter={() => setHovered(song.id)}
              onMouseLeave={() => setHovered(null)}
              whileHover={{ scale: 1.05 }}
            >
              {/* Imagen ocupa todo el contenedor y mantiene el tamaño fijo */}
              <img
                src={hovered === song.id ? song.imageHover : song.imageDefault}
                alt={song.name}
                className="w-full h-40 object-cover transition-none transform-none"
              />

              {/* Ícono de Play */}
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl cursor-pointer"
                onClick={() => handlePlayClick(song.id)}
              >
                {playing === song.id ? <FaPause /> : <FaPlay />}
              </div>

              {/* Texto sobre la imagen en la parte inferior */}
              <div className="absolute bottom-0 w-full bg-black bg-opacity-50 py-2">
                <p className="text-center text-white text-sm">{song.name}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Reproductor Modal */}
        {showModal && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            onClick={closeModal}
          >
            <div
              className="bg-white p-8 rounded-lg max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-center text-lg font-semibold mb-4">
                Reproductor de Música
              </h3>
              <audio controls autoPlay>
                <source
                  src={`https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3`}
                  type="audio/mpeg"
                />
                Tu navegador no soporta el elemento de audio.
              </audio>
              <div className="text-center mt-4">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={handlePauseClick}
                >
                  Detener
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
