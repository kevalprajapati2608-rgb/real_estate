import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ListingDetail = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      const res = await fetch(`/api/listing/${id}`);
      const data = await res.json();
      if (res.ok) setListing(data);
    };
    fetchListing();
  }, [id]);

  if (!listing) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* Image Section */}
        <div className="grid md:grid-cols-2 gap-4 p-4">
          {listing.images?.map((img, index) => (
            <img
              key={index}
              src={`http://localhost:3000/uploads/${img}`}
              className="w-full h-80 object-cover rounded-xl"
            />
          ))}
        </div>

        {/* Content */}
        <div className="p-8 space-y-4">

          <h1 className="text-3xl font-bold">{listing.name}</h1>

          <p className="text-gray-600">{listing.address}</p>

          <p className="text-gray-700">{listing.description}</p>

          <div className="flex flex-wrap gap-6 pt-4 text-lg">

            <span>💰 ₹ {listing.regularPrice}</span>
            <span>🛏 {listing.bedrooms} Bedrooms</span>
            <span>🛁 {listing.bathrooms} Bathrooms</span>
            <span>🚗 {listing.parking ? "Parking" : "No Parking"}</span>
            <span>🪑 {listing.furnished ? "Furnished" : "Not Furnished"}</span>
            <span className="uppercase bg-blue-600 text-white px-3 py-1 rounded-lg">
              {listing.type}
            </span>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ListingDetail;
