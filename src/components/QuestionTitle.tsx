import React from "react";
import { QuizType } from "../types/Types";
type Props = {
  QIsCapital: boolean | undefined ;
  questions: QuizType[];
};

const QuestionTitle = ({ QIsCapital, questions }: Props) => {
  return (
    <div>
      <h2 className="font-bold text-title text-2xl mt-4">
        {QIsCapital &&
          `${
            questions.filter((question) => question.good)[0]?.capital[0]
          } is the capital of.`}
        {!QIsCapital && (
          <div className="flex items-center">
            <img
              className="max-w-[84px] max-h-[54px] pr-4"
              src={questions.filter((question) => question.good)[0]?.flags?.png}
              alt="flag"
            />
            <p> Which country does this flag belong to?</p>
          </div>
        )}
      </h2>
    </div>
  );
};

export default QuestionTitle;
