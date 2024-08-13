import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const NavigationControl: React.FC = () => {
  return (
    <div className="flex items-center justify-center space-x-2 border border-gray-300 rounded-md p-2">
      <button
        className="text-gray-500 hover:text-gray-700 focus:outline-none"
        aria-label="Previous"
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </button>
      <button className="text-black font-semibold text-sm" aria-label="Today">
        Today
      </button>
      <button
        className="text-gray-500 hover:text-gray-700 focus:outline-none"
        aria-label="Next"
      >
        <ChevronRightIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default NavigationControl;
