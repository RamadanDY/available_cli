import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [courseRep, setCourseRep] = useState(
        JSON.parse(localStorage.getItem("courseRep")) || null
    );
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
            setUser(firebaseUser);

            if (firebaseUser) {
                try {
                    const courseRepRef = doc(db, "course_representatives", firebaseUser.uid);
                    const courseRepSnap = await getDoc(courseRepRef);

                    if (courseRepSnap.exists()) {
                        const courseRepData = courseRepSnap.data();
                        setCourseRep(courseRepData);
                        localStorage.setItem("courseRep", JSON.stringify(courseRepData));
                    } else {
                        setCourseRep(null);
                        localStorage.removeItem("courseRep");
                    }
                } catch (error) {
                    console.error("Error fetching CourseRep data:", error);
                }
            } else {
                setCourseRep(null);
                localStorage.removeItem("courseRep");
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, courseRep, loading, setCourseRep }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
