import { Routes, Route } from "react-router-dom";

/* Rutas de logeo */
import Login from "../pages/Login";
import Register from "../pages/Register";
import RecuperarContraseña from "../pages/Recuperar";

/* El menú */
import Navbar from "../components/Navbar";

/* Rutas de administrador */
import DashboardC from "../pages/Admin/Clientes/DashboardC";
import DashboardF from "../pages/Admin/Facturacion/DashboardF";
import DashboardH from "../pages/Admin/HistorialP/DashboardH";
import DashboardM from "../pages/Admin/MetodoP/DashboardM";
import CreacionF from "../pages/Admin/Facturacion/CreaacionF";
import ListaFacturas from "../pages/Admin/Facturacion/ListaF";
import HistorialC from "../pages/Admin/HistorialP/HistorialC";
import PagosP from "../pages/Admin/MetodoP/PagosP";
import PagosC from "../pages/Admin/MetodoP/PagosCD";

/* Páginas de cliente */
import ClientCreationPage from "../pages/Admin/Clientes/ClientCreationPage";
import ClientListPage from "../pages/Admin/Clientes/ClientListPage";
import ClientPurchaseGraphPage from "../pages/Admin/Clientes/ClientPurchaseGraphPage";

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
            <DashboardC />
          </>
        }
      />

      {/* Clientes */}
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
        path="/clientes/crear"
        element={
          <>
            <Navbar />
            <ClientCreationPage />
          </>
        }
      />
      <Route
        path="/clientes/lista"
        element={
          <>
            <Navbar />
            <ClientListPage />
          </>
        }
      />
      <Route
        path="/clientes/graficas"
        element={
          <>
            <Navbar />
            <ClientPurchaseGraphPage />
          </>
        }
      />

      {/* Facturación */}
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

      {/* Historial */}
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
        path="/historial-clientes"
        element={
          <>
            <Navbar />
            <HistorialC />
          </>
        }
      />

      {/* Métodos de pago */}
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
        path="/metodo-pago/paypal"
        element={
          <>
            <Navbar />
            <PagosP />
          </>
        }
      />
      <Route
        path="/metodo-pago/cancelados"
        element={
          <>
            <Navbar />
            <PagosC />
          </>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
