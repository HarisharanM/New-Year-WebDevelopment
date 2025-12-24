import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { getParticipantById } from "../firebase/helpers/firestoreHelpers";

export default function TicketPage() {
  const { participantId } = useParams();
  const [participant, setParticipant] = useState(null);
  const [qrUrl, setQrUrl] = useState("");

  useEffect(() => {
    const loadTicket = async () => {
      const data = await getParticipantById(participantId);
      if (!data) return;

      setParticipant(data);
      const qr = await QRCode.toDataURL(participantId);
      setQrUrl(qr);
    };

    loadTicket();
  }, [participantId]);

  if (!participant) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading your ticket...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <div className="bg-white text-black rounded-xl p-6 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-2">
          🎉 Your New Year’s Eve Ticket
        </h1>

        <img
          src={qrUrl}
          alt="QR Code"
          className="mx-auto my-4 w-40 h-40"
        />

        <div className="text-left space-y-2">
          <p><strong>Name:</strong> {participant.name}</p>
          <p><strong>Mobile:</strong> {participant.mobile}</p>
          <p><strong>Venue:</strong> {participant.venueId}</p>
          <p><strong>Pass Type:</strong> {participant.passType}</p>
          <p><strong>Guests:</strong> {participant.numberOfPeople}</p>
          <p>
            <strong>Payment:</strong>{" "}
            {participant.amountPaid > 0 ? "Paid" : "Pending"}
          </p>
          <p className="text-xs break-all mt-2">
            <strong>Pass ID:</strong> {participant.participantId}
          </p>
        </div>

        <p className="mt-4 text-sm text-gray-600">
          Please show this QR code at the venue entrance.
        </p>
      </div>
    </div>
  );
}
