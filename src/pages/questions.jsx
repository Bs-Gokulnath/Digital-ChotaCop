import React, { useState } from "react";
import Header from "../components/Header";

const questions = [
  "If on two wheeler did rider and pillion wear a helmet?",
  "If in car did driver and passengers wear seat belts?",
  "Did rider/driver do excessive honking?",
  "Did rider/driver follow traffic signals?",
  "During red signal did rider/driver stop within stop line?",
  "Did rider/driver frequently change lanes?",
  "Did rider/driver drive in no entry?",
  "Did they give way to pedestrians?",
  "If in auto did they overload the auto?",
  "If you were on two wheeler did you triple ride?",
  "Did your rider/driver have driving licence and insurance?"
];

const QuestionTogglePage = () => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(false));

  const handleToggle = (index) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = !updatedAnswers[index];
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    console.log("Submitted answers:", answers);
    alert("Your responses have been submitted!");
  };

  return (
    <div className="min-h-screen bg-[#fdf5eb]">
      <Header />

      <div className="w-full max-w-5xl bg-[#fdf5eb] shadow-xl rounded-2xl p-6 md:p-10 mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Answer the Questions
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {questions.map((question, idx) => (
            <React.Fragment key={idx}>
              {/* For all questions except last one */}
              {idx !== 10 ? (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#fdf5dd] p-4 rounded-xl shadow-sm">
                  <p className="text-gray-800 font-medium sm:w-2/3">{question}</p>

                  <div className="flex items-center sm:w-1/3 justify-end">
                    <div
                      onClick={() => handleToggle(idx)}
                      className={`relative w-24 h-10 rounded-full cursor-pointer transition-colors duration-300 flex items-center px-2 ${
                        answers[idx] ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      <span className="text-white text-sm font-bold w-1/2 text-center z-10">
                        Yes
                      </span>
                      <span className="text-white text-sm font-bold w-1/2 text-center z-10">
                        No
                      </span>
                      <div
                        className={`absolute w-10 h-8 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                          answers[idx] ? "translate-x-full" : "translate-x-0"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                // Special layout for 11th question + Submit button
                <div className="flex flex-col sm:flex-row sm:col-span-2 sm:items-center justify-between gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#fdf5dd] p-4 rounded-xl shadow-sm w-full sm:w-1/2">
                    <p className="text-gray-800 font-medium">{question}</p>

                    <div className="flex items-center justify-end">
                      <div
                        onClick={() => handleToggle(idx)}
                        className={`relative w-24 h-10 rounded-full cursor-pointer transition-colors duration-300 flex items-center px-2 ${
                          answers[idx] ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        <span className="text-white text-sm font-bold w-1/2 text-center z-10">
                          Yes
                        </span>
                        <span className="text-white text-sm font-bold w-1/2 text-center z-10">
                          No
                        </span>
                        <div
                          className={`absolute w-10 h-8 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                            answers[idx] ? "translate-x-full" : "translate-x-0"
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center sm:justify-start items-center w-full sm:w-auto">
                    <button
                      onClick={handleSubmit}
                      className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionTogglePage;
