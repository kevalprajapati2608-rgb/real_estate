import { useEffect, useState } from "react";

const ImageSlider3D = ({ images }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 3500);

    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) return null;

  const getPosition = (index) => {
    if (index === current) return "center";
    if (index === (current + 1) % images.length) return "right";
    if (
      index ===
      (current - 1 + images.length) % images.length
    )
      return "left";
    return "hidden";
  };

  return (
    <div className="relative h-72 w-full flex items-center justify-center overflow-hidden perspective-[1200px]">
      {images.map((img, index) => {
        const position = getPosition(index);

        return (
          <img
            key={index}
            src={`http://localhost:3000/uploads/${img}`}
            className={`absolute h-full w-full object-cover rounded-3xl transition-all duration-1000 ease-in-out
            ${
              position === "center" &&
              "z-30 scale-100 rotate-y-0 opacity-100 translate-x-0"
            }
            ${
              position === "left" &&
              "z-20 scale-90 -translate-x-1/2 rotate-y-[-35deg] opacity-70"
            }
            ${
              position === "right" &&
              "z-20 scale-90 translate-x-1/2 rotate-y-[35deg] opacity-70"
            }
            ${
              position === "hidden" &&
              "z-0 scale-75 opacity-0"
            }
            `}
            style={{
              transformStyle: "preserve-3d",
            }}
          />
        );
      })}

      {/* Dark cinematic gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-3xl pointer-events-none"></div>
    </div>
  );
};

export default ImageSlider3D;
