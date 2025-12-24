import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Page from "./Components/Page.jsx";
import TicketPage from "./pages/TicketPage.jsx";
import Navbar from "./Components/Navbar.jsx";
import MyTickets from "./pages/MyTickets";


import "./index.css";

// ✅ Auth Context
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* 🔐 AuthProvider WRAPS ROUTES — DOES NOT CHANGE THEM */}
      <AuthProvider>
        <Routes>
          {/* Booking Page */}
          <Route path="/" element={<Page />} />

          {/* Ticket Page */}
          <Route path="/ticket/:participantId" element={<TicketPage />} />

          <Route path="/my-tickets" element={<MyTickets />} />

          {/* Static Pages (temporary redirect) */}
          <Route path="/terms" element={<Navigate to="/" />} />
          <Route path="/privacy" element={<Navigate to="/" />} />
          <Route path="/refunds" element={<Navigate to="/" />} />
          <Route path="/shipping" element={<Navigate to="/" />} />
          <Route path="/contact" element={<Navigate to="/" />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
