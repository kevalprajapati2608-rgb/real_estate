import { useState } from "react";

const Ratings = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const submitRating = async () => {
    try {
      const res = await fetch("/api/rating/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: "User",
          type: "rating",
          rating: rating,
          message: `User rated ${rating} stars`,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("⭐ Rating submitted successfully");
      } else {
        alert(data.message);
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-[2px] rounded-3xl bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500">

      <div className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-yellow-100">

        <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
          ⭐ Rate Our Platform
        </h2>

        <div className="flex gap-4 text-5xl justify-center">

          {[1,2,3,4,5].map((star)=>(
            <span
              key={star}
              onClick={()=>setRating(star)}
              onMouseEnter={()=>setHover(star)}
              onMouseLeave={()=>setHover(0)}
              className={`cursor-pointer transition-all duration-300
              hover:scale-150 hover:-rotate-6
              ${star <= (hover || rating)
                ? "text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.9)]"
                : "text-gray-300"}
              `}
            >
              ★
            </span>
          ))}

        </div>

        <p className="text-center mt-6 text-gray-700 text-lg">
          Your Rating:
          <span className="font-bold text-yellow-500 text-xl ml-2">
            {rating}
          </span>
          /5
        </p>

        <button
          onClick={submitRating}
          className="mt-8 w-full bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500
          text-white py-3 rounded-xl font-bold text-lg
          hover:scale-105 hover:shadow-2xl
          transition-all duration-300"
        >
          Submit Rating
        </button>

      </div>
    </div>
  );
};

export default Ratings;