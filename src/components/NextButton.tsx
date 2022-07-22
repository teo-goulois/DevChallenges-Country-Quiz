import React from "react";

type Props = {
  nextFunction: () => void;
};

const NextButton = ({ nextFunction }: Props) => {
  return (
    <button
      onClick={() => nextFunction()}
      className="bg-yellow rounded-xl px-6 py-2 text-white font-bold text-lg shadow-[0_2px_4px_rgba(252,168,47,0.4)] float-right "
    >
      Next
    </button>
  );
};

export default NextButton;
