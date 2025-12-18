import { Routes, Route } from "react-router-dom";
import Page from "./Components/Page";

import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Refund from "./pages/Refund";
import Shipping from "./pages/Shipping";
import Contact from "./pages/Contact";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Page />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/refunds" element={<Refund />} />
      <Route path="/shipping" element={<Shipping />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

export default App;

