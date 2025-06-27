<<<<<<< HEAD
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
<<<<<<< HEAD
=======
// src/routes/index.jsx

import { Routes, Route } from "react-router-dom"; 

/*rutas de logeo */
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
import ClientCreationPage from "../pages/Admin/ClientCreationPage"; 
import ClientListPage from "../pages/Admin/ClientListPage"; 

// ¡NUEVA IMPORTACIÓN!
import ClientPurchaseGraphPage from "../pages/Admin/ClientPurchaseGraphPage"; 

>>>>>>> 4240911 (3 vistas realizadas de clientes)
=======
import ListaFacturas from "../pages/Admin/Facturacion/ListaF";
>>>>>>> 44483a20707e8643f348f17bea7dcad503489476

/*rutas */
const AppRoutes = () => {
  return (
    <Routes>
<<<<<<< HEAD
      <Route path="/" element={<Login />} />
      <Route path="/registro" element={<Register />} />
      <Route path="/recuperar" element={<RecuperarContraseña />} />
=======
      {/* Rutas de autenticación */}
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
>>>>>>> 4240911 (3 vistas realizadas de clientes)
      <Route
        path="/clientes"
        element={
          <>
<<<<<<< HEAD
            <Navbar />
            <DashboardC />
          </>
        }
      />
=======
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
        path="/clientes/graficas" // Puedes elegir la URL que prefieras
        element={
          <>
            <Navbar /> 
            <ClientPurchaseGraphPage /> 
          </>
        }
      />

>>>>>>> 4240911 (3 vistas realizadas de clientes)
      <Route
        path="/facturacion"
        element={
          <>
<<<<<<< HEAD
            <Navbar />
            <DashboardF />
=======
            <Navbar /> 
            <DashboardF /> 
>>>>>>> 4240911 (3 vistas realizadas de clientes)
          </>
        }
      />
      <Route
        path="/historial"
        element={
          <>
<<<<<<< HEAD
            <Navbar />
            <DashboardH />
=======
            <Navbar /> 
            <DashboardH /> 
>>>>>>> 4240911 (3 vistas realizadas de clientes)
          </>
        }
      />
      <Route
        path="/metodo-de-pago"
        element={
          <>
<<<<<<< HEAD
            <Navbar />
            <DashboardM />
          </>
        }
        
=======
            <Navbar /> 
            <DashboardM /> 
          </>
        }
>>>>>>> 4240911 (3 vistas realizadas de clientes)
      />
      <Route
        path="/facturacion/crear"
        element={
          <>
<<<<<<< HEAD
            <Navbar />
            <CreacionF />
          </>
        }
        
=======
            <Navbar /> 
            <CreacionF /> 
          </>
        }
>>>>>>> 4240911 (3 vistas realizadas de clientes)
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
    </Routes>
  );
};

<<<<<<< HEAD
export default AppRoutes;
=======
export default AppRoutes;
>>>>>>> 4240911 (3 vistas realizadas de clientes)
