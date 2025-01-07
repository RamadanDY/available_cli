import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { NavLink, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { setCourseRep } = useAuth();
  const [studentEmail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, studentEmail, password);
      const user = userCredential.user;

      const courseRepRef = doc(db, "course_representatives", user.uid);
      const courseRepSnap = await getDoc(courseRepRef);

      if (courseRepSnap.exists()) {
        const courseRepData = courseRepSnap.data();
        setCourseRep(courseRepData);
        localStorage.setItem("courseRep", JSON.stringify(courseRepData));
        navigate("/");
      } else {
        setError("Course representative data not found.");
      }
    } catch (error) {
      console.error("Login Error:", error.code, error.message);
      if (error.code === "auth/invalid-credential") {
        setError("Invalid email or password. Please try again.");
      } else if (error.code === "auth/user-not-found") {
        setError("No account found with this email.");
      } else if (error.code === "auth/wrong-password") {
        setError("Incorrect password. Try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
      <main className="flex items-center justify-center min-h-screen bg-gray-100">
        <section className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
            FocusApp
          </h1>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>} {/* Show error */}

          <form onSubmit={onLogin} className="space-y-6">
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                  id="email-address"
                  name="email"
                  type="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                  id="password"
                  name="password"
                  type="password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                  disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            No account yet?{" "}
            <NavLink to="/signup" className="text-blue-600 hover:text-blue-500 font-medium">
              Sign up
            </NavLink>
          </p>
        </section>
      </main>
  );
};

export default Login;
