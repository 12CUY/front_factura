import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";

function App() {
  return (
    <div className="cursor-custom">
      {" "}
      {/* Aplica la clase global aquí */}
      <Router>
        <AppRoutes />
      </Router>
    </div>
  );
}

export default App;
