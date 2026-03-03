"use client";
import React from "react";
import QuestionIcon from "../../../../public/images/icons/question_icon.svg";
import Chevron from "../../../../public/images/icons/chevron_icon.svg";

type AccordProps = {
  question: string;
  answer: string;
  isActive: boolean;
  onToggle: () => void;
};

const Accord = ({ question, answer, isActive, onToggle }: AccordProps) => {
  return (
    <div
      className={`flex flex-col rounded-[12px] ${
        isActive ? "bg-[#333140]" : "bg-[#22212D]"
      } overflow-hidden transition-all duration-500`}
    >
      {/* Accordion Header */}
      <div
        className="grid items-center h-[60px] cursor-pointer relative"
        style={{ gridTemplateColumns: "25px 1fr 30px" }}
        onClick={onToggle}
      >
        <QuestionIcon width={25} height={25} fill="#FF7124" className="ml-5" />
        <p className="lg:pl-10 pl-10 pr-3 sm:pr-0 mobile-normal-bold lg:desktop-normal-bold text-[#FAF9F6] ">
          {question}
        </p>
        <Chevron
          width={25}
          height={25}
          fill="#FFFFFF"
          className={`absolute right-3 text-WHITE-100 transition-transform duration-500 ${
            isActive ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>

      {/* Accordion Content */}
      <div
        className={`transition-[max-height] duration-[1000ms] overflow-hidden ${
          isActive ? "max-h-[600px]" : "max-h-[5px]"
        }`}
      >
        <div
          className="pl-[65px] pr-5 pb-5 text-[#FAF9F6]"
          style={{ lineHeight: "30px" }}
        >
          {answer}
        </div>
      </div>
    </div>
  );
};

export default Accord;
