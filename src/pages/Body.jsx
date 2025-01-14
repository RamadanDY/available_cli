import React, { useState, useEffect } from "react";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import "../App.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Body = () => {
  const [blockData, setBlockData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBlockData = async () => {
    setLoading(true);  
    setError(null); // Reset error state on retry
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/v1/blocks`
      );
      setBlockData(response.data);
      console.log("Fetched block data:", response.data);
    } catch (err) {
      console.error("Error fetching block data:", err.response?.data?.error || err.message);
      setError(err.response?.data?.error || "Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlockData(); // Fetch data on mount
  }, []);

  return (
    <div className="flex flex-col text-center pt-28 justify-center align-center">
      <div className="header-wrapper text-3xl font-bold pb-12">
        <div className="text-wrapper">PLEASE SELECT A BLOCK FOR YOUR LECTURE</div>
      </div>
      <div className="blocks-wrapper grid grid-cols-3 justify-center mx-auto gap-x-48 gap-y-10">
        {loading ? (
          <p>Loading blocks...</p>
        ) : error ? (
          <div>
            <p>{error}</p>
            <button onClick={fetchBlockData} className="retry-button">
              Retry
            </button>
          </div>
        ) : blockData.length === 0 ? (
          <p>No blocks available. Please check back later.</p>
        ) : (
          blockData.map((block) => (
            <div
              key={block._id}
              className="transition ease-in-out delay-150 cursor-pointer hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 p-6 rounded-2xl w-fit m-2 text-center flex flex-row items-center gap-4 border-red-800 border"
              title={`Block ${block.code}`}
            >
              <HiOutlineBuildingOffice2 />
              <Link
                to={`/subclasses/${block._id}`}
                className="text"
                aria-label={`Select Block ${block.code}`}
              >
                {`Block ${block.code || "Unknown"}`}
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Body;
