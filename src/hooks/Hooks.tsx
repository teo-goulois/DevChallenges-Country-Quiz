import { QuizType } from "../types/Types";

export const getQuestions = (
  allQuizQuestions: QuizType[],
  setQIsCapital: React.Dispatch<React.SetStateAction<boolean | undefined>>
) => {
  console.log("getQuestions");
  // design if its Capital or Flag
  if (Math.random() < 0.5) {
    setQIsCapital(true);
  } else {
    setQIsCapital(false);
  }
  // shuffle array
  const shuffleArray = allQuizQuestions.sort(() => Math.random() - 0.5);
  // take the 4 first country
  var questions = shuffleArray.slice(0, 4);
  // get random number between 0 and 3
  const num = Math.floor(Math.random() * (3 - 0 + 1) + 0);
  // design the good question
  const newQuestions = questions.map((question, index) => {
    if (index === num) {
      return { ...question, good: true };
    }
    return question;
  });
  console.log(newQuestions);

  return newQuestions;
};
