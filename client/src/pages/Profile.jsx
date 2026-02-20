import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../redux/user/userSlice.js";
import { useDispatch } from "react-redux";
import { Link, UNSAFE_RemixErrorBoundary } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const fileRef = useRef(null);

  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);

  console.log(formData);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await fetch("/api/user/wishlist", {
          credentials: "include",
        });

        if (!res.ok) return;

        const data = await res.json();

        console.log("WISHLIST DATA:", data);

        setWishlist(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchWishlist();
  }, []);

  console.log("WISHLIST DATA:", wishlist);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success == false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success == false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch(`/api/auth/signout`);
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutFailure(error.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);

      if (!currentUser?._id) {
        setShowListingsError("User ID not found");
        return;
      }

      const res = await fetch(
        `http://localhost:3000/api/user/listings/${currentUser._id}`,
        {
          credentials: "include",
        },
      );

      if (!res.ok) {
        setShowListingsError("Failed to fetch listings");
        return;
      }

      const data = await res.json();

      if (!Array.isArray(data) || data.length === 0) {
        setShowListingsError("No listings found");
        setUserListings([]);
        return;
      }

      setUserListings(data); // ✅ set array of listings
    } catch (error) {
      console.error(error);
      setShowListingsError("Something went wrong while fetching listings");
    }
  };


  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-purple-100 py-10 px-4">

    {/* PAGE WRAPPER */}
    <div className="max-w-5xl mx-auto space-y-8">

      {/* TITLE */}
      <h1 className="text-4xl font-bold text-center text-gray-800">
        👤 My Profile
      </h1>

      {/* ================= MAIN PROFILE CARD ================= */}
      <form
        onSubmit={handleSubmit}
        className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 p-8 space-y-8"
      >

        {/* AVATAR + BASIC INFO */}
        <div className="flex flex-col md:flex-row items-center gap-8">

          {/* AVATAR */}
          <div className="flex flex-col items-center gap-3">
            <input type="file" accept="image/*" ref={fileRef} hidden />

            <img
              onClick={() => fileRef.current.click()}
              src={currentUser.avatar}
              alt="avatar"
              className="rounded-full h-32 w-32 object-cover ring-4 ring-indigo-500 shadow-xl hover:scale-105 transition duration-300 cursor-pointer"
            />
            <p className="text-sm text-gray-500">Click to change photo</p>
          </div>

          {/* INPUTS */}
          <div className="flex-1 w-full space-y-4">

            <input
              type="text"
              placeholder="username"
              id="username"
              defaultValue={currentUser.username}
              onChange={handleChange}
              className="w-full p-4 rounded-xl border border-gray-200 bg-white/80 backdrop-blur focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
            />

            <input
              type="text"
              placeholder="email"
              id="email"
              defaultValue={currentUser.email}
              onChange={handleChange}
              className="w-full p-4 rounded-xl border border-gray-200 bg-white/80 backdrop-blur focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
            />

            <input
              type="password"
              placeholder="password"
              onChange={handleChange}
              id="password"
              className="w-full p-4 rounded-xl border border-gray-200 bg-white/80 backdrop-blur focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
            />

          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="grid sm:grid-cols-2 gap-4">

          <button
            disabled={loading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
          >
            {loading ? "Loading..." : "Update Profile"}
          </button>

          <Link
            to={"/create-listing"}
            className="flex items-center justify-center w-full py-4 rounded-xl border border-indigo-500 text-indigo-600 font-semibold hover:bg-indigo-50 transition"
          >
            ➕ Create Listing
          </Link>

        </div>

        {/* SUCCESS / ERROR */}
        {error && (
          <p className="text-red-600 text-center font-medium">{error}</p>
        )}
        {updateSuccess && (
          <p className="text-green-600 text-center font-semibold">
            ✅ Profile updated successfully
          </p>
        )}

      </form>

      {/* ================= WISHLIST ================= */}
      {wishlist.length > 0 && (
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/40 p-6">
          <h2 className="text-2xl font-bold mb-6">❤️ My Wishlist</h2>

          <div className="grid md:grid-cols-2 gap-5">
            {wishlist.map((listing) => (
              <Link
                key={listing._id}
                to={`/listing/${listing._id}`}
                className="group bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition"
              >
                <img
                  src={`http://localhost:3000/uploads/${listing.images?.[0]}`}
                  className="h-40 w-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800">
                    {listing.name}
                  </h3>
                  <p className="text-indigo-600 font-bold">
                    ₹ {listing.regularPrice}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ================= ACCOUNT ACTIONS ================= */}
      <div className="flex flex-col sm:flex-row gap-4">

        <button
          onClick={handleDeleteUser}
          className="flex-1 py-3 rounded-xl border border-red-400 text-red-600 font-semibold hover:bg-red-50 transition"
        >
          Delete Account
        </button>

        <button
          onClick={handleSignOut}
          className="flex-1 py-3 rounded-xl border border-gray-400 text-gray-700 font-semibold hover:bg-gray-50 transition"
        >
          Sign Out
        </button>

      </div>

      {/* ================= MY LISTINGS ================= */}
      <div className="space-y-4">

        <button
          onClick={handleShowListings}
          className="w-full py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition"
        >
          Show My Listings
        </button>

        {showListingsError && (
          <p className="text-red-600 text-center">{showListingsError}</p>
        )}

        {userListings.length > 0 && (
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/40 p-6">
            <h2 className="text-2xl font-bold mb-4">🏠 My Listings</h2>

            <div className="space-y-4">
              {userListings.map((listing) => (
                <div
                  key={listing._id}
                  className="flex items-center justify-between bg-white rounded-2xl p-4 shadow"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={`http://localhost:3000/uploads/${listing.images[0]}`}
                      className="w-20 h-20 object-cover rounded-xl"
                    />
                    <div>
                      <h3 className="font-semibold">{listing.name}</h3>
                      <p className="text-indigo-600 font-bold">
                        ₹ {listing.regularPrice}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() =>
                        navigate(`/update-listing/${listing._id}`)
                      }
                      className="text-blue-600 font-semibold"
                    >
                      Edit
                    </button>

                    <button className="text-red-600 font-semibold">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  </div>
);

};

export default Profile;
