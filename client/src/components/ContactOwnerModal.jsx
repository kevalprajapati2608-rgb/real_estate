import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const ContactOwnerModal = ({ listingId, onClose }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 10);
  }, []);

  const handleSend = async () => {
    if (!message.trim()) return alert("Please write message");

    try {
      setSending(true);

   await new Promise((resolve) => setTimeout(resolve, 800));


      setSuccess(true);
      setSending(false);

      // auto close after 2s
      setTimeout(onClose, 2000);
    } catch (err) {
      console.error(err);
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        className={`bg-white text-gray-800 rounded-3xl p-8 w-full max-w-md transform transition-all duration-300 shadow-2xl
        ${show ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-10"}`}
      >
        {/* ✅ SUCCESS VIEW */}
        {success ? (
          <div className="text-center py-10">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-green-600">
              Message Sent Successfully!
            </h2>
            <p className="text-gray-500 mt-2">
              Owner will contact you soon.
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Contact Owner
            </h2>

            <textarea
              className="w-full border border-gray-300 p-3 rounded-xl mb-4 
              focus:ring-2 focus:ring-indigo-500 outline-none text-gray-800"
              placeholder="Write your message to owner..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <div className="flex gap-3">
              <button
                onClick={handleSend}
                disabled={sending}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl hover:scale-105 transition font-semibold disabled:opacity-60"
              >
                {sending ? "Sending..." : "Send Message"}
              </button>

              <button
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-100 transition"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactOwnerModal;
