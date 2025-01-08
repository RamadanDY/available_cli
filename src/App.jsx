import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Body from "./pages/Body";
import Confirm from "./pages/Comfirm";
import SubclassesByBlock from "./pages/SubclassesByBlock";
import TimeSelection from "./pages/TimeSelection";
import Success from "./pages/Success";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from  "./context/AuthContext"

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <>
                                    <Navbar />
                                    <Body />
                                </>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/subclasses/:blockId"
                        element={
                            <ProtectedRoute>
                                <>
                                    <Navbar />
                                    <SubclassesByBlock />
                                </>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/confirm"
                        element={
                            <ProtectedRoute>
                                <>
                                    <Navbar />
                                    <Confirm />
                                </>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/time-selection"
                        element={
                            <ProtectedRoute>
                                <>
                                    <Navbar />
                                    <TimeSelection />
                                </>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/success"
                        element={
                            <ProtectedRoute>
                                <>
                                    <Navbar />
                                    <Success />
                                </>
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
