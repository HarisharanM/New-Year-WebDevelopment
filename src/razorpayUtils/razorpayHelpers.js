import logoImage from "../assets/logo_New.png";

export const loadRazorpay = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const openRazorpay = async (
  amount,
  participantData,
  onSuccess,
  onFailure
) => {
  const loaded = await loadRazorpay();
  if (!loaded) {
    alert("Razorpay SDK failed to load");
    return;
  }

  const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY;

  if (!razorpayKey) {
    alert("❌ Razorpay key missing. Check .env / Netlify env vars.");
    return;
  }

  const options = {
    key: razorpayKey,
    amount: amount * 100, // ✅ MUST be paise
    currency: "INR",
    name: "New Year’s Eve Celebration 2025 → 2026",
    description: "Entry Pass",
    image: logoImage,

    handler: (response) => {
      console.log("✅ Payment Success:", response);
      onSuccess(response);
    },

    prefill: {
      name: participantData.name,
      contact: participantData.mobile,
    },

    notes: {
      venue: participantData.venueId,
    },

    theme: {
      color: "#0B132B",
    },
  };

  try {
    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error("Razorpay error:", err);
    onFailure(err);
  }
};
