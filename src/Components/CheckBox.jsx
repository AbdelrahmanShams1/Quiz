import React from "react";
import { FaCheck } from "react-icons/fa";

const CheckBox = () => {
  return (
    <div className="checkBox  w-5 h-5 rounded-full border-2 border-[#3f4868] flex items-center justify-center transition-all duration-300">
      <FaCheck className="text-white text-[10px] transition-all duration-300" />
    </div>
  );
};

export default CheckBox;
