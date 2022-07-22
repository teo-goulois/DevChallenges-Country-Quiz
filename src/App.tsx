import React, { useContext, useEffect, useState } from "react";
// @ts-ignore
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import "./App.css";
// X State
import { quizMachine } from "./machine/QuizMachine";
// @ts-ignore
import { useMachine } from "@xstate/react";
// Images
import backgroundImage from "./assets/images/background.png";
import adventurerImage from "./assets/images/undraw_adventure_4hum 1.svg";
import winningImage from "./assets/images/undraw_winners_ao2o 2.svg";
// Components
import QuizButton from "./components/QuizButton";
import TryAgainButton from "./components/TryAgainButton";
// Types
import { QuizContext } from "./context/QuizContext";
// Hooks
import { getQuestions } from "./hooks/Hooks";
import NextButton from "./components/NextButton";
import QuestionTitle from "./components/QuestionTitle";

function App() {
  const { allQuizQuestions, loading } = useContext(QuizContext);
  const [state, send] = useMachine(quizMachine);
  const [QIsCapital, setQIsCapital] = useState<boolean>();

  // Service
  useEffect(() => {
    if (state.matches("Loading Datas") && allQuizQuestions.length !== 0) {
      send({
        type: "load data",
        questions: getQuestions(allQuizQuestions, setQIsCapital),
      });
    }
  }, [allQuizQuestions, state, send]);

  const questionIsSuccess = (isSuccess: boolean) => {
    if (isSuccess) {
      send({
        type: "question succeed",
      });
    } else {
      send({
        type: "question error",
      });
    }
  };

  const nextFunction = () => {
    send({
      type: "next",
    });
  };

  const tryAgain = () => {
    send({
      type: "restart",
    });
  };

  return (
    <div
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="bg-red h-screen w-screen bg-cover bg-center flex flex-col items-center justify-center font-[Poppins]"
    >
      {/* container */}
      <div className="relative bg-white rounded-3xl px-4 py-10 min-w-[50%] w-[95%] md:w-[60%]">
        {/* Country Quiz title */}
        <h1 className="text-light-gray text-2xl md:text-4xl font-bold text-left uppercase absolute  top-[-35px] md:top-[-45px] left-0">
          country quiz
        </h1>
        {/* if loading */}
        {loading && <p>Loading...</p>}
        {/* if datas */}
        {state.matches("Datas Loaded") || state.matches("show error") ? (
          /* data loaded */
          <div>
            <img
              className="absolute right-0 top-[-60px] w-32 "
              src={adventurerImage}
              alt="adventurer"
            />
            {/* title */}
            <QuestionTitle
              QIsCapital={QIsCapital}
              questions={state.context.questions}
            />
            {/* questions */}
            {state.context.questions.map((question, index) => {
              return (
                <QuizButton
                  questionIsSuccess={questionIsSuccess}
                  key={question.name.official}
                  item={question}
                  index={index}
                  showError={state.matches("show error")}
                />
              );
            })}
          </div>
        ) : state.matches("restart") ? (
          <div className="flex flex-col items-center justify-between min-h-[50%] h-full">
            <img
              loading="eager"
              className="w-[70%]"
              src={winningImage}
              alt="winning"
            />
            <div className="text-center">
              <h2 className="font-bold text-dark-blue text-5xl mb-4">
                Results
              </h2>
              <p className="text-dark-blue text-lg font-normal">
                you got{" "}
                <span className="font-bold text-light-green">
                  {state.context.succeedQuestions}
                </span>{" "}
                correct answers{" "}
              </p>
            </div>
            <TryAgainButton tryAgain={tryAgain} />
          </div>
        ) : (
          /* data not loaded */
          <div>
            <img
              className="absolute right-0 top-[-60px] w-32 "
              src={adventurerImage}
              alt="adventurer"
            />
            <Skeleton className="h-6 mb-4" />
            <Skeleton className="h-10 my-2" count={4} />
          </div>
        )}

        {state.matches("show error") && (
          <NextButton nextFunction={nextFunction} />
        )}
      </div>
    </div>
  );
}

export default App;
