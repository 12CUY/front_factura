import { Routes, Route } from "react-router-dom";
/*rutas de logeo  */
import Login from "../pages/Login";
import Register from "../pages/Register";
import RecuperarContraseña from "../pages/Recuperar";

/*el menu*/
import Navbar from "../components/Navbar";

/*rutas de parte de administrador */
import DashboardC from "../pages/Admin/Clientes/DashboardC";
import DashboardF from "../pages/Admin/Facturacion/DashboardF";
import DashboardH from "../pages/Admin/HistorialP/DashboardH";
import DashboardM from "../pages/Admin/MetodoP/DashboardM";
import CreacionF from "../pages/Admin/Facturacion/CreaacionF";

/*rutas */
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registro" element={<Register />} />
      <Route path="/recuperar" element={<RecuperarContraseña />} />
      <Route
        path="/clientes"
        element={
          <>
            <Navbar />
            <DashboardC />
          </>
        }
      />
      <Route
        path="/facturacion"
        element={
          <>
            <Navbar />
            <DashboardF />
          </>
        }
      />
      <Route
        path="/historial"
        element={
          <>
            <Navbar />
            <DashboardH />
          </>
        }
      />
      <Route
        path="/metodo-de-pago"
        element={
          <>
            <Navbar />
            <DashboardM />
          </>
        }
        
      />
      <Route
        path="/facturacion/crear"
        element={
          <>
            <Navbar />
            <CreacionF />
          </>
        }
        
      />
    </Routes>
  );
};

export default AppRoutes;
