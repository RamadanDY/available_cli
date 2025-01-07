import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Adjusted path

const ProtectedRoute = ({ children }) => {
    const { user, courseRep, loading } = useAuth();

    if (loading) return <p>Loading...</p>;

    return user && courseRep ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
