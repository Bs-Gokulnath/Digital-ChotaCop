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

const TOTAL_RIDES = 5;

const QuestionTogglePage = () => {
  const [activeRide, setActiveRide] = useState(0);
  const [ridesAnswers, setRidesAnswers] = useState(
    Array(TOTAL_RIDES).fill(null).map(() => Array(questions.length).fill(false)) // Default all to false (i.e., "No")
  );
  const [submittedRides, setSubmittedRides] = useState(Array(TOTAL_RIDES).fill(false));

  const handleToggle = (index) => {
    if (submittedRides[activeRide]) return; // Don't allow edit after submit

    const updatedAnswers = [...ridesAnswers];
    updatedAnswers[activeRide][index] = !updatedAnswers[activeRide][index];
    setRidesAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    const updatedSubmitted = [...submittedRides];
    updatedSubmitted[activeRide] = true;
    setSubmittedRides(updatedSubmitted);
    alert(`Ride ${activeRide + 1} submitted.`);
  };

  return (
    <div className="min-h-screen bg-[#fdf5eb]">
      <Header />

      <div className="w-full max-w-5xl mx-auto p-6 md:p-10">
        {/* Ride Tabs */}
        <div className="flex justify-center flex-wrap gap-4 mb-6">
          {Array.from({ length: TOTAL_RIDES }, (_, idx) => {
            const isUnlocked = idx === 0 || submittedRides[idx - 1];
            const isActive = activeRide === idx;
            const isSubmitted = submittedRides[idx];

            return (
              <button
                key={idx}
                onClick={() => isUnlocked && setActiveRide(idx)}
                disabled={!isUnlocked}
                className={`px-5 py-2 rounded-xl font-semibold shadow-md transition-all duration-300 ${
                  isSubmitted
                    ? "bg-green-500 text-white cursor-not-allowed"
                    : isActive
                    ? "bg-blue-600 text-white"
                    : isUnlocked
                    ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Ride {idx + 1}
              </button>
            );
          })}
        </div>

        {/* Questions */}
        <div className="bg-[#fdf5eb] shadow-xl rounded-2xl p-6">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Ride {activeRide + 1} – Questions
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {questions.map((question, idx) => {
              const isAnswered = ridesAnswers[activeRide][idx];

              return (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#fdf5dd] p-4 rounded-xl shadow-sm"
                >
                  <p className="text-gray-800 font-medium sm:w-2/3">{question}</p>
                  <div className="flex items-center sm:w-1/3 justify-end">
                    <div
                      onClick={() => handleToggle(idx)}
                      className={`relative w-24 h-10 rounded-full cursor-pointer transition-colors duration-300 flex items-center px-2 ${
                        isAnswered ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      <span className="text-white text-sm font-bold w-1/2 text-center z-10">Yes</span>
                      <span className="text-white text-sm font-bold w-1/2 text-center z-10">No</span>
                      <div
                        className={`absolute w-10 h-8 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                          isAnswered ? "translate-x-full" : "translate-x-0"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-8">
            <button
              onClick={handleSubmit}
              disabled={submittedRides[activeRide]}
              className={`px-6 py-2 font-semibold rounded-lg shadow-md transition-all duration-300 ${
                submittedRides[activeRide]
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Submit Ride {activeRide + 1}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionTogglePage;


// import React, { useState } from "react";
// import Header from "../components/Header";

// const questions = [
//   "If on two wheeler did rider and pillion wear a helmet?",
//   "If in car did driver and passengers wear seat belts?",
//   "Did rider/driver do excessive honking?",
//   "Did rider/driver follow traffic signals?",
//   "During red signal did rider/driver stop within stop line?",
//   "Did rider/driver frequently change lanes?",
//   "Did rider/driver drive in no entry?",
//   "Did they give way to pedestrians?",
//   "If in auto did they overload the auto?",
//   "If you were on two wheeler did you triple ride?",
//   "Did your rider/driver have driving licence and insurance?"
// ];

// const TOTAL_RIDES = 5;

// const QuestionTogglePage = () => {
//   const [currentRide, setCurrentRide] = useState(0);
//   const [answersList, setAnswersList] = useState(
//     Array(TOTAL_RIDES).fill(null).map(() => Array(questions.length).fill(false))
//   );
//   const [completedRides, setCompletedRides] = useState([]);
//   const [certificateReady, setCertificateReady] = useState(false);

//   const handleToggle = (index) => {
//     const updatedAnswers = [...answersList];
//     updatedAnswers[currentRide][index] = !updatedAnswers[currentRide][index];
//     setAnswersList(updatedAnswers);
//   };

//   const handleSubmit = () => {
//     const updatedCompleted = [...completedRides, currentRide];
//     setCompletedRides(updatedCompleted);

//     if (currentRide < TOTAL_RIDES - 1) {
//       setCurrentRide(currentRide + 1);
//     } else {
//       setCertificateReady(true);
//     }
//   };

//   const renderBattery = () => {
//     const fillPercentage = ((completedRides.length + 1) / TOTAL_RIDES) * 100;
//     return (
//       <div className="w-40 h-10 border-4 border-gray-700 rounded-lg relative overflow-hidden">
//         <div
//           className="absolute top-0 left-0 h-full bg-green-500 transition-all duration-700"
//           style={{ width: `${fillPercentage}%` }}
//         ></div>
//         <div className="absolute -right-2 top-2 w-2 h-6 bg-gray-700 rounded-sm"></div>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-[#fdf5eb]">
//       <Header />

//       <div className="max-w-5xl mx-auto p-6 md:p-10">
//         <div className="flex justify-between items-center mb-4">
//           <h1 className="text-2xl font-bold text-gray-800">Answer the Questions</h1>
//           {renderBattery()}
//         </div>

//         <div className="flex gap-4 mb-6">
//           {Array.from({ length: TOTAL_RIDES }).map((_, idx) => (
//             <button
//               key={idx}
//               disabled={currentRide !== idx}
//               className={`px-4 py-2 rounded-lg font-semibold border transition-all duration-300 ${
//                 completedRides.includes(idx)
//                   ? "bg-green-500 text-white border-green-600"
//                   : currentRide === idx
//                   ? "bg-blue-500 text-white border-blue-600"
//                   : "bg-gray-300 text-gray-700 border-gray-400 cursor-not-allowed"
//               }`}
//             >
//               Ride {idx + 1}
//             </button>
//           ))}
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {questions.map((question, idx) => (
//             <div
//               key={idx}
//               className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#fdf5dd] p-4 rounded-xl shadow-sm"
//             >
//               <p className="text-gray-800 font-medium sm:w-2/3">{question}</p>
//               <div className="flex items-center sm:w-1/3 justify-end">
//                 <div
//                   onClick={() => handleToggle(idx)}
//                   className={`relative w-24 h-10 rounded-full cursor-pointer transition-colors duration-300 flex items-center px-2 ${
//                     answersList[currentRide][idx] ? "bg-green-500" : "bg-red-500"
//                   }`}
//                 >
//                   <span className="text-white text-sm font-bold w-1/2 text-center z-10">
//                     Yes
//                   </span>
//                   <span className="text-white text-sm font-bold w-1/2 text-center z-10">
//                     No
//                   </span>
//                   <div
//                     className={`absolute w-10 h-8 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
//                       answersList[currentRide][idx] ? "translate-x-full" : "translate-x-0"
//                     }`}
//                   />
//                 </div>
//               </div>
//             </div>
//           ))}

//           <div className="sm:col-span-2 flex justify-center mt-6">
//             <button
//               onClick={handleSubmit}
//               className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
//             >
//               Submit Ride {currentRide + 1}
//             </button>
//           </div>
//         </div>

//         {certificateReady && (
//           <div className="mt-8 text-center">
//             <img
//               src="/battery_fill.gif"
//               alt="Battery Full"
//               className="mx-auto mb-4 w-32 animate-bounce"
//             />
//             <button className="px-6 py-3 bg-green-600 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-green-700">
//               Download Certificate
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default QuestionTogglePage;
