import React, { useState } from "react";
import { ErrorIcon, SuccessIcon } from "../assets/icons/Icons";
// Types
import { QuizType } from "../types/Types";

type Props = {
  item: QuizType;
  index: number;
  questionIsSuccess: (isSuccess: boolean) => void;
  showError: boolean;
};
const QuizButton = ({ item, index, questionIsSuccess, showError }: Props) => {
  const [isGood, setIsGood] = useState<boolean | undefined>(undefined);
  const handleClick = () => {
    if (item.good === true) {
      setIsGood(true);
      setTimeout(() => {
        questionIsSuccess(true);
      }, 750);
    } else {
      setIsGood(false);
      questionIsSuccess(false);
    }
  };
  return (
    <button
      disabled={showError || isGood }
      onClick={handleClick}
      className={` w-full ${
        !showError && "hover:bg-yellow hover:border-yellow quiz-button"
      }  flex items-center font-[Poppins] text-primary border rounded-xl px-2 py-1 my-4 ${
        isGood && "!bg-green !border-green !text-white"
      } ${isGood === false && "bg-red border-red !text-white"}
      ${showError && item.good === true && "bg-green border-green !text-white"}`}
    >
      <p className="uppercase text-2xl font-medium mr-4 text-left">
        {index === 0 ? "A" : index === 1 ? "B" : index === 2 ? "C" : "D"}
      </p>
      <p className="font-medium text-lg">{item.name.common}</p>
      {
        showError && ( item.good === true ? <SuccessIcon className="ml-auto" fill="#FFFFFF"  /> : <ErrorIcon stroke="#FFFFFF" className="ml-auto"  />)
        
      }
    </button>
  );
};

export default QuizButton;
