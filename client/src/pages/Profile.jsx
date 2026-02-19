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

      const res = await fetch(`http://localhost:3000/api/user/listings/${currentUser._id}`, {
  credentials: "include",
});

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
    
    <div className="p-3 max-w-lg mx-auto ">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className=" flex flex-col gap-4">
       {wishlist.length > 0 && (
  <div className="mt-8">
    <h2 className="text-xl font-semibold mb-4">My Wishlist</h2>

    <div className="grid md:grid-cols-2 gap-4">
      {wishlist.map((listing) => (
        <Link
  key={listing._id}
  to={`/listing/${listing._id}`}
  className="border p-3 rounded-lg shadow hover:shadow-lg transition"
>
          <img
            src={`http://localhost:3000/uploads/${listing.images?.[0]}`}
            className="h-32 w-full object-cover rounded"
          />
          <h3 className="mt-2 font-semibold">{listing.name}</h3>
          <p className="text-sm text-gray-500">
            ₹ {listing.regularPrice}
          </p>
        </Link>
      ))}
    </div>
  </div>
)}


        <input type="file" accept="image/*" ref={fileRef} hidden />
        <img
          onClick={() => fileRef.current.click()}
          src={currentUser.avatar}
          alt="avatar"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />

        <input
          type="text"
          placeholder="username"
          id="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="text"
          placeholder="email"
          id="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="password"
          placeholder="password"
          onChange={handleChange}
          id="password"
          className="border p-3 rounded-lg"
        />

        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
        >
          {loading ? "Loading..." : "Update"}
        </button>
        <Link
          className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
          to={"/create-listing"}
        >
          Create Listing
        </Link>
      </form>

      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer"
        >
          Delete Account
        </span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
          {" "}
          Sign out
        </span>
      </div>
      <p className="text-red-700 mt-5">{error ? error : ""}</p>
      <p className="text-green-700 mt-5">
        {updateSuccess ? "Profile updated successfully.." : ""}
      </p>

      <button
        onClick={handleShowListings}
        className="text-green-700 rounded-lg w-full "
      >
        Show Listings
      </button>
      <p className="text-red-700 mt-5">
        {showListingsError ? showListingsError : ""}
      </p>
      {userListings.length > 0 && (
        <div className="mt-5">
          <h2 className="text-xl font-semibold mb-3">My Listings</h2>

          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="flex items-center justify-between border p-3 mb-3 rounded"
            >
              <div className="flex items-center gap-3">
                <img
                  src={`http://localhost:3000/uploads/${listing.images[0]}`} // make sure this path matches your backend
                  alt={listing.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold">{listing.name}</h3>
                  <p className="text-sm text-gray-600">
                    ₹ {listing.regularPrice}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                {/* Placeholder Edit */}
               <button
  onClick={() => navigate(`/update-listing/${listing._id}`)}
  className="text-blue-600"
>
  Edit
</button>


                {/* Delete */}
                <button
                  onClick={async () => {
                    const confirmDelete = window.confirm(
                      "Are you sure you want to delete this listing?",
                    );
                    if (!confirmDelete) return;

                    // ✅ Replace this fetch call with the updated one
                    const res = await fetch(
                      `http://localhost:3000/api/listing/delete/${listing._id}`,
                      {
                        method: "DELETE",
                        credentials: "include", // send cookies for auth
                        headers: {
                          "Content-Type": "application/json",
                        },
                      },
                    );

                    const data = await res.json();

                    if (res.ok) {
                      setUserListings((prev) =>
                        prev.filter((l) => l._id !== listing._id),
                      );
                      alert(data.message || "Deleted successfully");
                    } else {
                      alert(data.message || "Failed to delete");
                    }
                  }}
                  className="text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
