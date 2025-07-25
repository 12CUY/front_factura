import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";
import { Toaster } from "react-hot-toast"; // Opcional: notificaciones

function App() {
  return (
    <div className="cursor-custom bg-gray-50 min-h-screen">
      <Router>
        <AppRoutes />
        <Toaster position="top-right" /> {/* Opcional */}
      </Router>
    </div>
  );
}

export default App;