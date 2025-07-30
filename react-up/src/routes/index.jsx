import { Routes, Route } from "react-router-dom";

/* Rutas de logeo */
import Login from "../pages/Login";
import Register from "../pages/Register";
import RecuperarContraseña from "../pages/Recuperar";

/* El menú */
import Navbar from "../components/Navbar";

/* Rutas de administrador */
import DashboardU from "../pages/Admin/Usuarios/DashboardU";
import DashboardA from "../pages/Admin/Actividades/DashboardA";
import DashboardEntrenamiento from "../pages/Admin/Entrenamiento/DashboardE";

/* rutas de actividades */
import Creacionusuario from "../pages/Admin/Usuarios/usuariosS/Creacionusuario";
import Permisoyroles from "../pages/Admin/Usuarios/usuariosS/Permisoyroles";
import Profesores from "../pages/Admin/Actividades/Clases/Profesor";

import GestionarVisita from "../pages/Admin/Actividades/Visitas/Gestionarvisita";
import GestionarActividades from "../pages/Admin/Actividades/Actividades/Gestionaractividades";
import DashboardC from "../pages/Admin/Comercial/DashboardC";
import VentaProducto from "../pages/Admin/Comercial/VentaProducto";
import Inventario from "../pages/Admin/Comercial/Inventario";
import DashboardResumen from "../pages/Admin/Dashboard/Dashboardresumen";
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
            <GestionarActividades />
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

      {/* registrar visita actividades */}
      <Route
        path="/visitas/gestionar-visita"
        element={
          <>
            <Navbar />
            <GestionarVisita />
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
            {/* comercial */}
      <Route
        path="/comercial/gestionar-ventas"
        element={
          <>
            <Navbar />
            <VentaProducto />
          </>
        }
      />
                  {/* inventario */}
      <Route
        path="/comercial/inventario"
        element={
          <>
            <Navbar />
            <Inventario />
          </>
        }
      />

    </Routes>
  );
};

export default AppRoutes;
