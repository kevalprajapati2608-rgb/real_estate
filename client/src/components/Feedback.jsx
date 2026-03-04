import { useState } from "react";

const Feedback = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/feedback/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("Feedback submitted successfully");
      setMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-[2px] rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">

      <div className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/40">

        <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          💬 Feedback
        </h2>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us how we can improve..."
          className="w-full p-4 rounded-xl border border-gray-300
          focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400
          outline-none resize-none
          transition-all duration-300
          shadow-sm focus:shadow-lg"
          rows="4"
        />

        <button
          onClick={handleSubmit}
          className="mt-6 w-full py-3 rounded-xl font-bold text-lg text-white
          bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
          hover:scale-105 hover:shadow-2xl
          transition-all duration-300"
        >
          Submit Feedback
        </button>

      </div>

    </div>
  );
};

export default Feedback;