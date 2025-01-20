import React from "react";
import { Link } from "react-router-dom";

const BTN = ({ data, li, hide1 = false, onClick }) => {
  // If `li` is not provided, default to an empty string to avoid errors
  const linkTo = li ? `/${li}` : "/";

  return (
    <div className={`w-full ${hide1 ? "hidden" : ""}`}>
      <Link to={linkTo} onClick={onClick}> 
        <button
          className="start-quiz border-none h-16 bg-[#0c80ef] hover:bg-[#0c81efa5] text-[#fff] mt-4 w-full p-[10px] rounded-[10px] text-[18px] font-medium cursor-pointer transition duration-300 ease-linear"
        >
          {data}
        </button>
      </Link>
    </div>
  );
};

export default BTN;