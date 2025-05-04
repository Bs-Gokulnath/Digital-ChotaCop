import React from "react";

const experienceQuestions = [
  "Did you enjoy the ride?",
  "Did you feel your driver was better than before?",
  "Did you feel safe and comfortable?",
  "Did you learn any road safety rules?"
];

const parentQuestions = [
  "Did your child learn about road safety?",
  "Did you feel the ride was safe for your family?"
];

const Ex_Zone = ({ answers, setAnswers, parentAnswers, setParentAnswers }) => {
  const handleToggle = (idx) => {
    const updated = [...answers];
    updated[idx] = !updated[idx];
    setAnswers(updated);
  };

  const handleParentToggle = (idx) => {
    const updated = [...parentAnswers];
    updated[idx] = !updated[idx];
    setParentAnswers(updated);
  };

  return (
    <div className="bg-[#fdf5eb] shadow-xl rounded-2xl p-6 mb-8 mt-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Your Experience:</h2>
      <div className="space-y-6 mb-8">
        {experienceQuestions.map((question, idx) => (
          <div key={idx} className="flex items-center justify-between border-b pb-4 last:border-b-0 last:pb-0">
            <span className="text-gray-800 font-medium text-base">{question}</span>
            <div
              onClick={() => handleToggle(idx)}
              className={`relative w-14 h-6 rounded-full cursor-pointer transition-colors duration-300 flex items-center px-1 ml-4 ${
                answers[idx] ? "bg-green-500" : "bg-red-500"
              }`}
            >
              <span className="text-white text-xs font-bold w-1/2 text-center z-10">Y</span>
              <span className="text-white text-xs font-bold w-1/2 text-center z-10">N</span>
              <div
                className={`absolute w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                  answers[idx] ? "translate-x-full" : "translate-x-0"
                }`}
              />
            </div>
          </div>
        ))}
      </div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6 mt-8">For Parents:</h2>
      <div className="space-y-6">
        {parentQuestions.map((question, idx) => (
          <div key={idx} className="flex items-center justify-between border-b pb-4 last:border-b-0 last:pb-0">
            <span className="text-gray-800 font-medium text-base">{question}</span>
            <div
              onClick={() => handleParentToggle(idx)}
              className={`relative w-14 h-6 rounded-full cursor-pointer transition-colors duration-300 flex items-center px-1 ml-4 ${
                parentAnswers[idx] ? "bg-green-500" : "bg-red-500"
              }`}
            >
              <span className="text-white text-xs font-bold w-1/2 text-center z-10">Y</span>
              <span className="text-white text-xs font-bold w-1/2 text-center z-10">N</span>
              <div
                className={`absolute w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                  parentAnswers[idx] ? "translate-x-full" : "translate-x-0"
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ex_Zone;
