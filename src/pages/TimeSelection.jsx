import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const TimeSelection = () => {
  const [startTime, setStartTime] = useState("09:00"); // Default start time
  const [endTime, setEndTime] = useState("09:00"); // Default end time
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Destructure all the data passed from Confirm
  const {
    fullCode,
    classId,
    courseName,
    levelName,
    representativeId,
  } = location.state || {};
  const handleConfirm = async () => {
    if (!startTime || !endTime) {
      alert("Please select both start and end times.");
      return;
    }
  
    if (startTime >= endTime) {
      alert("End time must be later than start time.");
      return;
    }
  
    // Convert start and end times to ISO format
    const today = new Date().toISOString().split("T")[0]; // Get today's date (YYYY-MM-DD)
    const start = new Date(`${today}T${startTime}`).toISOString();
    const end = new Date(`${today}T${endTime}`).toISOString();
  
    // Ensure all required fields are included
    const requestBody = {
      representativeId, // Add representative ID to the payload
      classId,          // Add class ID to the payload
      timeRange: {
        start,
        end,
      },
      course: courseName,
      level: levelName,
    };
  
    console.log("Request Body:", requestBody);
  
    try {
      setLoading(true);
  
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/v1/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData);
        alert("Failed to book the class. Please try again.");
        return;
      }
  
      const data = await response.json();
      console.log("Booking Successful:", data);
  
      // Navigate to success page or handle success
      alert("Class successfully booked!");
      navigate("/success");
    } catch (error) {
      console.error("Error booking the class:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="time-selection-wrapper flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">
        Select Time for Class <span className="font-bold">{fullCode}</span>
      </h3>

      {/* Display additional details */}
      <div className="class-details text-sm mb-6">
        <p><strong>Course Name:</strong> {courseName}</p>
        <p><strong>Level Name:</strong> {levelName}</p>
        <p><strong>Representative ID:</strong> {representativeId}</p>
        <p><strong>Class ID:</strong> {classId}</p>
      </div>

      <form className="max-w-[16rem] mx-auto grid grid-cols-2 gap-4 mb-6">
        <div>
          <label
            htmlFor="start-time"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Start time:
          </label>
          <input
            type="time"
            id="start-time"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            min="09:00"
            max="18:00"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label
            htmlFor="end-time"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            End time:
          </label>
          <input
            type="time"
            id="end-time"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            min="09:00"
            max="18:00"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div>
      </form>

      <button
        onClick={handleConfirm}
        disabled={loading}
        className={`confirm-button px-4 py-2 rounded-lg transition ${
          loading
            ? "bg-gray-400 text-white cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        {loading ? "Booking..." : "Confirm Time Selection"}
      </button>
    </div>
  );
};

export default TimeSelection;
