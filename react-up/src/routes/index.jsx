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

// Importación de ClientCreationPage y ClientListPage
import ClientCreationPage from "../pages/Admin/Clientes/ClientCreationPage"; 
import ClientListPage from "../pages/Admin/Clientes/ClientListPage"; 

// ¡NUEVA IMPORTACIÓN!
import ClientPurchaseGraphPage from "../pages/Admin/Clientes/ClientPurchaseGraphPage"; 

import ListaFacturas from "../pages/Admin/Facturacion/ListaF";
import HistorialC from "../pages/Admin/HistorialP/HistorialC";

/*rutas */
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registro" element={<Register />} />
      <Route path="/recuperar" element={<RecuperarContraseña />} />
      
      {/* Ruta para el dashboard principal después del login */}
      <Route
        path="/dashboard" 
        element={
          <>
            <Navbar /> 
            <DashboardC /> 
          </>
        }
      />

      {/* Rutas de la parte de administrador que incluyen el Navbar */}
      <Route
        path="/clientes"
        element={
          <>
            <Navbar />
            <DashboardC />
          </>
        }
      />
      
      {/* Ruta para la creación de clientes */}
      <Route
        path="/clientes/crear" 
        element={
          <>
            <Navbar /> 
            <ClientCreationPage /> 
          </>
        }
      />

      {/* Ruta para el listado de clientes */}
      <Route
        path="/clientes/lista" 
        element={
          <>
            <Navbar /> 
            <ClientListPage /> 
          </>
        }
      />

      {/* ¡NUEVA RUTA para la gráfica de compras! */}
      <Route
        path="/clientes/graficas"
        element={
          <>
            <Navbar /> 
            <ClientPurchaseGraphPage /> 
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
      
      <Route
        path="/facturacion/lista"
        element={
          <>
            <Navbar />
            <ListaFacturas />
          </>
        }
      />
       <Route
        path="/historial-clientes"
        element={
          <>
            <Navbar />
            <HistorialC />
          </>
        }
      />

    </Routes>
  );
};

export default AppRoutes;