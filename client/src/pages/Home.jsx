import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ImageSlider from "../components/ImageSlider";
import AboutFooter from "../components/AboutFooter";


const Home = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);
  const [filters, setFilters] = useState({
    searchTerm: "",
    type: "all",
    minPrice: "",
    maxPrice: "",
    sort: "createdAt",
    order: "desc",
  });

  
  
  useEffect(() => {
    const fetchWishlist = async () => {
  try {
    const res = await fetch("/api/user/wishlist", {
      credentials: "include",
    });

    if (!res.ok) return;

    const data = await res.json();
    const ids = data.map((item) => item._id || item);

    setWishlist(ids);

  } catch (error) {
    console.log("Wishlist fetch error:", error);
  }
};

    const fetchListings = async () => {
      try {
        const urlParams = new URLSearchParams(location.search);

        const queryParams = new URLSearchParams();

        const searchTerm = urlParams.get("searchTerm");
        if (searchTerm) queryParams.append("searchTerm", searchTerm);

        if (filters.type !== "all") queryParams.append("type", filters.type);

        if (filters.minPrice) queryParams.append("minPrice", filters.minPrice);

        if (filters.maxPrice) queryParams.append("maxPrice", filters.maxPrice);

        queryParams.append("sort", filters.sort);
        queryParams.append("order", filters.order);

        const res = await fetch(`/api/listing?${queryParams.toString()}`);
        const data = await res.json();

        setListings(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchListings();
    fetchWishlist();
  }, [location.search, filters]);

  return (
    <div className="min-h-screen p-6">
      {/* HERO */}
      <div className="h-[400px] rounded-3xl overflow-hidden mb-12 shadow-xl relative">
        <img
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-4xl font-bold">
          Find Your Dream Home
        </div>
      </div>

      {/* FILTER — PREMIUM */}
<div className="relative mb-12">

  {/* glass background */}
  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-2xl rounded-3xl"></div>

  <div className="relative backdrop-blur-xl bg-white/70 border border-white/40 shadow-2xl rounded-3xl p-6 grid md:grid-cols-4 gap-5">

    {/* TYPE */}
    <div className="flex flex-col">
      <label className="text-sm font-semibold text-gray-600 mb-1">
        Property Type
      </label>
      <select
        value={filters.type}
        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        className="border border-gray-200 bg-white/80 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
      >
        <option value="all">All</option>
        <option value="rent">Rent</option>
        <option value="sale">Sale</option>
      </select>
    </div>

    {/* MIN PRICE */}
    <div className="flex flex-col">
      <label className="text-sm font-semibold text-gray-600 mb-1">
        Min Price
      </label>
      <input
        type="number"
        placeholder="₹ 0"
        value={filters.minPrice}
        onChange={(e) =>
          setFilters({ ...filters, minPrice: e.target.value })
        }
        className="border border-gray-200 bg-white/80 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
      />
    </div>

    {/* MAX PRICE */}
    <div className="flex flex-col">
      <label className="text-sm font-semibold text-gray-600 mb-1">
        Max Price
      </label>
      <input
        type="number"
        placeholder="₹ 10,00,000"
        value={filters.maxPrice}
        onChange={(e) =>
          setFilters({ ...filters, maxPrice: e.target.value })
        }
        className="border border-gray-200 bg-white/80 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
      />
    </div>

    {/* SORT */}
    <div className="flex flex-col">
      <label className="text-sm font-semibold text-gray-600 mb-1">
        Sort By
      </label>
      <select
        value={filters.sort}
        onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
        className="border border-gray-200 bg-white/80 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
      >
        <option value="createdAt">Newest</option>
        <option value="regularPrice">Price</option>
      </select>
    </div>

  </div>
</div>

      {/* LISTINGS */}
      {/* LISTINGS */}
      {loading ? (
        <p className="text-center text-2xl font-semibold">Loading...</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {listings.map((listing) => (
            <Link
              key={listing._id}
              to={`/listing/${listing._id}`}
              className="group relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-indigo-500/40 transition-all duration-500"
            >
              {/* Image Section */}
              <div className="relative h-72 overflow-hidden">
 <div className="relative h-72 overflow-hidden">
  <ImageSlider images={listing.images} />
</div>
                <button
  onClick={async (e) => {
    e.preventDefault();
    e.stopPropagation();
if (!currentUser) {
      navigate("/sign-in");
      return;
    }
    if (!currentUser) {
      alert("Please sign in to save properties ❤️");
      return;
    }

    const res = await fetch(
      `/api/user/wishlist/${listing._id}`,
      {
        method: "PUT",
        credentials: "include",
      }
    );

     if (res.ok) {
    const updated = await res.json();

    // ✅ normalize ids
    const ids = updated.map((item) => item._id || item);

    setWishlist(ids);
  }
}}
  
  className="absolute top-3 right-3 z-20"
>

                  <FaHeart
                    className={`text-2xl transition ${
                      wishlist.includes(listing._id)
                        ? "text-red-500"
                        : "text-white"
                    }`}
                  />
                </button>

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                {/* SALE / RENT Ribbon */}
                <span
                  className={`absolute top-4 left-4 px-4 py-1 text-sm font-semibold rounded-full shadow-lg ${
                    listing.sale
                      ? "bg-emerald-500 text-white"
                      : listing.rent
                        ? "bg-blue-500 text-white"
                        : "bg-gray-600 text-white"
                  }`}
                >
                  {listing.sale
                    ? "FOR SALE"
                    : listing.rent
                      ? "FOR RENT"
                      : "PROPERTY"}
                </span>

                {/* Price Badge */}
                <span className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-xl text-lg font-bold shadow-lg">
                  ₹ {listing.regularPrice}
                </span>
              </div>

              {/* Content Section */}
              <div className="bg-white/90 backdrop-blur-md p-6 rounded-b-3xl">
                <h2 className="text-2xl font-bold text-gray-800 group-hover:text-indigo-600 transition">
                  {listing.name}
                </h2>

                <p className="text-gray-500 mt-1 truncate">{listing.address}</p>

                {/* Features */}
                <div className="flex justify-between items-center mt-4 text-gray-600 text-sm">
                  <span className="flex items-center gap-1">
                    🛏 {listing.bedrooms} Beds
                  </span>
                  <span className="flex items-center gap-1">
                    🛁 {listing.bathrooms} Baths
                  </span>
                  <span className="flex items-center gap-1">
                    🚗 {listing.parking ? "Parking" : "No Parking"}
                  </span>
                </div>
              </div>

              {/* Glow Border Effect */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-indigo-500 transition duration-500"></div>
            </Link>
          ))}
        </div>
      )}
      <AboutFooter />
    </div>
  );
};

export default Home;
