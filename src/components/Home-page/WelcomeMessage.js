import { useEffect, useState, useRef } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

export default function WelcomeMessage() {
  const [show, setShow] = useState(false);
  const timerRef = useRef(null);
  const hasHovered = useRef(false);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const startTimer = () => {
    clearTimer();
    timerRef.current = setTimeout(() => {
      setShow(false);
    }, 5000);
  };

  useEffect(() => {
    const hasSeen = localStorage.getItem("hasSeenWelcomeMessage");
    if (!hasSeen) {
      setShow(true);
      localStorage.setItem("hasSeenWelcomeMessage", "true");
      startTimer(); // تبدأ العد من أول مرة
    }
  }, []);

  const handleMouseEnter = () => {
    hasHovered.current = true;
    clearTimer();
  };

  const handleMouseLeave = () => {
    startTimer(); // تبدأ العد من جديد بعد الخروج
  };

  const handleClose = () => {
    clearTimer();
    setShow(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 bg-black text-white text-sm sm:text-base px-6 py-4 rounded-2xl shadow-lg z-50 transition-all duration-500 ease-in-out ${
        show
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-10 pointer-events-none"
      }`}
    >
      <div className="relative pr-6">
        <p className="text-center">
          This website uses the <strong>DumbJSON API</strong>, so some features
          may be limited. Thanks for visiting, and I hope you enjoy exploring!
        </p>
        <button
          onClick={handleClose}
          className="absolute top-0 right-0 p-1 text-white hover:text-red-400 transition"
        >
          <CloseOutlinedIcon />
        </button>
      </div>
    </div>
  );
}
