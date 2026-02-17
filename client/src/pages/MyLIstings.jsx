import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const MyListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔹 Fetch listings
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch("/api/listing/my-listings", {
          credentials: "include",
        });
        const data = await res.json();

        if (res.ok) {
  setListings(data);
} else {
  setListings([]);
}

      } catch (error) {
        console.error(error);
        setListings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  // 🔹 Delete listing
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this listing?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/listing/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        setListings((prev) => prev.filter((l) => l._id !== id));
        alert(data.message || "Listing deleted");
      } else {
        alert(data.message || "Delete failed");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

 return (
  <div className="p-6 max-w-4xl mx-auto">
    <h1 className="text-2xl font-bold mb-6">My Listings</h1>

    {listings.length === 0 && (
      <p className="text-gray-500">No listings found.</p>
    )}

    {Array.isArray(listings) &&
      listings.map((listing) => (
        <div key={listing._id} className="border p-4 mb-6 rounded-lg">

          {/* Images Section */}
          <div className="flex gap-2 overflow-x-auto mb-3">
            {listing.images?.map((img, index) => (
              <img
                key={index}
                src={`http://localhost:3000/uploads/${img}`}
                alt="listing"
                className="w-40 h-28 object-cover rounded"
              />
            ))}
          </div>

          <h2 className="text-xl font-semibold">{listing.name}</h2>
          <p className="text-gray-600">{listing.description}</p>

          <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
            <p><strong>Price:</strong> ₹ {listing.regularPrice}</p>
            <p><strong>Discount:</strong> ₹ {listing.discountPrice}</p>
            <p><strong>Bedrooms:</strong> {listing.bedrooms}</p>
            <p><strong>Bathrooms:</strong> {listing.bathrooms}</p>
            <p><strong>Address:</strong> {listing.address}</p>
            <p><strong>Type:</strong> {listing.type}</p>
            <p><strong>Furnished:</strong> {listing.furnished ? "Yes" : "No"}</p>
            <p><strong>Parking:</strong> {listing.parking ? "Yes" : "No"}</p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => navigate(`/update-listing/${listing._id}`)}
              className="text-blue-600 hover:underline"
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(listing._id)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>

        </div>
      ))}
  </div>
);
};


export default MyListings;
