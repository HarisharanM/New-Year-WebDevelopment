import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getUserTickets } from "../firebase/helpers/firestoreHelpers";
import { Link, Navigate } from "react-router-dom";
import QRCode from "qrcode";

export default function MyTickets() {
  const { user, loading } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [qrMap, setQrMap] = useState({});

  useEffect(() => {
    if (!user) return;

    async function loadTickets() {
      const data = await getUserTickets(user.uid);
      setTickets(data);

      // generate QR codes
      const map = {};
      for (const t of data) {
        map[t.participantId] = await QRCode.toDataURL(t.participantId);
      }
      setQrMap(map);
    }

    loadTickets();
  }, [user]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!user) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">My Tickets</h1>

      {tickets.length === 0 ? (
        <p className="text-center text-gray-600">
          You have not booked any tickets yet.
        </p>
      ) : (
        <div className="grid gap-6 max-w-4xl mx-auto">
          {tickets.map((t) => (
            <div
              key={t.participantId}
              className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row gap-6"
            >
              {/* QR */}
              <div className="flex-shrink-0 text-center">
                <img
                  src={qrMap[t.participantId]}
                  alt="QR Code"
                  className="w-32 h-32 mx-auto"
                />
                <p className="text-xs mt-2">Scan at Entry</p>
              </div>

              {/* DETAILS */}
              <div className="flex-1 space-y-2">
                <p><strong>Name:</strong> {t.name}</p>
                <p><strong>Mobile:</strong> {t.mobile}</p>
                <p><strong>Venue:</strong> {t.venueId}</p>
                <p><strong>Pass:</strong> {t.passType}</p>
                <p><strong>Guests:</strong> {t.numberOfPeople}</p>
                <p>
                  <strong>Status:</strong>{" "}
                  {t.isUsed ? "Checked In" : "Not Used"}
                </p>

                <Link
                  to={`/ticket/${t.participantId}`}
                  className="inline-block mt-3 text-blue-600 underline"
                >
                  View Full Ticket
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
