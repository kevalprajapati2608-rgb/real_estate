import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FullscreenGallery from "../components/FullscreenGallery";
import AnimatedPrice from "../components/AnimatedPrice";
import ContactOwnerModal from "../components/ContactOwnerModal";
import PremiumPaymentModal from "../components/PremiumPaymentModal";


const ListingDetail = () => {
  const { id } = useParams();

  const [listing, setListing] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  // ✅ FETCH LISTING
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await fetch(`/api/listing/${id}`);
        const data = await res.json();
        setListing(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchListing();
  }, [id]);

  // ✅ LOADING GUARD
  if (!listing) {
    return (
      <div className="h-screen flex items-center justify-center text-3xl font-bold">
        Loading...
      </div>
    );
  }

  // ✅ CALCULATIONS (must be AFTER listing check)
  const tokenAmount = Math.round((listing.regularPrice || 0) * 0.025);

  const formatPrice = (num) =>
    new Intl.NumberFormat("en-IN").format(num);



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-indigo-100 py-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* ================= HERO SECTION ================= */}
        <div className="relative rounded-3xl overflow-hidden">

          {/* Main Image */}
          <img
            src={`http://localhost:3000/uploads/${listing.images?.[activeIndex]}`}
            className="w-full h-[550px] object-cover cursor-pointer transition duration-500"
            onClick={() => setShowGallery(true)}
          />
          {isLocked && (
  <div className="absolute top-6 right-6 bg-red-600 text-white px-4 py-2 rounded-full font-bold shadow-xl animate-pulse">
    🔒 LOCKED
  </div>
)}


          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

          {/* View All Button */}
          <div
            onClick={() => setShowGallery(true)}
            className="absolute bottom-6 right-6 bg-black/60 text-white px-5 py-3 rounded-xl cursor-pointer hover:bg-black transition"
          >
            View All Photos
          </div>

          {/* SALE / RENT Badge */}
          <span
            className={`absolute top-6 left-6 px-6 py-2 text-sm font-semibold rounded-full shadow-lg ${
              listing.sale
                ? "bg-emerald-500"
                : listing.rent
                ? "bg-blue-500"
                : "bg-gray-600"
            } text-white`}
          >
            {listing.sale
              ? "FOR SALE"
              : listing.rent
              ? "FOR RENT"
              : "PROPERTY"}
          </span>

          {/* Price Card */}
          <div className="absolute bottom-6 left-6 bg-white/20 backdrop-blur-xl px-8 py-4 rounded-2xl text-white text-3xl font-bold shadow-2xl">
           <AnimatedPrice value={listing.regularPrice} />
          

          </div>
        </div>

        {/* Fullscreen Gallery */}
        {showGallery && (
          <FullscreenGallery
            images={listing.images}
            onClose={() => setShowGallery(false)}
          />
        )}

        {/* ================= THUMBNAILS ================= */}
        <div className="flex gap-4 mt-6 overflow-x-auto">
          {listing.images?.map((img, index) => (
            <img
              key={index}
              src={`http://localhost:3000/uploads/${img}`}
              onClick={() => setActiveIndex(index)}
              className={`w-36 h-24 object-cover rounded-xl cursor-pointer transition-all duration-300 ${
                activeIndex === index
                  ? "ring-4 ring-indigo-500 scale-105"
                  : "opacity-70 hover:opacity-100"
              }`}
            />
          ))}
        </div>

        {/* ================= DETAILS ================= */}
        <div className="mt-14 grid md:grid-cols-3 gap-12">

          {/* LEFT */}
          <div className="md:col-span-2 space-y-6">

            <h1 className="text-4xl font-bold text-gray-800">
              {listing.name}
            </h1>

            <p className="text-gray-600 text-lg">
              {listing.description}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-gray-700 text-lg mt-8">
              <div className="bg-white p-5 rounded-2xl shadow-md text-center">
                🛏 <p className="font-bold">{listing.bedrooms}</p>
                Bedrooms
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-md text-center">
                🛁 <p className="font-bold">{listing.bathrooms}</p>
                Bathrooms
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-md text-center">
                🚗 <p className="font-bold">{listing.parking ? "Yes" : "No"}</p>
                Parking
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-md text-center">
                🛋 <p className="font-bold">{listing.furnished ? "Yes" : "No"}</p>
                Furnished
              </div>
            </div>

            <div className="mt-8 bg-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Address</h2>
              <p className="text-gray-600">{listing.address}</p>
            </div>

          </div>

          {/* RIGHT CONTACT CARD */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-10 rounded-3xl shadow-2xl space-y-6 h-fit sticky top-10">

{/* TOKEN AMOUNT CARD */}
<div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20">
  <p className="text-white/80 text-sm">Booking Token (2.5%)</p>

  <p className="text-3xl font-bold">
    ₹ {formatPrice(tokenAmount)}
  </p>

  <p className="text-xs text-white/60 mt-1">
    Pay to reserve this property
  </p>
  <button
  onClick={() => setShowPayment(true)}
  className="w-full mt-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white py-4 rounded-xl font-bold hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-emerald-900/30"
>
  🔒 Pay & Lock Property
</button>


</div>

            <h2 className="text-3xl font-bold">Interested?</h2>

            <p className="text-white/80">
              Contact the owner directly and schedule a visit today.
            </p>

            <button
  onClick={() => setShowContact(true)}
  className="w-full bg-white text-indigo-600 font-semibold py-4 rounded-xl hover:scale-105 transition duration-300"
>
  Contact Now
</button>


            <button className="w-full border border-white py-4 rounded-xl hover:bg-white hover:text-indigo-600 transition duration-300">
              Schedule Visit
            </button>

            {showContact && (
  <ContactOwnerModal
    listingId={listing._id}
    onClose={() => setShowContact(false)}
  />
)}
{showPayment && (
  <PremiumPaymentModal
    listing={listing}
    onClose={() => setShowPayment(false)}
    onSuccess={() => {
      setShowPayment(false);
      setIsLocked(true);
      alert("✅ Property Locked Successfully!");
    }}
  />
)}


          </div>
        </div>
      </div>
    </div>
  );

};
export default ListingDetail;
