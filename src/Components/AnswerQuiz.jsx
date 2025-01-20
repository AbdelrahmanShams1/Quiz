import React from "react";
import CheckBox from "./CheckBox";

const AnswerQuiz = ({ answer, colorBorder = false, falseAnswer = false, correct = false, onClick, select = false }) => {
  const borderColor = correct
    ? "border-[#0cef2a]"
    : falseAnswer
    ? "border-[#fc3939]" 
    : "border-[#3f4868]"; 

  return (
    <div
      className={`answer group w-full text-white h-[60px] mb-[20px] cursor-pointer flex items-center justify-between p-[20px] rounded-[10px] border-[3px] border-solid ${borderColor} transition duration-300 ease-linear`}
      onClick={onClick}
    >
      <div className="text font-medium">{answer}</div>
      <div
        className={`${
          select ? "bg-[#0c80ef] border-[#0c80ef]" : ""
        } group-hover:bg-[#0c80ef] group-hover:border-[#0c80ef] transition duration-300 ease-linear rounded-full`}
      >
        <CheckBox />
      </div>
    </div>
  );
};

export default AnswerQuiz;
