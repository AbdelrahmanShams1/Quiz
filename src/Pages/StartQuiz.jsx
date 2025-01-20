import React from 'react'
import Header from '../Components/Header'
import QuizSettings from '../Components/QuizSettings'



const StartQuiz = () => {
  return (
    <div className='bg-slate-100 min-h-screen flex items-center justify-center'>
    <div className='quizApp bg-[#1f2847] rounded-[10px] p-8  max-w-[400px] w-full relative overflow-hidden shadow-[0_0_10px_rgba(0,0,0,0.1)]'>
    <Header />
    <QuizSettings />
   
     </div>
     </div>
  )
}

export default StartQuiz