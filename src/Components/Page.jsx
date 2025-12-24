import { useRef, useState } from "react";
import { saveParticipant } from "../firebase/helpers/firestoreHelpers";
import { openRazorpay } from "../razorpayUtils/razorpayHelpers";

import eventImage from "../assets/hero-fireworks.png";
import fireworksBg from "../assets/fireworks-illustration.png";
import logoImage from "../assets/logo_New.png";
import TicketPage from "../pages/TicketPage";
import Navbar from "./Navbar";
import { useAuth } from "../context/AuthContext";




import QRCode from "qrcode";
import jsPDF from "jspdf";

const SKIP_PAYMENT = false;

export default function Page() {
  const formRef = useRef(null);
  const { user, loginWithGoogle } = useAuth();
  const [loginError, setLoginError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successParticipantId, setSuccessParticipantId] = useState(null);

  /* ---------------- PDF PASS ---------------- */
  const generatePass = async (participantId, data) => {
    const qrDataUrl = await QRCode.toDataURL(participantId);
    const doc = new jsPDF("l", "mm", [54, 85]);

    // Background
    doc.addImage(eventImage, "PNG", 0, 0, 85, 54);

    // Dark overlay
    doc.setFillColor(0, 0, 0);
    doc.setGState(new doc.GState({ opacity: 0.6 }));
    doc.rect(0, 0, 85, 54, "F");
    doc.setGState(new doc.GState({ opacity: 1 }));

    // Header strip
    doc.setFillColor(11, 19, 43);
    doc.rect(0, 0, 85, 10, "F");
    doc.addImage(logoImage, "PNG", 2, 1.5, 7, 7);

    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text(
      "New Year’s Eve Celebration 2025 → 2026",
      42.5,
      6.5,
      { align: "center" }
    );

    doc.setFontSize(5.5);
    doc.text(
      "Celebrate the Grand Countdown • Welcome 2026 in Style",
      42.5,
      12,
      { align: "center" }
    );

    doc.setFontSize(10);
    doc.text("ENTRY PASS", 42.5, 18, { align: "center" });

    doc.setFontSize(7);
    doc.text("Date: 31 December 2025", 4, 24);
    doc.text("Time: 8:00 PM onwards", 4, 28);

    let y = 32;
    doc.text(`Name: ${data.name}`, 4, y);
    y += 4;
    doc.text(`Mobile: ${data.mobile}`, 4, y);
    y += 4;
    doc.text(`Guests: ${data.numberOfPeople}`, 4, y);
    y += 4;
    doc.text(`Pass Type: ${data.passType}`, 4, y);

    doc.addImage(qrDataUrl, "PNG", 62, 30, 16, 16);
    doc.text("Scan at Entry", 70, 48, { align: "center" });

    return URL.createObjectURL(doc.output("blob"));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  // 🔐 LOGIN CHECK (NEW)
  if (!user) {
    setLoginError(true);
    return;
  }

  const form = e.target;

  const data = {
    name: form.name.value,
    mobile: form.mobile.value,
    passType: form.passType.value,
    numberOfPeople: parseInt(form.numberOfPeople.value, 10),
    venueId: form.venue.value,
    userId: user.uid,
  };

  // ================= PAYMENT FLOW =================
  if (!SKIP_PAYMENT) {
    openRazorpay(
      1,
      data,
      async (paymentResponse) => {
        const participantId = await saveParticipant({
          ...data,
          paymentId: paymentResponse.razorpay_payment_id,
          amountPaid: 1,
          isUsed: false,
        });

        // ✅ Redirect to ticket page
        window.location.href = `/ticket/${participantId}`;
      },
      () => alert("Payment failed")
    );
    return;
  }

  // ================= DEV / TEST MODE =================
  const participantId = await saveParticipant({
    ...data,
    paymentId: "NOT DONE YET",
    amountPaid: 0,
    isUsed: false,
  });

  // ✅ Redirect to ticket page
  window.location.href = `/ticket/${participantId}`;
};




  return (
    <div className="text-gray-800">
    <Navbar />
    <div className="text-gray-800">
      {/* existing Page JSX stays EXACTLY the same */}
    </div>

      {/* HEADER */}
      <header className="bg-[#0B132B] py-4 text-center">
        <h1 className="text-4xl text-white">
          New Year’s Eve Celebration 2025 → 2026
        </h1>
        <p className="text-[#D4AF37] mt-2 font-semibold">
          Celebrate the Grand Countdown • Welcome 2026 in Style
        </p>
      </header>

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img
          src={eventImage}
          alt="New Year Fireworks"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 max-w-4xl text-center px-6 text-white">
          <h2 className="text-4xl md:text-6xl font-extrabold">
            New Year’s Eve Celebration
            <span className="block text-[#D4AF37] mt-2">2025 → 2026</span>
          </h2>

          <p className="mt-6 text-lg md:text-2xl text-gray-200">
            One Night • One Countdown • Infinite Memories
          </p>

          <p className="mt-3 text-sm md:text-base text-gray-300">
            Dance • Music • Midnight Fireworks • Luxury Celebration
          </p>

          <a href="#booking">
            <button className="mt-10 bg-[#D4AF37] text-black px-10 py-4 rounded-xl font-bold text-lg shadow-2xl hover:scale-105 transition">
              Book Your Entry Pass
            </button>
          </a>
        </div>
      </section>

      {/* BOOKING SECTION */}
      <section
        id="booking"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Fireworks background */}
        <img
          src={fireworksBg}
          alt="New Year Fireworks"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Golden night overlay (THIS IS THE MAGIC) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70"></div>

        {/* Poster Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          
          {/* Glowing Heading */}
          <h2
            className="text-4xl md:text-6xl font-extrabold text-[#FFD36A] mb-4"
            style={{
              textShadow:
                "0 0 20px rgba(255,211,106,0.8), 0 0 40px rgba(255,211,106,0.6)",
            }}
          >
            Welcome to Celebrate with Us on <br />
            <span className="text-white">New Year’s Eve!</span> 🎉
          </h2>

          <p
            className="text-lg md:text-xl text-[#FFE8A3] mb-10"
            style={{ textShadow: "0 0 12px rgba(255,232,163,0.7)" }}
          >
            Book Fast • Limited Entries • Countdown to 2026
          </p>

          {/* Booking Card */}
          <div
            className="w-full max-w-lg p-10 rounded-2xl backdrop-blur-md bg-black/70"
            style={{
              boxShadow:
                "0 0 30px rgba(255,211,106,0.4), inset 0 0 20px rgba(255,211,106,0.15)",
              border: "1px solid rgba(255,211,106,0.6)",
            }}
          >
            <h3 className="text-xl font-bold text-[#FFD36A] mb-6">
              Reserve Your New Year’s Eve Pass
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="name"
                placeholder="Full Name"
                required
                className="w-full bg-white/90 border border-[#FFD36A]/40 p-2 rounded"
              />
              <input
                name="mobile"
                placeholder="Mobile Number"
                required
                className="w-full bg-white/90 border border-[#FFD36A]/40 p-2 rounded"
              />
              <select
                name="venue"
                required
                className="w-full bg-white/90 border border-[#FFD36A]/40 p-2 rounded"
              >
                <option value="">Select Venue</option>
                <option value="bhopal">Bhopal – Lake View Club</option>
                <option value="mumbai">Mumbai – Skyline Arena</option>
              </select>

              <select
                name="passType"
                required
                className="w-full bg-white/90 border border-[#FFD36A]/40 p-2 rounded"
              >
                <option value="">Select Pass Type</option>
                <option>VIP</option>
                <option>Regular</option>
              </select>
              <input
                name="numberOfPeople"
                type="number"
                min="1"
                max="10"
                placeholder="Enter number of guests"
                required
                className="w-full bg-white/90 border border-[#FFD36A]/40 p-2 rounded"
              />

              <button
                className="w-full py-3 rounded-xl font-bold text-black bg-gradient-to-r from-[#FFD36A] to-[#FFB800] hover:scale-105 transition"
                style={{
                  boxShadow: "0 0 20px rgba(255,211,106,0.8)",
                }}
              >
                Confirm Booking 🎆
              </button>
            </form>
          </div>
        </div>
      </section>


      {/* SUCCESS MODAL */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg text-center">
            <h3 className="text-2xl font-bold text-green-600">
              Booking Confirmed 🎉
            </h3>
            <p className="mt-4">
              Your New Year’s Eve entry pass has been successfully generated.
            </p>
            <p className="text-sm mt-2">Pass ID: {successParticipantId}</p>
            <button
              onClick={() => setShowSuccess(false)}
              className="mt-6 bg-green-600 text-white px-6 py-2 rounded"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <div className="h-px bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent"></div>
      
      {loginError && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg text-center max-w-sm">
      <h3 className="text-xl font-bold mb-3">Login Required</h3>
      <p className="text-gray-600 mb-4">
        Please sign in with Google before booking your ticket.
      </p>

      <button
        onClick={async () => {
          setLoginError(false);
          await loginWithGoogle();
        }}
        className="bg-black text-white px-4 py-2 rounded mr-2"
      >
        Sign in with Google
      </button>

      <button
        onClick={() => setLoginError(false)}
        className="text-gray-600 px-4 py-2"
      >
        Cancel
      </button>
    </div>
  </div>
)}


      {/* FOOTER */}
      
      <footer className="bg-black text-gray-400 py-8 text-center text-sm">
      <div className="space-x-4 mb-4">
        <a href="/terms" className="hover:text-white transition">
          Terms & Conditions
        </a>
        <a href="/privacy" className="hover:text-white transition">
          Privacy Policy
        </a>
        <a href="/refunds" className="hover:text-white transition">
          Cancellation & Refunds
        </a>
        <a href="/shipping" className="hover:text-white transition">
          Shipping
        </a>
        <a href="/contact" className="hover:text-white transition">
          Contact Us
        </a>
      </div>

      <div className="text-xs text-gray-500">
        Powered by{" "}
        <span className="text-gray-300 font-medium">
          WhiteCircle Group
        </span>{" "}
        · Crafted by{" "}
        <span className="text-gray-300 font-medium">
          Harisharan Mishra
        </span>
      </div>
    </footer>


    </div>
  );
}
