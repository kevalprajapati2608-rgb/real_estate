import { useState } from "react";
import { useSelector } from "react-redux";



const PremiumPaymentModal = ({
  listing,
  onClose,
  onSuccess,
}) => {
  const [cardNumber, setCardNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [flip, setFlip] = useState(false);
  const [step, setStep] = useState(1);
const [email, setEmail] = useState("");
const [otp, setOtp] = useState(["", "", "", "", "", ""]);
const { currentUser } = useSelector((state) => state.user);


  const tokenAmount = Math.round((listing?.regularPrice || 0) * 0.025);

  const formatPrice = (num) =>
    new Intl.NumberFormat("en-IN").format(num);
  //email sendotp
 const sendOtp = async () => {
  const res = await fetch(
    "http://localhost:3000/api/auth/send-verification",
    {
      method: "POST",
      credentials: "include",
    }
  );
  
  const data = await res.json();

  if (res.ok) {
    setStep(2);
  } else {
    alert(data.message);
  }
};
//email verifyotp
const verifyOtp = async () => {
  const res = await fetch("/api/auth/verify-otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      otp: otp.join(""),
    }),
  });

  const data = await res.json();

  if (data.success) {
    setStep(3); // move to payment step
  }
};

  // 🎯 CARD TYPE DETECTOR
  const getCardType = () => {
    if (cardNumber.startsWith("4")) return "VISA";
    if (/^5[1-5]/.test(cardNumber)) return "MASTERCARD";
    if (/^6/.test(cardNumber)) return "RUPAY";
    return "CARD";
  };

  // 💳 HANDLE PAYMENT
const handlePay = async () => {

  if (!listing || !currentUser) {
    alert("User or property data missing");
    return;
  }

    if (listing.isLocked) {
    alert("Property already sold");
    return;
  }

  try {
    setProcessing(true);

    const res = await fetch(
      "http://localhost:3000/api/payment/pay",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          listingId: listing._id,
          userId: currentUser._id,
          amount: tokenAmount,
        }),
      }
    );

    const data = await res.json();

    if (data.success) {
      setSuccess(true);

      setTimeout(() => {
        onSuccess();
      }, 1500);
    } else {
      alert(data.message);
    }

  } catch (error) {
    console.log(error);
  } finally {
    setProcessing(false);
  }
};
const handleOtpChange = (value, index) => {
  if (!/^[0-9]?$/.test(value)) return;

  const newOtp = [...otp];
  newOtp[index] = value;
  setOtp(newOtp);

  if (value && index < 5) {
    const nextInput = document.getElementById(`otp-${index + 1}`);
    if (nextInput) nextInput.focus();
  }
};

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="relative bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 rounded-3xl w-full max-w-md p-6 shadow-[0_0_60px_rgba(99,102,241,0.4)] border border-white/10 overflow-hidden">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white text-xl"
        >
          ✕
        </button>
        {/* email screen */} 
{step === 1 && (
  <div className="min-h-[60vh] flex items-center justify-center px-4">
    <div className="w-full max-w-md bg-slate-400 shadow-2xl rounded-3xl p-8 border border-slate-200">
      
      <h2 className="text-3xl font-bold text-center mb-6">
        Email Verification
      </h2>

      {/* Current User Display */}
      <div className="mb-6 p-4 bg-slate-100 rounded-xl border border-slate-300">
        <span className="text-slate-600 font-medium">
          Current User:
        </span>{" "}
        <span className="text-indigo-700 font-semibold break-all">
          {currentUser?.email || "No user found"}
        </span>
      </div>

      <button
        onClick={sendOtp}
        className="w-full py-3 rounded-xl font-semibold text-white 
        bg-gradient-to-r from-indigo-600 to-purple-600
        hover:from-indigo-700 hover:to-purple-700
        transition-all duration-300 transform hover:scale-[1.02]
        shadow-lg"
      >
        Send OTP
      </button>

      <p className="text-xs text-center text-slate-400 mt-6">
        OTP will be sent to this email address.
      </p>
    </div>
  </div>
)}
        {/* otp screen */} 
       {step === 2 && (
  <div className="flex flex-col items-center justify-center py-10">

    <h2 className="text-2xl font-bold text-gray-800 mb-6">
      Enter OTP
    </h2>

    <div className="flex gap-3 mb-6">
      {otp.map((digit, index) => (
        <input
          key={index}
          id={`otp-${index}`}
          type="text"
          maxLength="1"
          value={digit}
          onChange={(e) => handleOtpChange(e.target.value, index)}
          className="w-12 h-14 text-center text-xl font-bold 
          border-2 border-indigo-500 
          rounded-lg shadow-md
          focus:outline-none focus:ring-2 focus:ring-purple-500
          transition-all duration-200"
        />
      ))}
    </div>

    <button
      onClick={() => verifyOtp(otp.join(""))}
      className="px-6 py-3 bg-indigo-600 text-white 
      rounded-lg font-semibold 
      hover:bg-purple-600 transition-all duration-300"
    >
      Confirm OTP
    </button>

  </div>
)}

