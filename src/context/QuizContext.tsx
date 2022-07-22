import axios from "axios";
import { createContext, useEffect, useState } from "react";
// Types
import { QuizType } from "../types/Types";

interface IQuizContext {
    allQuizQuestions: QuizType[];
    loading: boolean
}

interface QuizProviderProps {
  children: React.ReactNode;
}

export const QuizContext = createContext<IQuizContext>({
    allQuizQuestions: [],
    loading: true
});

export const QuizProvider = ({ children }: QuizProviderProps) => {
  const [loading, setLoading] = useState(true);
  const [allQuizQuestions, setAllQuizQuestions] = useState<QuizType[]>([]);

  useEffect(() => {
    const getDatas = async () => {
      try {
        const res = await axios.get("https://restcountries.com/v3.1/all");
        const datas = res.data.map(
          (item: { name: any; flags: any; capital: any }) => {
            return {
              name: item.name,
              flags: item.flags,
              capital: item.capital,
            };
          }
        );
        setAllQuizQuestions(datas);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getDatas();
  }, []);


  const value = { allQuizQuestions: allQuizQuestions, loading };
  return <QuizContext.Provider value={value}>{children} </QuizContext.Provider>;
};
