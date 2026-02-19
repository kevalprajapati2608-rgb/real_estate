import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

/* 🔥 animated counter hook */
const useCounter = (end, duration = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration]);

  return count;
};

const About = () => {
  const users = useCounter(10000);
  const listings = useCounter(5000);
  const satisfaction = useCounter(99);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-100 to-purple-100 overflow-hidden">

      {/* ================= ULTRA HERO ================= */}
      <div className="relative h-[480px] overflow-hidden">

        {/* background glow */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-500/30 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[120px]" />

        <img
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa"
          className="w-full h-full object-cover"
          alt="about"
        />

        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white text-center px-6 backdrop-blur-[2px]">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-xl">
            Next-Gen Real Estate
          </h1>

          <p className="text-lg md:text-xl text-white/90 max-w-2xl">
            Buy • Rent • Invest with confidence using our premium property platform.
          </p>
        </div>
      </div>

      {/* ================= STORY GLASS ================= */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl p-10 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            🏠 Our Mission
          </h2>

          <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Our platform is built to revolutionize property discovery. We combine
            powerful technology, beautiful design, and secure booking to create
            the most seamless real estate experience possible.
          </p>
        </div>
      </div>

      {/* ================= FEATURES PRO ================= */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-bold text-center mb-14">
          ✨ Why We Are Different
        </h2>

        <div className="grid md:grid-cols-3 gap-10">

          {[
            {
              icon: "⚡",
              title: "Lightning Fast",
              desc: "Advanced search filters help users find properties instantly.",
            },
            {
              icon: "🔒",
              title: "Secure Token Lock",
              desc: "Reserve properties safely with our smart locking system.",
            },
            {
              icon: "💎",
              title: "Premium UI",
              desc: "Ultra modern experience designed for serious buyers.",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="group bg-white p-8 rounded-3xl shadow-xl hover:shadow-indigo-500/40 transition duration-500 hover:-translate-y-2"
            >
              <div className="text-5xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-bold mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>

              {/* glow line */}
              <div className="h-1 w-0 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-500 mt-4 rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* ================= LIVE STATS ================= */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-20 relative overflow-hidden">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),transparent_60%)]" />

        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12 text-center relative z-10">

          <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl">
            <h3 className="text-5xl font-bold">{users.toLocaleString()}+</h3>
            <p className="text-white/80 mt-2">Happy Users</p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl">
            <h3 className="text-5xl font-bold">{listings.toLocaleString()}+</h3>
            <p className="text-white/80 mt-2">Properties Listed</p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl">
            <h3 className="text-5xl font-bold">{satisfaction}%</h3>
            <p className="text-white/80 mt-2">Client Satisfaction</p>
          </div>

        </div>
      </div>

      {/* ================= TEAM ================= */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-14">
          👑 Meet Our Team
        </h2>

        <div className="grid md:grid-cols-3 gap-10">

          {[
            { name: "Jaimin", role: "Founder" },
            { name: "Baldev", role: "Founder" },
            { name: "Mahavir", role: "Founder" },
          ].map((m, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl shadow-xl p-8 text-center hover:-translate-y-2 transition"
            >
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold mb-4">
                {m.name[0]}
              </div>

              <h3 className="text-xl font-bold">{m.name}</h3>
              <p className="text-gray-500">{m.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= CTA ================= */}
      <div className="text-center py-20 px-6">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Explore Properties?
        </h2>

        <Link to="/">
          <button className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white px-10 py-4 rounded-2xl font-bold hover:scale-105 transition shadow-2xl shadow-indigo-500/30">
            🚀 Start Exploring
          </button>
        </Link>
      </div>
    </div>
  );
};

export default About;
