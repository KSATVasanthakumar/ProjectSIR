import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = ({ language }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // clears auth
    navigate("/login"); // redirect to login
  };

  return (
    <div className="w-full bg-[#BF1A1A] text-white py-4 px-6 shadow flex items-center justify-between">
      <h1 className="text-lg md:text-xl font-semibold">
        {language === "ಕನ್ನಡ"
          ? "ನಗರ ಪೌರರಿಗೆ ಹುಡುಕು ಪೋರ್ಟಲ್"
          : "Citizen Search Portal"}
      </h1>

      {/* Logout icon button */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-1 hover:text-gray-200"
        title="Logout"
      >
        {/* SVG icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l3 3m0 0l-3 3m3-3H3"
          />
        </svg>

        <span className="hidden sm:inline text-sm font-medium">Logout</span>
      </button>
    </div>
  );
};

export default Header;
