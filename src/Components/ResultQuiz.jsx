import BTN from "./BTN";
import { useLocation } from "react-router-dom";

const ResultQuiz = () => {
  const location = useLocation();

  return (
    <section className="end_Quiz">
      <div className="title">
        <h1 className="font-bold text-white text-[40px] mb-[50px] text-center">
          Quiz App
        </h1>
      </div>
      <div className="result text-white text-[25px] font-medium mb-[80px] text-center">
        <div className="result_text text-[#a2aace] text-base font-medium">
          Your score:
        </div>
        <span className="final-score">{location?.state?.trueAnswers || 0}</span>
        <span className="total-score">/10</span>
      </div>
      <BTN li="" data="Go to Home" />
    </section>
  );
};

export default ResultQuiz;
