import React, { useState } from "react";
import Header from "../components/Header";
import ImageUploader from "../components/Image_Uploader";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import Ex_Zone from "../components/Ex_Zone";

const questions = [
  "If on a bike or scooter, did everyone wear a helmet?",
  "If in a car, did everyone wear a seatbelt?",
  "Did the driver honk too much?",
  "Did the driver follow traffic lights?",
  "At a red light, did the driver stop at the white line?",
  "Did the driver use a phone while driving?",
  "Did the driver keep changing lanes?",
  "Did the driver go into a \"No Entry\" road?",
  "Did the driver stop for people walking (pedestrians)?",
  "If in an auto, were too many people sitting inside?",
  "If on a two-wheeler, were three people riding on it?",
  "Did your driver have a license and insurance?",
];

const TOTAL_RIDES = 7;

const QuestionTogglePage = () => {
  const [ridesAnswers, setRidesAnswers] = useState(
    Array(TOTAL_RIDES).fill(null).map(() => Array(questions.length).fill(false))
  );
  const [submittedRides, setSubmittedRides] = useState(Array(TOTAL_RIDES).fill(false));
  const [studentInfo, setStudentInfo] = useState({
    name: "",
    class: "",
    chapter: "",
    school: "",
    email: ""
  });
  const [parentRideAnswers, setParentRideAnswers] = useState(Array(TOTAL_RIDES).fill(false));

  const handleToggle = (rideIdx, questionIdx) => {
    if (submittedRides[rideIdx]) return;
    const updatedAnswers = [...ridesAnswers];
    updatedAnswers[rideIdx][questionIdx] = !updatedAnswers[rideIdx][questionIdx];
    setRidesAnswers(updatedAnswers);
  };

  const handleParentToggle = (rideIdx) => {
    if (submittedRides[rideIdx]) return;
    const updatedParentAnswers = [...parentRideAnswers];
    updatedParentAnswers[rideIdx] = !updatedParentAnswers[rideIdx];
    setParentRideAnswers(updatedParentAnswers);
  };

  const handleSubmit = async () => {
    const updatedSubmitted = submittedRides.map(() => true);
    setSubmittedRides(updatedSubmitted);
    await generateAndDownloadCertificate();
  };

  const generateAndDownloadCertificate = async () => {
    const { name, school, class: studentClass } = studentInfo;
    const tempDiv = document.createElement("div");
    tempDiv.className =
      "relative w-[1123px] h-[794px] bg-white shadow-lg border rounded-lg overflow-hidden";
    tempDiv.style.width = "1123px";
    tempDiv.style.height = "794px";
    tempDiv.innerHTML = `
      <img src="/assets/Chota Cop Certificate.png" 
           alt="Certificate" 
           style="width: 1123px; height: 794px; object-fit: cover; position: absolute; left: 0; top: 0;"/>
      <div style="position: absolute; top: 378px; left: 345px; font-size: 24px; font-weight: bold; color: #222; width: 400px;">${name}</div>
      <div style="position: absolute; top: 448px; left: 340px; font-size: 16px; font-weight: bold; color: #222; width: 300px;">${school}</div>
      <div style="position: absolute; top: 438px; left: 750px; font-size: 24px; font-weight: bold; color: #222; width: 200px;">${studentClass}</div>
    `;
    document.body.appendChild(tempDiv);
    await new Promise((resolve) => setTimeout(resolve, 200)); // Wait for image to load
    html2canvas(tempDiv, { scale: 3 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape", "px", [1123, 794]);
      pdf.addImage(imgData, "PNG", 0, 0, 1123, 794);
      pdf.save("ChotaCop_Certificate.pdf");
      document.body.removeChild(tempDiv);
    });
  };

  const handleInputChange = (e) => {
    setStudentInfo({
      ...studentInfo,
      [e.target.name]: e.target.value
    });
  };

  const isStudentInfoComplete = Object.values(studentInfo).every((v) => v.trim() !== "");

  return (
    <div className="min-h-screen bg-[#fdf5eb]">
      <Header />
      <div className="w-full max-w-8xl mx-auto p-6 md:p-10">
        {/* Student Info Form */}
        <div className="bg-[#fdf6bf] shadow-xl rounded-2xl p-6 mb-8 mt-[-40px]">
          <div className="flex flex-wrap gap-6 justify-between">
            <input type="email" name="email" placeholder="Email" value={studentInfo.email} onChange={handleInputChange} className="flex-1 min-w-[180px] border border-gray-300 rounded-lg px-4 py-2" />
            <select name="chapter" value={studentInfo.chapter} onChange={handleInputChange} className="flex-1 min-w-[180px] border border-gray-300 rounded-lg px-4 py-2">
              <option value="">Select Chapter</option>
              <option value="1">Chapter 1</option>
              <option value="2">Chapter 2</option>
              <option value="3">Chapter 3</option>
            </select>
            <input type="text" name="name" placeholder="Name" value={studentInfo.name} onChange={handleInputChange} className="flex-1 min-w-[180px] border border-gray-300 rounded-lg px-4 py-2" />
            <input type="text" name="school" placeholder="School" value={studentInfo.school} onChange={handleInputChange} className="flex-1 min-w-[180px] border border-gray-300 rounded-lg px-4 py-2" />
            <select name="class" value={studentInfo.class} onChange={handleInputChange} className="flex-1 min-w-[180px] border border-gray-300 rounded-lg px-4 py-2">
              <option value="">Select Class</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>{`Class ${i + 1}`}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Were you riding with a parent? */}
        <div className="bg-[#fdf5eb] shadow-xl rounded-2xl p-4 mb-8">
          <div className="hidden md:flex items-center">
            <p className="text-gray-800 font-semibold text-base mr-8 min-w-[260px]">Were you riding with a parent?</p>
            <div className="flex items-center gap-18 ml-[270px]">
              {Array.from({ length: TOTAL_RIDES }, (_, rideIdx) => {
                const isAnswered = parentRideAnswers[rideIdx];
                return (
                  <div
                    key={rideIdx}
                    onClick={() => isStudentInfoComplete && handleParentToggle(rideIdx)}
                    className={`relative w-14 h-6 rounded-full cursor-pointer transition-colors duration-300 flex items-center px-1 ${
                      isAnswered ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    <span className="text-white text-xs font-bold w-1/2 text-center z-10">Yes</span>
                    <span className="text-white text-xs font-bold w-1/2 text-center z-10">No</span>
                    <div
                      className={`absolute w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                        isAnswered ? "translate-x-full" : "translate-x-0"
                      }`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="md:hidden flex flex-col items-center gap-4">
            <p className="text-gray-800 font-semibold text-base mb-2 text-center">Were you riding with a parent?</p>
            <div className="flex flex-nowrap justify-center gap-3 overflow-x-auto w-full pb-2">
              {Array.from({ length: TOTAL_RIDES }, (_, rideIdx) => {
                const isAnswered = parentRideAnswers[rideIdx];
                return (
                  <div
                    key={rideIdx}
                    onClick={() => isStudentInfoComplete && handleParentToggle(rideIdx)}
                    className={`relative w-12 h-5 rounded-full cursor-pointer transition-colors duration-300 flex items-center px-1 ${
                      isAnswered ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    <div
                      className={`absolute w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                        isAnswered ? "translate-x-7" : "translate-x-0"
                      }`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* MOBILE VIEW */}
        <div className="md:hidden bg-[#fdf5eb] shadow-xl rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2 font-bold text-gray-600 text-sm">
            <span className="w-16">Ride</span>
            {Array.from({ length: TOTAL_RIDES }, (_, i) => (
              <span key={i} className="w-12 text-center">{i + 1}</span>
            ))}
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
              <span className="text-xs text-gray-700">Yes</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
              <span className="text-xs text-gray-700">No</span>
            </div>
          </div>
          {questions.map((question, qIdx) => (
            <div key={qIdx} className="mb-4 border-t pt-4">
              <p className="text-gray-800 font-medium text-sm mb-2">{question}</p>
              <div className="flex items-center gap-2">
                {Array.from({ length: TOTAL_RIDES }, (_, rideIdx) => {
                  const isAnswered = ridesAnswers[rideIdx][qIdx];
                  return (
                    <div
                      key={rideIdx}
                      onClick={() => isStudentInfoComplete && handleToggle(rideIdx, qIdx)}
                      className={`relative w-10 h-5 rounded-full cursor-pointer transition-colors duration-300 flex items-center px-1 ${
                        isAnswered ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      <div
                        className={`absolute w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                          isAnswered ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP VIEW */}
        <div className="overflow-auto hidden md:block">
          <table className="table-auto w-full border-collapse bg-[#fdf5eb] shadow-xl rounded-2xl overflow-hidden">
            <thead className="bg-[#fdf6bf]">
              <tr>
                <th className="text-left p-4 text-gray-700">Questions</th>
                {Array.from({ length: TOTAL_RIDES }, (_, i) => (
                  <th key={i} className="text-center p-4 text-gray-700">{`Ride ${i + 1}`}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              

              {/* Main Questions */}
              {questions.map((question, qIdx) => (
                <tr key={qIdx} className="border-t">
                  <td className="p-4 text-sm font-medium text-gray-800">{question}</td>
                  {Array.from({ length: TOTAL_RIDES }, (_, rideIdx) => {
                    const isAnswered = ridesAnswers[rideIdx][qIdx];
                    return (
                      <td key={rideIdx} className="p-4 text-center">
                        <div
                          onClick={() => isStudentInfoComplete && handleToggle(rideIdx, qIdx)}
                          className={`relative w-14 h-6 rounded-full cursor-pointer transition-colors duration-300 mx-auto flex items-center px-1 ${
                            isAnswered ? "bg-green-500" : "bg-red-500"
                          }`}
                        >
                          <span className="text-white text-xs font-bold w-1/2 text-center z-10">Yes</span>
                          <span className="text-white text-xs font-bold w-1/2 text-center z-10">No</span>
                          <div
                            className={`absolute w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                              isAnswered ? "translate-x-full" : "translate-x-0"
                            }`}
                          />
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Experience Zone */}
        <Ex_Zone />

        {/* PDF Upload */}
        <ImageUploader />

        {/* Submit Button */}
        <div className="flex justify-center mt-8">
        <button
            onClick={handleSubmit}
            disabled={!isStudentInfoComplete}
            className={`px-6 py-3 rounded-xl font-bold text-white transition-colors duration-300 ${
              isStudentInfoComplete ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Submit & Get Certified
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionTogglePage;



