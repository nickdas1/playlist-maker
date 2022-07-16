import "./styles.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Login from "./Login";
import NavBar from "./NavBar"; 

function App() {
    return (
        <div className="App">
          <NavBar />
            <Routes>
                <Route path="/" element={<Layout />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </div>
    );
}

export default App;
