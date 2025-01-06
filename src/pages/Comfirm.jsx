import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Confirm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { fullCode } = location.state || {}; // Get fullCode from state

  const handleYes = () => {
    navigate("/time-selection", { state: { fullCode } }); // Navigate to TimeSelection
  };

  const handleNo = () => {
    console.log("Action canceled");
    navigate(-1); // Go back
  };

  return (
    <div className="confirm-wrapper flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Confirm Action</h3>
      <p className="text-sm mb-6">
        Are you sure you want to perform this action for class{" "}
        <span className="font-bold">{fullCode}</span>?
      </p>
      <div className="button-group flex space-x-4">
        <button
          onClick={handleYes}
          className="yes-button px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Yes
        </button>
        <button
          onClick={handleNo}
          className="no-button px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          No
        </button>
      </div>
    </div>
  );
};

export default Confirm;
