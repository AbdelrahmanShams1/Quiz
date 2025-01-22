import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import AnswerQuiz from "../Components/AnswerQuiz";
import BTN from "../Components/BTN";
import { useLocation } from "react-router-dom";

const Quiz = () => {
  const effectRan = useRef(false);
  const [quiz, setQuiz] = useState(null);
  const [error, setError] = useState(null);
  const [hide, setHide] = useState(true);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [time, setTime] = useState(10);
  const [afterSubmit, setAfterSubmit] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const location = useLocation();
  const [timePerQuestion, setTimePerQuestion] = useState(10);
  const [difficulty, setDifficulty] = useState("easy");
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  const [category, setCategory] = useState(null);
  const [TrueAnswers, setTrueAnswers] = useState(0);
  const navigate = useNavigate();
  const [navigationTriggered, setNavigationTriggered] = useState(false);

  // Update quiz settings based on location.state only once
  useEffect(() => {
    if (!effectRan.current && location.state) {
      const { timePerQuestion, difficulty, numQuestions, category } =
        location.state || {};
      if (timePerQuestion) setTimePerQuestion(timePerQuestion);
      if (difficulty) setDifficulty(difficulty);
      if (numQuestions) setNumberOfQuestions(numQuestions);
      if (category) setCategory(category);
      effectRan.current = true;
    }
    return () => {
      console.log("Unmounted Quiz component");
    };
  }, [location.state]);

  // Fetch quiz data when settings change
  useEffect(() => {
    const fetchQuiz = async () => {
      const apiURL = "http://localhost:5000/categories";
      try {
        const res = await fetch(apiURL);
        if (!res.ok) throw new Error("Failed to fetch quiz");
        const data = await res.json();
        setQuiz(data);
      } catch (err) {
        setError("Failed to load quiz. Please try again later.");
      }
    };

    fetchQuiz();
  }, [timePerQuestion, difficulty, numberOfQuestions, category]);

  // Timer for each question
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex]);

  // Handle answer submission
  const handleSubmit = () => {
    setTime(0);
    setAfterSubmit(true);
    setHide(false);

    if (selectedAnswerIndex === null) return;

    const currentQuestion = questions[currentQuestionIndex];
    const selectedAnswer = currentQuestion?.options?.[selectedAnswerIndex];

    if (currentQuestion?.answer === selectedAnswer) {
      setIsCorrect(true);
      setTrueAnswers((prev) => prev + 1);
    } else {
      setIsCorrect(false);
    }
  };

  // Handle moving to the next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex === questions.length - 1) {
      if (!navigationTriggered) {
        setNavigationTriggered(true);
        // console.log(TrueAnswers);

        // navigate("/result", {
        //   state: {
        //     trueAnswers: TrueAnswers,
        //   },
        // });
      }
    } else {
      setSelectedAnswerIndex(null);
      setHide(true);
      setAfterSubmit(false);
      setIsCorrect(null);
      setCurrentQuestionIndex((prev) => prev + 1);
      setTime(timePerQuestion);
    }
  };

  // Handle selecting an answer
  const selection = (index) => {
    setSelectedAnswerIndex(index);
  };

  const getTrueAnswers = () => {};

  const questions =
    quiz?.[category - 1]?.questions?.[difficulty].slice(0, numberOfQuestions) ||
    [];
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="bg-slate-100 min-h-screen flex items-center justify-center">
      <div className="quizApp bg-[#1f2847] rounded-[10px] p-8 max-w-[400px] w-full relative overflow-hidden shadow-[0_0_10px_rgba(0,0,0,0.1)]">
        <section className="Question">
          <div className="time w-full flex justify-center items-center h-[100px] flex-col mb-[30px]">
            <div className="progress bg-transparent w-full h-[40px] rounded-[30px] overflow-hidden mb-[10px] border-[3px] border-solid border-[#3f4868] relative">
              <div
                className="progress-bar rounded-[10px] h-full overflow-hidden bg-gradient-to-r from-[#ea517c] to-[#b478f1] transition duration-1000 ease-linear"
                style={{
                  width: `${(time / timePerQuestion) * 100}%`,
                }}
              ></div>
              <div className="text_progress">
                <span className="time_left_value absolute top-2/4 left-2/4 transform -translate-x-1/2 -translate-y-1/2 text-white font-medium text-base">
                  {time || "0"}
                </span>
              </div>
            </div>
          </div>

          {error ? (
            <p className="text-red-500">{error}</p>
          ) : quiz ? (
            <div className="question_wrapper mb-[50px]">
              <div className="numberOfQuestion text-[#a2aace] text-[25px] font-medium mb-[20px]">
                Question <span>{currentQuestionIndex + 1}</span>{" "}
                <span className="text-[#576081] text-lg">
                  /{numberOfQuestions}
                </span>
              </div>
              <div className="questions">
                {currentQuestion ? (
                  <div className="question text-white mb-5 text-[20px] font-medium">
                    {currentQuestion.question}
                  </div>
                ) : (
                  <div className="text-white">No questions available</div>
                )}
              </div>

              <div className="answer_warpper mt-8">
                {currentQuestion?.options?.map((answer, index) => {
                  const isSelected = selectedAnswerIndex === index;
                  const isCorrectAnswer =
                    currentQuestion.answer === answer && afterSubmit;
                  const isWrongSelected =
                    isSelected &&
                    currentQuestion.answer !== answer &&
                    afterSubmit;

                  return (
                    <AnswerQuiz
                      select={isSelected}
                      onClick={() => selection(index)}
                      key={index}
                      answer={answer}
                      correct={isCorrectAnswer}
                      colorBorder={isCorrectAnswer || isWrongSelected}
                      falseAnswer={isWrongSelected}
                    />
                  );
                })}
              </div>

              {isCorrect !== null && (
                <div
                  className={`message ${
                    isCorrect ? "text-green-500" : "text-red-500"
                  } mt-4 text-center font-bold`}
                >
                  {isCorrect
                    ? "Correct Answer!"
                    : `Wrong Answer! The correct answer is: ${currentQuestion?.answer}`}
                </div>
              )}
            </div>
          ) : (
            <p className="text-white">Loading...</p>
          )}

          <BTN data="Submit" li="quiz" onClick={handleSubmit} hide1={!hide} />
          <BTN
            onClick={handleNextQuestion}
            data={
              currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"
            }
            li={
              currentQuestionIndex === questions.length - 1 ? "result" : "quiz"
            }
            state={{ trueAnswers: TrueAnswers }}
            hide1={hide}
          />
        </section>
      </div>
    </div>
  );
};

export default Quiz;
