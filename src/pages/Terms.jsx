export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>
      <p className="text-sm text-gray-500 mb-6">Last Updated: 18/12/2025</p>

      <h2 className="font-semibold mt-4">Entry & Pass Validity</h2>
      <ul className="list-disc ml-6">
        <li>Entry allowed only after QR code verification.</li>
        <li>Pass delivered digitally to registered contact.</li>
        <li>Each pass is valid for one person unless stated.</li>
        <li>QR codes are non-transferable.</li>
        <li>Duplicate or tampered passes will be rejected.</li>
      </ul>

      <h2 className="font-semibold mt-4">Exit & Re-Entry Policy</h2>
      <ul className="list-disc ml-6">
        <li>Guests must inform staff before exiting.</li>
        <li>Re-entry allowed only after system verification.</li>
        <li>Unauthorized exit cancels re-entry rights.</li>
      </ul>

      <h2 className="font-semibold mt-4">Conduct & Liability</h2>
      <ul className="list-disc ml-6">
        <li>Misconduct may lead to removal without refund.</li>
        <li>Damage to property attracts legal action.</li>
        <li>Organizer is not responsible for personal belongings.</li>
      </ul>

      <p className="mt-6">
        By entering the event, you accept all terms listed above.
      </p>
    </div>
  );
}
