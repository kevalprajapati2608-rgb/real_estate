import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  return (
  <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/20 shadow-lg">
    <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4">
      
      {/* Logo */}
      <Link to="/" className="group">
        <h1 className="text-4xl font-extrabold tracking-tight transition-all duration-300 group-hover:scale-105">
          <span className="text-indigo-600 drop-shadow-md">Real</span>{" "}
          <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 bg-clip-text text-transparent">
            Estate
          </span>
        </h1>
      </Link>

      {/* Search Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (searchTerm.trim() === "") return;
          navigate(`/?searchTerm=${searchTerm}`);
        }}
        className="hidden md:flex items-center bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-md border border-slate-200 focus-within:ring-2 focus-within:ring-indigo-400 transition-all duration-300"
      >
        <input
          type="text"
          placeholder="Search luxury properties..."
          className="bg-transparent focus:outline-none w-48 lg:w-72 text-sm placeholder-slate-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FaSearch className="text-slate-600 cursor-pointer hover:text-indigo-600 transition-colors duration-300" />
      </form>

      {/* Navigation */}
      <ul className="flex items-center gap-6 text-sm font-medium">
        
        <Link to="/">
          <li className="hidden sm:inline relative text-slate-700 hover:text-indigo-600 transition duration-300 group">
            Home
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
          </li>
        </Link>

        <Link to="/about">
          <li className="hidden sm:inline relative text-slate-700 hover:text-indigo-600 transition duration-300 group">
            About
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
          </li>
        </Link>

        <Link to="/profile">
          {currentUser ? (
            <img
              src={currentUser.avatar}
              alt="avatar"
              className="h-9 w-9 rounded-full object-cover border-2 border-indigo-500 shadow-md hover:scale-110 hover:shadow-lg transition duration-300"
            />
          ) : (
            <li className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition duration-300 shadow-md hover:shadow-lg">
              Sign In
            </li>
          )}
        </Link>
      </ul>
    </div>
  </header>
);};

export default Header;
