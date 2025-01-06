import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const TimeSelection = () => {
  const [startTime, setStartTime] = useState("09:00"); // Default start time
  const [endTime, setEndTime] = useState("09:00"); // Default end time
  const navigate = useNavigate();
  const location = useLocation();
  const { fullCode } = location.state || {}; // Get fullCode from state

  const handleConfirm = () => {
    if (!startTime || !endTime) {
      alert("Please select both start and end times.");
      return;
    }

    if (startTime >= endTime) {
      alert("End time must be later than start time.");
      return;
    }

    console.log(`Time selected for class ${fullCode}:`);
    console.log(`Start Time: ${startTime}`);
    console.log(`End Time: ${endTime}`);
    
    // Navigate or handle further actions (e.g., save to database)
    navigate("/success"); // Go back or navigate to another page
  };

  return (
    <div className="time-selection-wrapper flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">
        Select Time for Class <span className="font-bold">{fullCode}</span>
      </h3>
      <form className="max-w-[16rem] mx-auto grid grid-cols-2 gap-4 mb-6">
        <div>
          <label
            htmlFor="start-time"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Start time:
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="time"
              id="start-time"
              className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              min="09:00"
              max="18:00"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="end-time"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            End time:
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="time"
              id="end-time"
              className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              min="09:00"
              max="18:00"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>
        </div>
      </form>
      <button
        onClick={handleConfirm}
        className="confirm-button px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Confirm Time Selection
      </button>
    </div>
  );
};

export default TimeSelection;
