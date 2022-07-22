// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {
    addQuestionsToContext: "load data";
    addToQuestionSucceed: "question succeed";
    resetSucceedQuestions: "restart";
  };
  internalEvents: {
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingServices: {};
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates: "Loading Datas" | "Datas Loaded" | "restart" | "show error";
  tags: never;
}
