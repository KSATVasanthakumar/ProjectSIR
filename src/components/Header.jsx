// Header.js
import React from "react";

const Header = ({ language }) => {
  return (
    <div className="w-full bg-[#BF1A1A] text-white py-4 px-6 shadow">
      <h1 className="text-lg md:text-xl font-semibold">
        {language === "ಕನ್ನಡ"
          ? "ನಗರ ಪೌರರಿಗೆ ಹುಡುಕು ಪೋರ್ಟಲ್"
          : "Citizen Search Portal"}
      </h1>
    </div>
  );
};

export default Header;
