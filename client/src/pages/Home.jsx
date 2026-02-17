import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FaHeart } from "react-icons/fa";


const Home = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
const [wishlist, setWishlist] = useState([]);

  // ✅ Filters state (IMPORTANT)
  const [filters, setFilters] = useState({
    searchTerm: "",
    type: "all",
    minPrice: "",
    maxPrice: "",
    sort: "createdAt",
    order: "desc",
  });

  // ✅ Fetch listings
  useEffect(() => {
  const fetchListings = async () => {
    try {
      const urlParams = new URLSearchParams(location.search);
      const searchTerm = urlParams.get("searchTerm") || "";

      const queryParams = new URLSearchParams();

      if (searchTerm) queryParams.append("searchTerm", searchTerm);
      if (filters.type !== "all") queryParams.append("type", filters.type);
      if (filters.minPrice) queryParams.append("minPrice", filters.minPrice);
      if (filters.maxPrice) queryParams.append("maxPrice", filters.maxPrice);
      if (filters.sort) queryParams.append("sort", filters.sort);
      if (filters.order) queryParams.append("order", filters.order);

      const res = await fetch(`/api/listing?${queryParams.toString()}`);
      const data = await res.json();

      console.log(data);

      setListings(Array.isArray(data) ? data : data.listings || []);
      setLoading(false);

    } catch (error) {
      console.error("Fetch error:", error);
      setLoading(false);
    }
  };

  fetchListings();
}, [location.search, filters]);


  return (
    <div className="min-h-screen p-6">
      {/* HERO SECTION */}
      <div className=" relative h-[400px] rounded-3xl overflow-hidden mb-12 shadow-xl">
        <img
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Find Your Dream Home
          </h1>
          <p className="text-lg md:text-xl">Buy • Rent • Invest</p>
        </div>
      </div>

      {/* FILTER SECTION */}
      <div className="bg-color p-6 rounded-2xl shadow-lg mb-10 grid md:grid-cols-5 gap-4">
        <select
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          className="border p-3 rounded-lg"
        >
          <option value="all">All Types</option>
          <option value="rent">Rent</option>
          <option value="sale">Sale</option>
        </select>

        <input
          type="number"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
          className="border p-3 rounded-lg"
        />

        <input
          type="number"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
          className="border p-3 rounded-lg"
        />

        <select
          value={filters.sort}
          onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
          className="border p-3 rounded-lg"
        >
          <option value="createdAt">Newest</option>
          <option value="regularPrice">Price</option>
        </select>
      </div>

      {/* LISTINGS GRID */}
      {loading ? (
        <p className="text-center text-xl">Loading...</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {listings.map((listing) => (
            <Link
              to={`/listing/${listing._id}`}
              key={listing._id}
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={`http://localhost:3000/uploads/${listing.images[0]}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <span className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 text-sm rounded-full">
                  {listing.type}
                </span>
                <span className="absolute bottom-3 right-3 bg-black text-white px-3 py-1 text-sm rounded-lg">
                  ₹ {listing.regularPrice}
                </span>
              </div>
              <button
  onClick={async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const res = await fetch(`/api/user/wishlist/${listing._id}`, {
      method: "PUT",
      credentials: "include",
    });

    if (res.ok) {
      if (wishlist.includes(listing._id)) {
        setWishlist(wishlist.filter(id => id !== listing._id));
      } else {
        setWishlist([...wishlist, listing._id]);
      }
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



              <div className="p-5 space-y-3">
                <h2 className="text-xl font-semibold">{listing.name}</h2>

                <div className="flex justify-between text-sm text-gray-600">
                  <span>🛏 {listing.bedrooms}</span>
                  <span>🛁 {listing.bathrooms}</span>
                  <span>🚗 {listing.parking ? "Yes" : "No"}</span>
                  
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
