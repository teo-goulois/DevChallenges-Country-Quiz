export type QuizType = {
    capital: string[];
    flags: {
      png: string;
      svg: string;
    };
    name: {
      common: string;
      nativeName: {
        [e: string]: {
          common: string;
          official: string;
        };
      };
      official: string;
    };
    good?: boolean;
  };
  