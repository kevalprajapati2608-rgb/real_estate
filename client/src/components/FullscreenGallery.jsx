import { useEffect, useState } from "react";

const FullscreenGallery = ({ images, onClose }) => {
  const [current, setCurrent] = useState(0);

  const nextImage = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrent((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  // Keyboard support
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center z-50">

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-8 text-white text-3xl font-bold hover:scale-110 transition"
      >
        ✕
      </button>

      {/* Main Image */}
      <div className="relative w-full max-w-5xl px-4">

        <img
          src={`http://localhost:3000/uploads/${images[current]}`}
          className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl transition duration-500"
        />

        {/* Left Arrow */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white text-2xl px-4 py-2 rounded-full"
        >
          ◀
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white text-2xl px-4 py-2 rounded-full"
        >
          ▶
        </button>
      </div>

      {/* Thumbnail Strip */}
      <div className="flex gap-3 mt-6 overflow-x-auto px-4">
        {images.map((img, index) => (
          <img
            key={index}
            onClick={() => setCurrent(index)}
            src={`http://localhost:3000/uploads/${img}`}
            className={`w-24 h-16 object-cover rounded-lg cursor-pointer transition ${
              current === index
                ? "border-2 border-white scale-105"
                : "opacity-60 hover:opacity-100"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default FullscreenGallery;
