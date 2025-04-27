import React from "react";
import Header from "../components/Header";

const DigitalChotaCopPage = () => {
  return (
    <div className="min-h-screen bg-[#fdf5eb] flex flex-col">
      {/* Header at the top */}
      <Header />

      {/* Centered content */}
      <div className="flex-grow flex items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mt-[-130px]">
          Digital ChotaCop
        </h1>
      </div>
    </div>
  );
};

export default DigitalChotaCopPage;
