import React from 'react'
import { useState, useEffect ,useRef } from "react";
import BTN from "./BTN";
import { useLocation } from "react-router-dom";

const ResultQuiz = () => {
  const effectRan = useRef(false)
    const location = useLocation();
    const [trueAnswers, setTrueAnswers] = useState(0);
    useEffect(() => {
    if (effectRan.current === true || location.state) {
      console.log(location.state);
      if (location.state) {
        if (location.state.trueAnswers)
          setTrueAnswers(location.state.trueAnswers);
      }
    }}, [location.state])

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
            <span className="final-score">{trueAnswers}</span>
            <span className="total-score">/10</span>
          </div>
          <BTN
            li="" 
            data="Go to Home"
          />
        </section>
  )
}

export default ResultQuiz