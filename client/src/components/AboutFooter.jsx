import { Link } from "react-router-dom";

const AboutFooter = () => {
  return (
    <footer className="relative mt-24">

      {/* top glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-700 opacity-95" />

      <div className="relative max-w-7xl mx-auto px-6 py-20 text-white">

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-12">

          {/* BRAND */}
          <div>
            <h2 className="text-3xl font-bold mb-4">
              🏠 Real Estate
            </h2>

            <p className="text-white/80 leading-relaxed">
              Discover premium properties with our next-generation real estate
              platform. Buy, rent, and invest with confidence.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>

            <ul className="space-y-2 text-white/80">
              <li className="hover:text-white transition cursor-pointer">
                <Link to="/">Home</Link>
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Buy Property
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Rent Property
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Contact
              </li>
            </ul>
          </div>

          {/* STATS */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Platform Stats</h3>

            <div className="space-y-3 text-white/90">
              <p>✅ 10,000+ Happy Users</p>
              <p>🏠 5,000+ Properties</p>
              <p>⭐ 99% Satisfaction</p>
            </div>
          </div>
        </div>

        {/* divider */}
        <div className="border-t border-white/20 mt-12 pt-6 text-center text-white/70">
          © {new Date().getFullYear()} Real Estate Platform — All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default AboutFooter;
