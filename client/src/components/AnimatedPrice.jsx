import { useEffect, useRef, useState } from "react";

const AnimatedPrice = ({ value, duration = 1500 }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const startTime = useRef(null);

  useEffect(() => {
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime.current) startTime.current = timestamp;
      const progress = timestamp - startTime.current;

      const percentage = Math.min(progress / duration, 1);

      // Ease-out cubic (smooth premium feel)
      const eased = 1 - Math.pow(1 - percentage, 3);

      setDisplayValue(Math.floor(eased * value));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  const formatted = displayValue.toLocaleString("en-IN");

  return <span>₹ {formatted}</span>;
};

export default AnimatedPrice;