{step === 3 && (
  <>
     {success ? (
          <div className="text-center py-16 text-white">
            <div className="text-6xl mb-4 animate-bounce">✅</div>
            <h2 className="text-2xl font-bold mb-2">
              Payment Successful
            </h2>
            <p className="text-white/70">
              Property Locked Successfully
            </p>
          </div>
        ) : (
          <>
            {/* HEADER */}
            <div className="mb-6">
              <h2 className="text-white text-2xl font-bold">
                Secure Payment
              </h2>
              <p className="text-white/60 text-sm">
                Powered by Premium Gateway
              </p>
            </div>


            {/* CARD PREVIEW */}
            <div className="mb-6 perspective">
              <div
                className={`relative w-full h-52 transition-transform duration-500 ${
                  flip ? "rotate-y-180" : ""
                }`}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* FRONT */}
                <div
                  className="absolute inset-0 rounded-2xl p-6 text-white bg-gradient-to-br from-indigo-500 to-purple-600"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="flex justify-between">
                    <span className="text-sm opacity-80">
                      {getCardType()}
                    </span>
                    <span className="text-xs opacity-70">VALID</span>
                  </div>

                  <div className="mt-8 text-xl tracking-widest">
                    {cardNumber || "#### #### #### ####"}
                  </div>

                  <div className="flex justify-between mt-6 text-sm">
                    <span>{name || "CARD HOLDER"}</span>
                    <span>{expiry || "MM/YY"}</span>
                  </div>
                </div>

                {/* BACK */}
                <div
                  className="absolute inset-0 rounded-2xl p-6 bg-gradient-to-br from-gray-800 to-gray-900 text-white"
                  style={{
                    transform: "rotateY(180deg)",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <div className="bg-black h-10 w-full mb-6 rounded"></div>
                  <div className="text-right text-lg">
                    CVV: {cvv || "***"}
                  </div>
                </div>
              </div>
            </div>

            {/* TOKEN */}
            <div className="bg-white/10 rounded-xl p-4 mb-6 text-white border border-white/10">
              <p className="text-sm opacity-70">Token Amount</p>
              <p className="text-2xl font-bold">
                ₹ {formatPrice(tokenAmount)}
              </p>
            </div>

            {/* FORM */}
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Card Number"
                value={cardNumber}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, "");
                  value = value.replace(/(.{4})/g, "$1 ").trim();
                  setCardNumber(value);
                }}
                className="w-full p-3 rounded-xl bg-white/95 text-black outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <input
                type="text"
                placeholder="Card Holder Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded-xl bg-white/95 text-black outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  className="w-1/2 p-3 rounded-xl bg-white/95 text-black outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <input
                  type="password"
                  placeholder="CVV"
                  value={cvv}
                  onFocus={() => setFlip(true)}
                  onBlur={() => setFlip(false)}
                  onChange={(e) => setCvv(e.target.value)}
                  className="w-1/2 p-3 rounded-xl bg-white/95 text-black outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* PAY BUTTON */}
          <button
  onClick={handlePay}
  disabled={processing}
  className={`w-full mt-6 py-4 rounded-xl font-bold text-white
  transition-all duration-300 shadow-lg
  ${
    processing
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-gradient-to-r from-emerald-500 to-green-600 hover:scale-105 active:scale-95"
  }`}
>
  {processing ? "Processing Payment..." : "✅ Confirm Payment"}
</button>
            <p className="text-center text-xs text-white/50 mt-4">
              🔐 256-bit SSL secured payment 
            </p>
          </>
        )}
  </>
)}
       
      </div>
    </div>
  );
};

export default PremiumPaymentModal;