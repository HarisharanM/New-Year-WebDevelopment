import logoImage from "../assets/logo_New.png";

export const loadRazorpay = () => {
  return new Promise((resolve) => {
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
    alert("Razorpay SDK failed to load. Are you online?");
    return;
  }

  const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY;

  if (!razorpayKey) {
    alert("Razorpay key is missing. Check your .env file.");
    return;
  }
  
  console.log("Razorpay Key:", import.meta.env.VITE_RAZORPAY_KEY);


  const options = {
    key: razorpayKey,
    amount: amount * 100,
    currency: "INR",
    name: "New Year’s Eve Celebration 2025 → 2026",
    description: "Grand Countdown Night Entry Pass",
    image: logoImage,
    handler: function (response) {
      console.log("Payment Success:", response);
      onSuccess(response);
    },
    prefill: {
      name: participantData.name || "",
      contact: participantData.mobile || "",
    },
    notes: {
      groupSize: participantData.groupSize || 1,
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

