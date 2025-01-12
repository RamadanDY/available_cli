import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import "../App.css";

const SubclassesByBlock = () => {
  const { blockId } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate
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

        // Log the data to the console
        console.log("Block Data:", classes);
        if(!classes){
          alert("cannot fetch data")
        }

        // Log the _id of each class
        classes.forEach((subclass) => {
          console.log("Class ID:", subclass._id);
        });

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
    navigate("/confirm", { state: { fullCode, classId } }); // Pass fullCode and classId to Confirm
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
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
