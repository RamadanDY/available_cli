import { auth } from "../firebase";
import { IoIosLogOut } from "react-icons/io";
import { useAuth } from "../context/AuthContext.jsx";

const LogoutButton = () => {
    const { setCourseRep } = useAuth();

    const handleLogout = async () => {
        try {
            await auth.signOut();
            localStorage.removeItem("courseRep");
            setCourseRep(null);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <button className="p-4" onClick={handleLogout}>
            <IoIosLogOut size={25} />
            <p>Logout</p>
        </button>
    );
};

export default LogoutButton;
