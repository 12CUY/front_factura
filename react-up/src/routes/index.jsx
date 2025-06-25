import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";

import Navbar from "../components/Navbar";

import RecuperarContraseña from "../pages/Recuperar";

import DashboardC from "../pages/Admin/Clientes/DashboardC";
import DashboardF from "../pages/Admin/Facturacion/DashboardF";
import DashboardH from "../pages/Admin/HistorialP/DashboardH";
import DashboardM from "../pages/Admin/MetodoP/DashboardM";

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
        path="/metodo de pago"
        element={
          <>
            <Navbar />
            <DashboardM />
          </>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
