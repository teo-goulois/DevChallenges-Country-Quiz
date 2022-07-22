import { createMachine, assign } from "xstate";
import { QuizType } from "../types/Types";

export const quizMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QEcCuBLAXgWQIYGMALdAOzADoAZAe1wlKgAIARXAF11gGIAbWiRhHa5EoAA7VY6NumolRIAB6IAtACYAzAHZyARg0BOABy6ArLotrTRgGxGANCACeqtboPkjBgCxaADN66akamWgbWAL4RjmhYeESkFKwcsIw0dJBcaHAycoxgAE4F1AUKElK58khKiBYeFtpGGuY23t5+flqOLggqJuR2BgZ+Gka+5kYhUTEYOATEZOTJnGn8mdmwlYywqPj4YJBlktKyVaDKvW665MHm7d6T1oYOzqpB3jcjNgZaoWq-nS00xAsTmCUWBRyuAKbC4kM20LYRwqpwUF3UD3IGm8amMww0+i0Ng0Nm6iHMWNxWgeukeuhxNmBoPiCwosEI1AA7vkiiUuGRFEjquUTnI0YgtGobmYhvTvnYtFpdGSELjyIqjNTtCNJsZNVFoiASNQIHAFMz5okqPwGCxhPBhcdKuLer4pbSDDZcZpZV4VeorJ5dJ0-F4bCM1DYbKYmbMWVblql0qaIMjRWcaghWp8NAFNO01DjNP61B0scH-L8laZTJ0Y4aLeCKPCODC087qhcgqYbqMtE1Q95Bl1XlmPhoqdZwqNrLpGQ245bFuyuTziqVHSixZ23qWBprtG1TFYOm1-STPP3grTRs0RvWZnEl2B26id67PXow97DAYPSXjCDToPS8alggNCIgA */
  createMachine(
    {
  context: {
    questions: [] as QuizType[],
    succeedQuestions: 0 as number,
    errorMessage: undefined as string | undefined,
  },
  tsTypes: {} as import("./QuizMachine.typegen").Typegen0,
  schema: {
    events: {} as
      | {
          type: "question succeed";
        }
      | { type: "question error" }
      | { type: "restart" }
      | { type: "next" }
      | {
          type: "load data";
          questions: QuizType[];
        },
  },
  id: "quizMachine",
  initial: "Loading Datas",
  states: {
    "Loading Datas": {
      on: {
        "load data": {
          actions: "addQuestionsToContext",
          target: "Datas Loaded",
        },
      },
    },
    "Datas Loaded": {
      on: {
        "question error": {
          target: "show error",
        },
        "question succeed": {
          actions: "addToQuestionSucceed",
          target: "Loading Datas",
        },
      },
    },
    restart: {
      on: {
        restart: {
          actions: "resetSucceedQuestions",
          target: "Loading Datas",
        },
      },
    },
    "show error": {
      on: {
        next: {
          target: "restart",
        },
      },
    },
  },
},
    {
      actions: {
        addToQuestionSucceed: assign((context, event) => {
          return {
            succeedQuestions: context.succeedQuestions + 1,
          };
        }),
        resetSucceedQuestions: assign((context, event) => {
          return {
            succeedQuestions: 0,
          };
        }),
        addQuestionsToContext: assign((context, event) => {
          return {
            questions: event.questions,
          };
        }),
      },
    }
  );
