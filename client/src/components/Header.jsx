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
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Real</span>
            <span className="text-slate-700"> Estate</span>
          </h1>
        </Link>
        <form
  onSubmit={(e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?searchTerm=${searchTerm}`);
    }
  }}
  className="bg-white px-4 py-2 rounded-full flex items-center shadow-md transition-all duration-300 focus-within:shadow-xl focus-within:scale-105"
>
  <input
    type="text"
    placeholder="Search properties..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="bg-transparent focus:outline-none w-24 sm:w-64 transition-all duration-300"
  />
  <button type="submit">
    <FaSearch className="text-slate-600 hover:text-blue-600 transition" />
  </button>
</form>


        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline 
            text-slate-700 hover:underline">
              About
            </li>
          </Link>

          <Link to="/profile">
          { currentUser ? (
            <img src={currentUser.avatar} alt="avatar" className="rounded-full h-7 w-7 object-cover"/>
          ): (
            <li className=" text-slate-700 hover:underline">Sign In</li>

          )}
          
          </Link>

         {/*  <Link to="/sign-in">
          </Link> */}
        </ul>
      </div>
    </header>
  );
};

export default Header;
