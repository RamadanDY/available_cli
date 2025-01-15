 import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Adjusted path
import { DotLottieReact } from "@lottiefiles/dotlottie-react"; // Import Lottie

const ProtectedRoute = ({ children }) => {
    const { user, courseRep, loading: authLoading } = useAuth();
    const [loaderVisible, setLoaderVisible] = useState(true);

    useEffect(() => {
        if (!authLoading) {
            // Add a delay to control how long the loader displays
            const timer = setTimeout(() => {
                setLoaderVisible(false);
            }, 2000); // Set loader display duration in milliseconds (e.g., 2000ms = 2 seconds)

            return () => clearTimeout(timer); // Cleanup the timer
        }
    }, [authLoading]);

    if (authLoading || loaderVisible) {
        // Display the loader
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <p className="font-serif text-sky-600 shadow-sky-900 text-7xl"> CLHAS</p>
                <DotLottieReact
                    src="https://lottie.host/069bf0f6-7304-4c6a-9e78-7d21daa8083f/Ac7kDc4P3O.lottie"
                    loop
                    autoplay
                    style={{ width: "200px", height: "200px" }}
                />
            </div>
        );
    }

    return user && courseRep ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;


 
