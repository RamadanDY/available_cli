import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { DotLottieReact } from "@lottiefiles/dotlottie-react"; // Import DotLottieReact
import "../App.css";

const SubclassesByBlock = () => {
  const { blockId } = useParams();
  const navigate = useNavigate();
  const [subclasses, setSubclasses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubclasses = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/v1/blocks/${blockId}/classes`
        );
        const classes = response.data;

        // Log data for debugging
        console.log("Block Data:", classes);

        if (!classes) {
          alert("Cannot fetch data");
        }

        setSubclasses(classes);
      } catch (err) {
        setError(err.response?.data?.error || "Error fetching subclasses");
      } finally {
        setLoading(false);
      }
    };

    fetchSubclasses();
  }, [blockId]);

  const handleClassClick = (fullCode, classId) => {
    navigate("/confirm", { state: { fullCode, classId } });
  };

  if (loading) {
    return (
      <div className="loading-wrapper flex justify-center items-center h-screen">
        <DotLottieReact
          src="https://lottie.host/79e5a9e6-fd07-488a-be5a-f094fae5cc9b/pVuARXfuCW.lottie"
          loop
          autoplay
          style={{ width: "200px", height: "200px" }}
        />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="subclasses-wrapper">
      <h2 className="text-2xl font-bold mb-6">Subclasses for Block {blockId}</h2>
      <div className="subclasses-list grid grid-cols-3 gap-6">
        {subclasses.map((subclass) => (
          <div
            key={subclass._id}
            onClick={() => handleClassClick(subclass.fullCode, subclass._id)}
            className="subclass-item border p-4 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
          >
            <p className="font-semibold">{subclass.fullCode}</p>
            <p
              className={`status text-sm ${
                subclass.isAvailable ? "text-green-500" : "text-red-500"
              }`}
            >
              {subclass.isAvailable ? "Available" : "Unavailable"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubclassesByBlock;
