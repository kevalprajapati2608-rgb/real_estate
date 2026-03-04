import { Link } from "react-router-dom";

const ListingCard = ({ listing }) => {
  return (
    <div className="border p-4 rounded shadow">
      {listing.isLocked && (
  <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded">
    SOLD
  </div>
)}
      {/* 🔹 Listing Name */}
      <h2 className="text-xl font-bold">
        {listing.name}
      </h2>

      {/* 🔹 Address */}
      <p className="text-gray-600">
        {listing.address}
      </p>

      {/* 🔹 Price */}
      <p className="text-green-600 font-semibold">
        ₹ {listing.regularPrice}
      </p>

      {/* 🔹 EDIT BUTTON */}
      <Link to={`/update-listing/${listing._id}`}>
        <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded">
          Edit
        </button>
      </Link>
      {!listing.isLocked && (
  <button className="bg-indigo-600 text-white px-4 py-2 rounded">
    Buy Property
  </button>
)}
    </div>
  );
};

export default ListingCard;
