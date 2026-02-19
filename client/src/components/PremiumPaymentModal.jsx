import { useState } from "react";

const PremiumPaymentModal = ({ listing, onClose, onSuccess }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [flip, setFlip] = useState(false);

  const tokenAmount = Math.round((listing?.regularPrice || 0) * 0.025);

  const formatPrice = (num) =>
    new Intl.NumberFormat("en-IN").format(num);

  // 🎯 CARD TYPE DETECTOR
  const getCardType = () => {
    if (cardNumber.startsWith("4")) return "VISA";
    if (/^5[1-5]/.test(cardNumber)) return "MASTERCARD";
    if (/^6/.test(cardNumber)) return "RUPAY";
    return "CARD";
  };

const handlePayment = () => {
  setLoading(true);

  setTimeout(() => {
    setLoading(false);
    onSuccess(); // ✅ THIS IS THE KEY FIX
  }, 1500);
};




  // 💳 HANDLE PAYMENT
  const handlePay = () => {
    if (cardNumber.replace(/\s/g, "").length < 16) {
      alert("Enter valid card number");
      return;
    }

    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);


      setTimeout(() => {
        onSuccess();
      }, 1800);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="relative bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 rounded-3xl w-full max-w-md p-6 shadow-[0_0_60px_rgba(99,102,241,0.4)] border border-white/10 overflow-hidden">

        {/* ✕ CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white text-xl"
        >
          ✕
        </button>

        {/* ================= SUCCESS SCREEN ================= */}
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
            {/* ================= HEADER ================= */}
            <div className="mb-6">
              <h2 className="text-white text-2xl font-bold">
                Secure Payment
              </h2>
              <p className="text-white/60 text-sm">
                Powered by Premium Gateway
              </p>
            </div>

            {/* ================= CARD PREVIEW ================= */}
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

            {/* ================= TOKEN ================= */}
            <div className="bg-white/10 rounded-xl p-4 mb-6 text-white border border-white/10">
              <p className="text-sm opacity-70">Token Amount</p>
              <p className="text-2xl font-bold">
                ₹ {formatPrice(tokenAmount)}
              </p>
            </div>

            {/* ================= FORM ================= */}
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

            {/* ================= PAY BUTTON ================= */}
            <button
              onClick={handlePay}
              disabled={processing}
              className="w-full mt-6 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-500 to-green-600 hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-emerald-900/40"
            >
              {processing
                ? "Processing Secure Payment..."
                : "🔒 Pay & Lock Property"}
            </button>

            <p className="text-center text-xs text-white/50 mt-4">
              🔐 256-bit SSL secured payment (demo)
            </p>
          </>
        )}
      </div>
      

    </div>
  );
};

export default PremiumPaymentModal;
