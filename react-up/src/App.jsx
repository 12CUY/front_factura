import { BrowserRouter as Router } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import AppRoutes from "./routes";

function App() {
  return (
    <div className="cursor-custom">
      <PayPalScriptProvider options={{ clientId: "YOUR_PAYPAL_CLIENT_ID" }}>
        <Router>
          <AppRoutes />
        </Router>
      </PayPalScriptProvider>
    </div>
  );
}

export default App;