import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Page from "./Components/Page";

import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Refund from "./pages/Refund";
import Shipping from "./pages/Shipping";
import Contact from "./pages/Contact";
import TicketPage from "./pages/TicketPage";

function App() {
  return (
    <>
      <Navbar />

      {/* Push content below fixed navbar */}
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<Page />} />
          <Route path="/ticket/:participantId" element={<TicketPage />} />

          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/refunds" element={<Refund />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
