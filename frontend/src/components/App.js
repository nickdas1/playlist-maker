import "../assets/styles.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Login from "./users/Login";
import NavBar from "./NavBar";
import Profile from "./users/Profile";
import SignUp from "./users/SignUp";
import { PrivateRoute } from "../auth/PrivateRoute";

function App() {
    return (
        <div className="App">
            <NavBar />
            <Routes>
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            {" "}
                            <Layout />{" "}
                        </PrivateRoute>
                    }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </div>
    );
}

export default App;
