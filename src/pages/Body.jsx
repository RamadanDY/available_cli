import React, { useState, useEffect } from 'react';
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import "../App.css";
import { Link } from 'react-router-dom';
import axios from 'axios';

const Body = () => {
  const [blockData, setBlockData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlockData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/blocks`); // Correct API path
        setBlockData(response.data); // Update state with fetched data
        console.log("Fetched block data:", response.data); // Log data in the console
      } catch (err) {
        console.error("Error fetching block data:", err.response?.data?.error || err.message); // Log error
        setError(err.response?.data?.error || "Error fetching data");
      }
    };

    fetchBlockData(); // Call the asynchronous function
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="flex flex-col text-center pt-28 justify-center align-center">
      <div className="header-wrapper text-3xl font-bold pb-12">
        <div className="text-wrapper">PLEASE SELECT A BLOCK FOR YOUR LECTURE</div>
      </div>
      <div className="blocks-wrapper grid grid-cols-3 justify-center mx-auto gap-x-48 gap-y-10">
        {blockData.length > 0 ? (
          blockData.map((block) => (
            <div
              key={block._id} // Use _id from the database as the unique key
              className="transition ease-in-out delay-150 cursor-pointer hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 p-6 rounded-2xl w-fit m-2 text-center flex flex-row items-center gap-4 border-red-800 border"
            >
              <HiOutlineBuildingOffice2 />
              <Link
                to={`/subclasses/${block._id}`} // Send blockId as part of the URL
                className="text"
              >
                {`Block ${block.code}`}
              </Link>
            </div>
          ))
        ) : (
          <p>{error || "Loading blocks..."}</p>
        )}
      </div>
    </div>
  );
};

export default Body;
