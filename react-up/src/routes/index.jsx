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
      {/* usuarios */}
      <Route
        path="/dashboardU"
        element={
          <>
            <Navbar />
            <DashboardU />
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
    </Routes>
  );
};

export default AppRoutes;
