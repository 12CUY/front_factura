import { Routes, Route } from "react-router-dom";

/* Rutas de logeo */
import Login from "../pages/Login";
import Register from "../pages/Register";
import RecuperarContraseña from "../pages/Recuperar";

/* El menú */
import Navbar from "../components/Navbar";

/* Rutas de administrador */
import DashboardU from "../pages/Admin/Usuarios/DashboardU";
import DashboardResumen from "../pages/Admin/Dashboard/Dashboardresumen";
import DashboardA from "../pages/Admin/Actividades/DashboardA";
import DashboardC from "../pages/Admin/Comercial/DashboardC";
import DashboardEntrenamiento from "../pages/Admin/Entrenamiento/DashboardE";
import DashboardInventario from "../pages/Admin/Inventario/DashboardI";
import DashboardConfiguracion from "../pages/Admin/Configuracion/DashboardCo";
/* rutas de actividades */
import ListaActividades from "../pages/Admin/Actividades/actividades/listado";
import CalendarioActividades from "../pages/Admin/Actividades/actividades/calendario";
import ProgramarClass from "../pages/Admin/Actividades/Clases/Programarclase";
import HorarioClass from "../pages/Admin/Actividades/Clases/Horarioclases";
import RegistraVista from "../pages/Admin/Actividades/Visitas/Registrarvisita";
import HistorialV from "../pages/Admin/Actividades/Visitas/Historialvisitas";
import Reportes from "../pages/Admin/Actividades/Visitas/Reportes";
import Creacionusuario from "../pages/Admin/Usuarios/usuariosS/Creacionusuario";
import Permisoyroles from "../pages/Admin/Usuarios/usuariosS/Permisoyroles";
import RegistrarLog from "../pages/Admin/Actividades/Actividades/Registar";
import Profesores from "../pages/Admin/Actividades/Clases/Profesor";
import VentaProducto from "../pages/Admin/Comercial/VentaProducto";
import Inventario from "../pages/Admin/Comercial/Inventario";
import Analisis from "../pages/Admin/Comercial/Analisis";
/* Páginas de cliente */
const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<Login />} />
      <Route path="/registro" element={<Register />} />
      <Route path="/recuperar" element={<RecuperarContraseña />} />

      {/* Dashboard principal */}
      <Route
        path="/dashboard"
        element={
          <>
            <Navbar />
            <DashboardResumen />
          </>
        }
      />

      {/* actividades */}
      <Route
        path="/dashboardA"
        element={
          <>
            <Navbar />
            <DashboardA />
          </>
        }
      />
      {/* crear actividades */}
      <Route
        path="/dashboardA/registrar"
        element={
          <>
            <Navbar />
            <RegistrarLog />
          </>
        }
      />
      {/* lista actividades */}
      <Route
        path="/dashboardA/lista"
        element={
          <>
            <Navbar />
            <ListaActividades />
          </>
        }
      />
      {/* calendario actividades */}
      <Route
        path="/dashboardA/calendario"
        element={
          <>
            <Navbar />
            <CalendarioActividades />
          </>
        }
      />

      {/* clases actividades */}
      <Route
        path="/dashboardA/crearclase"
        element={
          <>
            <Navbar />
            <ProgramarClass />
          </>
        }
      />
      {/* intructor actividades */}
      <Route
        path="/dashboardA/Profesores"
        element={
          <>
            <Navbar />
            <Profesores />
          </>
        }
      />
      {/* horario de clases actividades */}
      <Route
        path="/dashboardA/horarioClases"
        element={
          <>
            <Navbar />
            <HorarioClass />
          </>
        }
      />
      {/* registrar visita actividades */}
      <Route
        path="/visitas/registrar"
        element={
          <>
            <Navbar />
            <RegistraVista />
          </>
        }
      />
      {/* historial visita actividades */}
      <Route
        path="/visitas/historial"
        element={
          <>
            <Navbar />
            <HistorialV />
          </>
        }
      />
      {/* reportes visita actividades */}
      <Route
        path="/visitas/reportes"
        element={
          <>
            <Navbar />
            <Reportes />
          </>
        }
      />

      {/* usuarios new */}
      <Route
        path="/dashboardU"
        element={
          <>
            <Navbar />
            <DashboardU />
          </>
        }
      />
      {/* usuarios creacion  */}
      <Route
        path="/dashboardU/CreacionUsuario"
        element={
          <>
            <Navbar />
            <Creacionusuario />
          </>
        }
      />
      {/* usuarios permisos  */}
      <Route
        path="/dashboardU/PermisosRoles"
        element={
          <>
            <Navbar />
            <Permisoyroles />
          </>
        }
      />

      {/* comercial */}
      <Route
        path="/dashboardC"
        element={
          <>
            <Navbar />
            <DashboardC />
          </>
        }
      />
      {/* entrenamiento */}
      <Route
        path="/dashboardE"
        element={
          <>
            <Navbar />
            <DashboardEntrenamiento />
          </>
        }
      />
      {/* inventario */}
      <Route
        path="/dashboardI"
        element={
          <>
            <Navbar />
            <DashboardInventario />
          </>
        }
      />
      {/* configuracion */}
      <Route
        path="/dashboardConfiguracion"
        element={
          <>
            <Navbar />
            <DashboardConfiguracion />
          </>
        }
      />
      <Route
        path="/ventas-productos/nueva"
        element={
          <>
            <Navbar />
            < VentaProducto/>
          </>
        }
      />
      <Route
        path="/ventas-productos/inventario"
        element={
          <>
            <Navbar />
            < Inventario/>
          </>
        }
      />
      <Route
        path="/ventas-productos/analisis"
        element={
          <>
            <Navbar />
            < Analisis/>
          </>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
